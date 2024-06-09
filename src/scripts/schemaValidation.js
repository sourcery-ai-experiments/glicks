import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import categoriesData from '../assets/data/categories.json' assert { type: 'json' }
import schema from '../schemas/schema.json' assert { type: 'json' }

import itemsData from '../assets/data/items.json' assert { type: 'json' }
import itemsSchema from '../schemas/itemsSchema.json' assert { type: 'json' }

const ajv = new Ajv();
addFormats(ajv);

// Define custom format for relative or absolute URLs
ajv.addFormat('custom-uri', {
  validate: value => {
      // Simple pattern to check for absolute URLs or relative paths
      const pattern = /^(https?:\/\/|\/[\w\-\.]+)/;
      return pattern.test(value);
  }
});

const validateCategories = ajv.compile(schema);
const validateItems = ajv.compile(itemsSchema);

const validCategories = validateCategories(categoriesData);
const validItems = validateItems(itemsData);

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
