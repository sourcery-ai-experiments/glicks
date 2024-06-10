import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import schemaValidation from './schemaValidation.mjs';
import categoriesData from '../assets/data/categories.json' assert { type: 'json' }
import categoriesSchema from '../schemas/categoriesSchema.json' assert { type: 'json' }
import itemsData from '../assets/data/items.json' assert { type: 'json' }
import itemsSchema from '../schemas/itemsSchema.json' assert { type: 'json' }


//Get the __filename equivalent by using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update the itemsSchema with category names
function updateSchema() {
    const schemaPath = path.join(__dirname, '../schemas/itemsSchema.json');

    const validCategories = categoriesData.filter((category, index, self) => index === self.findIndex((t) => (t.name === category.name)) && typeof category.name == 'string').map(category => category.name);
    console.log('Valid categories: ', validCategories);
    console.log('info check before: ', itemsSchema.items.properties.description.properties.category.enum);
    // Read and update schema
    itemsSchema.items.properties.description.properties.category.enum = validCategories;
    console.log('info check after: ', itemsSchema.items.properties.description.properties.category.enum);
    // Check if new schema is valid
    const validSchema = schemaValidation(categoriesSchema, itemsSchema, categoriesData, itemsData);
    if (!validSchema) {
        console.log('Invalid schema. Schema not updated.');
        return;
    } else {
        console.log('Valid schema.');
    }
    // Write the updated schema back to file
    fs.writeFileSync(schemaPath, JSON.stringify(itemsSchema, null, 2), 'utf8');
    console.log('Schema updated with categories.');
}
updateSchema();
export default updateSchema;