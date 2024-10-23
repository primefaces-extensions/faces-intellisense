import fs from 'fs';
import https from 'https';
import * as xml2js from 'xml2js';
import { Tag } from '../model/tag';
import { clearJson } from './clear-json';

const options = {
    mergeAttrs: true,
    trim: true,
    normalizeTags: true,
    normalize: true,
    ignoreAttrs: true,
    explicitArray: false,
    tagNameProcessors: [(name: string) => tagName(name)]
};

const tagName = (name: string) => {
    if ('facelet-taglib' === name) return 'root';
    if ('tag-name' === name) return 'name';
    return name;
};

const createAttr = (jsonFileName: string, xmlFileName: string) => {
    const allJson = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
    const allTag = allJson.root.tag;
    const finalTag: Tag[] = [];
    if (allTag && !Array.isArray(allTag)) {
        console.log(allTag);
        finalTag.push(new Tag(allTag.name ? allTag.name : '', allTag?.description ? allTag?.description : '', allTag?.attribute ? allTag?.attribute : []));
    } else {
        allTag &&
            allTag.forEach((tag: any) => {
                const tagName = tag.name?.trim() || '';
                let desc = tag?.description ?? '';
                desc = clearValue(desc);
                const attr = tag?.attribute ?? [];
                Array.isArray(attr) &&
                    attr.forEach((attribute: any) => {
                        attribute.description = clearValue(attribute.description);
                    });
                finalTag.push(new Tag(tagName ?? '', desc, attr));
            });
    }
    let json = JSON.stringify({ components: { component: finalTag } }, null, 2);
    json = json.replace(/<[^>]*>/g, '').trim(); // strip HTML tags
    fs.writeFileSync(jsonFileName, json);
    fs.unlinkSync(xmlFileName);
    clearJson(jsonFileName);
};

const clearValue = (value: string): string => {
    if (!value) return '';
    value = value.replace(/<[^>]*>/g, ''); // strip HTML tags
    value = value.replace(/[\n\t]/g, ''); // strip new lines and tabs
    value = value.replace(/\s+/g, ' '); // strip multiple spaces
    value = value.trim();
    return value;
};

const convertJson = (xmlFileName: string, jsonFileName: string) => {
    // read XML from a file
    const xml = fs.readFileSync(xmlFileName);
    // convert XML to JSON
    xml2js.parseString(xml, options, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }
        // `result` is a JavaScript object
        // convert it to a JSON string
        const json = JSON.stringify(result, null, 2);
        // save JSON in a file
        fs.writeFileSync(jsonFileName, json);
        createAttr(jsonFileName, xmlFileName);
    });
};

export const execute = (folder: string, fileName: string, version: string, url: string) => {
    console.log(`Generating file: ./src/data/${folder}/${fileName}-${version}.xml to ./src/data/${folder}/${fileName}-${version}.json`);
    const xmlFileName = `./src/data/${folder}/${fileName}-${version}.xml`;
    const jsonFileName = `./src/data/${folder}/${fileName}-${version}.json`;
    const file = fs.createWriteStream(xmlFileName);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            convertJson(xmlFileName, jsonFileName);
        });
    });
};
