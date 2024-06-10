import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

import categoriesData from '../assets/data/categories.json' assert { type: 'json' }
import categoriesSchema from '../schemas/categoriesSchema.json' assert { type: 'json' }

import itemsData from '../assets/data/items.json' assert { type: 'json' }
import itemsSchema from '../schemas/itemsSchema.json' assert { type: 'json' }

/**
 * Function that validates the categories and items data against the schema
 * and validates the schemas themselves
 * @param {JSON} itemsSchemaArg the itemsSchemaArg would usually take the itemsSchema but can take an unsaved updated version
 * @param {JSON} categoriesDataArg the categoriesDataArg would usually take the categoriesData but can take an unsaved updated version
 * @param {JSON} itemsDataArg the itemsDataArg would usually take the itemsData but can take an unsaved updated version
 * @returns true if both schemas are valid, false otherwise
 */
function schemaValidation(categoriesSchemaArg, itemsSchemaArg, categoriesDataArg, itemsDataArg) {
  // Define custom format for relative or absolute URLs
  ajv.addFormat('custom-uri', {
    validate: value => {
      // Simple pattern to check for absolute URLs or relative paths
      const pattern = /^(https?:\/\/|\/[\w\-\.]+)/;
      return pattern.test(value);
    }
  });

  const validateCategories = ajv.compile(categoriesSchemaArg);
  const validateItems = ajv.compile(itemsSchemaArg);

  const validCategories = validateCategories(categoriesDataArg);
  const validItems = validateItems(itemsDataArg);

  if (!validCategories) {
    console.log("Categories data is invalid: ", validateCategories.errors, "Categories error...");
  } else {
    console.log("Categories data is valid!");
  }

  if (!validItems) {
    console.log("Items data is invalid: ", validateItems.errors, "Items error...");
  } else {
    console.log("Items data is valid!");
  }
  if (!validCategories || !validItems) {
    return false;
  }
  return true;
}
schemaValidation(categoriesSchema, itemsSchema, categoriesData, itemsData);
export default schemaValidation;