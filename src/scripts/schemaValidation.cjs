const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv();
addFormats(ajv);

const categoriesData = require('../assets/data/categories.json') 
const categoriesSchema = require('../schemas/categoriesSchema.json')

const itemsData = require('../assets/data/items.json')
const itemsSchema = require('../schemas/itemsSchema.json')

/**
 * Function that validates the categories and items data against the schema
 * and validates the schemas themselves
 * @param {JSON} itemsSchemaArg the itemsSchemaArg would usually take the itemsSchema but can take an unsaved updated version
 * @param {JSON} itemsDataArg the itemsDataArg would usually take the itemsData but can take an unsaved updated version
 * @returns true if the schema is valid, false otherwise
 */
function itemsSchemaValidation(itemsSchemaArg, itemsDataArg) {
  // Define custom format for relative or absolute URLs
  ajv.addFormat('custom-uri', {
    validate: value => {
      // Simple pattern to check for absolute URLs or relative paths
      const pattern = /^(https?:\/\/|\/[\w\-\.]+)/;
      return pattern.test(value);
    }
  });

  const validateItems = ajv.compile(itemsSchemaArg);

  const validItems = validateItems(itemsDataArg);

  if (!validItems) {
    console.log("Items data is invalid: ", validateItems.errors, "Items error...");
    return{
      valid: false,
      errors: validateItems.errors,
    }
  } 
  console.log("Items data is valid!");
  return {
    valid: true,
    errors: null,
  }
}

function categoriesSchemaValidation(categoriesSchemaArg, categoriesDataArg) {
  const validateCategories = ajv.compile(categoriesSchemaArg);
  const validCategories = validateCategories(categoriesDataArg);

  if (!validCategories) {
    console.log("Categories data is invalid: ", validateCategories.errors, "Categories error...");
    return false;
  } 
  console.log("Categories data is valid!");
  return true;
}

itemsSchemaValidation(itemsSchema, itemsData);
categoriesSchemaValidation(categoriesSchema, categoriesData);

module.exports = {
  itemsSchemaValidation,
  categoriesSchemaValidation,
}