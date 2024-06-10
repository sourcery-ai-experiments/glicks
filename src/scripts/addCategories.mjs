import schemaValidation from "./schemaValidation.mjs";
import updateSchema from "./updateSchema.mjs";
import categoriesData from '../assets/data/categories.json' assert { type: 'json' }
import categoriesSchema from '../schemas/categoriesSchema.json' assert { type: 'json' }

import itemsData from '../assets/data/items.json' assert { type: 'json' }
import itemsSchema from '../schemas/itemsSchema.json' assert { type: 'json' }

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//Get the __filename equivalent by using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Function that adds a new category to the categories file.
 * @param {Array} newCategory the new category to be added.
 * @returns {console} Logs success or failure message.
 */
function addCategories(newCategories) {
  const categoriesPath = path.join(__dirname, '../assets/data/categories.json');
  const validNewCategories = newCategories.filter(newCategory => {
    // Check if the category name or ID already exists in categoriesData
    const nameExists = categoriesData.some(category => category.name === newCategory.name);
    const idExists = categoriesData.some(category => category.id === newCategory.id);

    // Ensure the new category has valid types and values
    const isValidType = typeof newCategory.name === 'string' && typeof newCategory.id === 'number';
    const isValidId = newCategory.id > 0;
    const isCheckedFalse = newCategory.checked === false;

    // Return true if the category does not exist and all validations pass
    return !nameExists && !idExists && isValidType && isValidId && isCheckedFalse;
  });

  console.log(validNewCategories);

  console.log('Valid new categories: ', validNewCategories);
  console.log('Invalid new categories: ', newCategories.filter((category, index, self) => index !== self.findIndex((t) => (t.name === category.name)) || ((category, index, self) => index !== self.findIndex((t) => (t.id === category.id)))));
  
  if (validNewCategories.length > 0) {  
    categoriesData.push(...validNewCategories);
    // Check with categoriesSchema if the updated version of categoriesData is valid
    const validCategoriesData = schemaValidation(categoriesSchema, itemsSchema, categoriesData, itemsData);
    if (!validCategoriesData) {
      console.log('Invalid categories. Categories not updated.');
      return;
    } else {
      console.log('Valid categories.');
    }
  
    fs.writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2), 'utf8');
    newCategories.forEach(category => {
      console.log('Category added: ', category.name);
    });
    updateSchema();

  } else {
    console.log('Invalid categories. Categories not added.');
  }
}
addCategories([{
  "id": 14,
  "name": "test4",
  "checked": false
},
{
  "id": 13,
  "name": "test5",
  "checked": false
}])

export default addCategories;