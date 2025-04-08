import axios from 'axios';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Tag } from '../model/tag';
import { clearJson } from './clear-json';

const getAllUrlTags = async (url: string, tags: any[]) => {
    const baseUrl = new URL(url).origin;
    const response = await axios.get(url + 'alltags-frame.html', { headers: { 'Content-Type': 'text/plain' } });
    const dom = new JSDOM(response.data);
    dom.window.document.querySelectorAll(`a[target='tagFrame']`).forEach((a) => {
        const pref = a.textContent?.substring(0, a.textContent.indexOf(':'));
        const comp = a.getAttribute('href');
        const alias = pref === 'faces' ? 'f' : pref;
        if (!comp?.includes('.fn.')) {
            tags.forEach((element, index) => {
                if (element.type === alias) {
                    tags[index].urls.push(`${baseUrl}${comp}`);
                }
            });
        }
    });
    return tags;
};

const getTagInfo = async (type: string, url: string) => {
    const response = await axios.get(url, { headers: { 'Content-Type': 'text/plain' } });
    const dom = new JSDOM(response.data);
    const tag_name = url.includes('.html')
        ? url.substring(url.lastIndexOf('/') + 1, url.indexOf('.html'))
        : url.substring(url.lastIndexOf('/') + 1);
    console.log("Processing Tag:", tag_name);
    let tag_description = '';
    dom.window.document
        .querySelector('div.description')
        ?.querySelectorAll('p')
        .forEach((p) => {
            tag_description = tag_description + ' ' + p.textContent;
        });

    if (tag_description === '') {
        let description = dom.window.document.querySelector('div.description')?.textContent || '';
        description = description.replace('Description:', '').trim();
        tag_description = description;
    }
    const tag_attribute = getAttributes(dom.window.document.querySelectorAll('tr.rowColor'), dom.window.document.querySelectorAll('tr.altColor'));
    return new Tag(clearValue(tag_name), clearValue(tag_description), tag_attribute);
};

const getAttributes = (node: NodeListOf<Element>, node2: NodeListOf<Element>): any[] => {
    const attributes: any[] = [];
    node.forEach((tr) => {
        const attr = tr.querySelectorAll('td');
        if (attr.length === 4) {
            attributes.push(createAttr(attr));
        }
    });
    node2.forEach((tr) => {
        const attr = tr.querySelectorAll('td');
        if (attr.length === 4) {
            attributes.push(createAttr(attr));
        }
    });
    return attributes;
};

const createAttr: any = (attr: any) => {
    const name = clearValue(attr[0]?.textContent || '');
    const required = clearValue(attr[1]?.textContent || '');
    const type = clearValue(attr[2]?.textContent || '');
    const description = clearValue(attr[3]?.textContent || '');
    return {
        name,
        required,
        type,
        description
    };
};

const clearValue = (value: string): string => {
    value = value.replace(/<[^>]*>/g, ''); // strip HTML tags
    value = value.replace(/[\n\t]/g, ''); // strip new lines and tabs
    value = value.replace(/\s+/g, ' '); // strip multiple spaces
    value = value.trim();
    return value;
};

export const execute = async (folder: string, url: string, version: string, tags: any[]) => {
    const urlTags: any = await getAllUrlTags(url, tags);
    for (const urlTag of urlTags) {
        console.log(urlTag);
        const finalTags: Tag[] = [];
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
