import axios from "axios";
import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Tag } from "../model/tag";
import { clearJson } from "./clear-json";

const getAllUrlTags = async (url: string, tags: any[]) => {
    const response = await axios.get(url + "alltags-frame.html", { headers: { "Content-Type": "text/plain" } });
    const dom = new JSDOM(response.data);
    dom.window.document.querySelectorAll(`a[target='tagFrame']`).forEach(a => {
        const pref = a.textContent?.substring(0, a.textContent.indexOf(':'));
        const comp = a.getAttribute('href');
        const alias = pref === 'faces' ? 'f' : pref;
        if (!comp?.includes('.fn.')) {
            tags.forEach((element, index) => {
                if (element.type === alias) {
                    tags[index].urls.push(`${url}${comp}`);
                }
            });
        }
    });
    return tags;
};

const getTagInfo = async (type: string, url: string) => {
    const response = await axios.get(url, { headers: { "Content-Type": "text/plain" } })
    const dom = new JSDOM(response.data);
    let tag_name = url.substring(url.indexOf(`/${type}/`) + type.length + 2, url.indexOf('.html'));
    let tag_description = '';
    dom.window.document.querySelector('div.description')?.querySelectorAll('p').forEach(p => {
        tag_description = tag_description + ' ' + p.textContent;
    });
    let tag_attribute = getAttibutes(dom.window.document.querySelectorAll('tr.rowColor'), dom.window.document.querySelectorAll('tr.altColor'));
    return new Tag(clearValue(tag_name), clearValue(tag_description), tag_attribute);
};

const getAttibutes = (node: NodeListOf<Element>, node2: NodeListOf<Element>): any[] => {
    let attributes: any[] = [];
    node.forEach(tr => {
        const attr = tr.querySelectorAll('td');
        if (attr.length === 4) {
            attributes.push(createAttr(attr));
        }
    });
    node2.forEach(tr => {
        const attr = tr.querySelectorAll('td');
        if (attr.length === 4) {
            attributes.push(createAttr(attr));
        }
    });
    return attributes;
};

const createAttr: any = (attr: any) => {
    let name = clearValue(attr[0]?.textContent || '');
    let required = clearValue(attr[1]?.textContent || '');
    let type = clearValue(attr[2]?.textContent || '');
    let description = clearValue(attr[3]?.textContent || '');
    return {
        name,
        required,
        type,
        description,
    };
};

const clearValue = (value: string): string => {
    value = value.trim();
    return value;
};

export const execute = async (folder: string, url: string, version: string, tags: any[]) => {
    const urlTags: any = await getAllUrlTags(url, tags);
    for (const urlTag of urlTags) {
        let finalTags: Tag[] = [];
        console.log(`Generating file: ${urlTag.type}-${version}`);
        for (const tag of urlTag.urls) {                     
            const tagInfo = await getTagInfo(urlTag.type, tag);
            finalTags.push(tagInfo);
        }
        const json = JSON.stringify({ components: { component: finalTags } }, null, 2);
        fs.writeFileSync(`./src/data/${folder}/${urlTag.filename}-${version}.json`, json);
        clearJson(`./src/data/${folder}/${urlTag.filename}-${version}.json`);
    }
};