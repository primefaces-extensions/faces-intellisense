import fs from "fs";
import https from "https";
import * as xml2js from "xml2js";
import { Tag } from "../model/tag";
import { clearJson } from "./clear-json";

const options = {
  mergeAttrs: true,
  trim: true,
  normalizeTags: true,
  normalize: true,
  ignoreAttrs: true,
  explicitArray: false,
  tagNameProcessors: [(name: string) => tagName(name)],
};

const tagName = (name: string) => {
  if ("facelet-taglib" === name) return "root";
  if ("tag-name" === name) return "name";
  return name;
};

const createAttr = (jsonFileName: string, xmlFileName: string) => {
  const allJson = JSON.parse(fs.readFileSync(jsonFileName, "utf8"));
  const allTag = allJson.root.tag;
  let finalTag: Tag[] = [];
  if (allTag && !Array.isArray(allTag)) {
    console.log(allTag);
    finalTag.push(new Tag(allTag.name ? allTag.name : "", allTag?.description ? allTag?.description : "", allTag?.attribute ? allTag?.attribute : []));
  } else {
    allTag &&
      allTag.forEach((tag: any) => {
        let desc = tag?.description ?? "";
        desc = desc
          .replace(/<[^>]*>/g, "")
          .replace(/[\n\t]/g, "")
          .trim(); // strip HTML tags
        let attr = tag?.attribute ?? [];
        Array.isArray(attr) &&
          attr.forEach((attribute: any) => {
            attribute.description = attribute.description
              ?.replace(/<[^>]*>/g, "")
              .replace(/[\n\t]/g, "")
              .trim(); // strip HTML tags
          });
        finalTag.push(new Tag(tag.name ?? "", desc, attr));
      });
  }
  let json = JSON.stringify({ components: { component: finalTag } }, null, 2);
  json = json.replace(/<[^>]*>/g, "").trim(); // strip HTML tags
  fs.writeFileSync(jsonFileName, json);
  fs.unlinkSync(xmlFileName);
  clearJson(jsonFileName);
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
    file.on("finish", () => {
      file.close();
      convertJson(xmlFileName, jsonFileName);
    });
  });
};
