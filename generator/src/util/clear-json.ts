
import fs from 'fs';

const seachAnReplaceValues = [
    { search: ' <code>', replace: ' ' },
    { search: '<code>', replace: ' ' },
    { search: '</code> ', replace: ' ' },
    { search: '</code>', replace: ' ' },
    { search: ' <strong>', replace: ' ' },
    { search: '<strong>', replace: ' ' },
    { search: '</strong> ', replace: ' ' },
    { search: '</strong>', replace: ' ' },
    { search: ' <p>', replace: ' ' },
    { search: '<p>', replace: ' ' },
    { search: '</p> ', replace: ' ' },
    { search: '</p>', replace: ' ' },
    { search: '&amp;quot;', replace: '\\"' },
    { search: '&amp;apos;', replace: '\'' },
    { search: '&amp;lt;', replace: '<' },
    { search: '&amp;gt;', replace: '>' },
    { search: '&amp;amp;', replace: '&' },
    { search: '&amp;#64;', replace: '@' },
    { search: '&quot;', replace: '\\"' },
    { search: '&apos;', replace: '\'' },
    { search: '&lt;', replace: '<' },
    { search: '&gt;', replace: '>' },
    { search: '&amp;', replace: '&' },
    { search: '&#64;', replace: '@' },    
];

export const clearJson = (jsonFileName: string) => {
    let jsonFile = fs.readFileSync(jsonFileName, 'utf-8');
    seachAnReplaceValues.forEach(x => {
        jsonFile = jsonFile.replace(new RegExp(x.search, 'g'), x.replace);
    })
    fs.writeFileSync(jsonFileName, jsonFile, 'utf-8');
};