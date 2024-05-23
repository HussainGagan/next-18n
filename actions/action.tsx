'use server';

import fs, {promises} from 'fs';
import util from 'util';
import path from 'path';
import {unstable_noStore} from 'next/cache';

const mkdir = util.promisify(fs.mkdir);

export async function getTranslationFile() {
  try {
    unstable_noStore();
    const data = await fetch(
      `https://freecash-api.enactweb.com/api/v1/translations`,
      {
        cache: 'no-cache',
      },
    ).then(res => res.json());
    const formattedData = convertToObject(data.data);
    // console.log('🚀 ~ getTranslationFile ~ formattedData:', formattedData);
    let keys = Object.keys(formattedData);
    // keys.forEach(async key => {
    //   let jsonString = JSON.stringify(formattedData[key], null, 2);
    //   await mkdir(`./public/locales/${key}`, {recursive: true});
    //   fs.writeFile(
    //     `./public/locales/${key}/common.json`,
    //     jsonString,
    //     'utf8',
    //     err => {
    //       if (err) {
    //         console.error('Error writing file:', err);
    //       } else {
    //         // console.log(`JSON object has been successfully written to ${key}.json`);
    //       }
    //     },
    //   );
    // });
  } catch (error) {
    console.log('🚀 ~ getTranslationFile ~ error:', error);
    return {};
  }
}

function convertToObject(originalData) {
  unstable_noStore();
  const result = {};
  originalData.forEach(item => {
    const {trans_key, trans_value} = item;
    const [category, subCategory, key] = trans_key.split('.');
    Object.keys(trans_value).forEach(lang => {
      if (!result[lang]) {
        result[lang] = {};
      }
      if (!result[lang][category]) {
        result[lang][category] = {};
      }
      if (!result[lang][category][subCategory]) {
        result[lang][category][subCategory] = {};
      }
      result[lang][category][subCategory][key] = trans_value[lang];
    });
  });
  return result;
}

export async function getTranslationFileFromAPI({lang, from}) {
  console.log('in translation file from ' + from);
  try {
    unstable_noStore();
    const languages = await getTranslationFile();
    // return languages[lang];
    const filePath = path.resolve(`./public/locales/${lang}/common.json`);
    const fileContents = await promises.readFile(filePath, 'utf8');
    const translationData = JSON.parse(fileContents);
    // console.log('🚀 ~ getTranslationFileFromAPI ~ JSON.parse(fileContents):', JSON.parse(fileContents));
    return translationData;
  } catch (error) {
    console.log('🚀 ~ getTranslationFileFromAPI ~ error:', error);
    return {};
  }
}
