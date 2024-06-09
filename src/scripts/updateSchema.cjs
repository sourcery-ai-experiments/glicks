const fs = require('fs');
const path = require('path');

// Function to update the schema with categories
function updateSchema() {
    const categoriesPath = path.join(__dirname, '../assets/data/categories.json');
    const schemaPath = path.join(__dirname, '../schemas/itemsSchema.json');

    // Read categories
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const validCategories = categoriesData.map(cat => cat.name);

    // Read and update schema
    const schemaData = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    schemaData.items.properties.description.properties.categories.enum = validCategories;

    // Write the updated schema back to file
    fs.writeFileSync(schemaPath, JSON.stringify(schemaData, null, 2), 'utf8');
    console.log('Schema updated with categories.');
}

// Run the function
updateSchema();
