const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { readFile, writeFile } = require('fs');
const { join, resolve } = require('path');
const serverless = require('serverless-http');
const categorySchema = require(resolve('src', 'schemas', 'categoriesSchema.json'));
const { categoriesSchemaValidation } = require(resolve('src','scripts','schemaValidation.cjs'));


const app = express();
app.use(cors());
app.use(json());
const filePath = join('src', 'assets', 'data', 'categories.json');

// API endpoint for updating categories
app.post('/api/addCategory', (req, res) => {
  const newCategory = {
    name: null,
    checked: false,
    id: null,
  }
  console.log('req.body', req.body);
  console.log('UC 18 post 16 in process. req.body ' + JSON.stringify(req.body));
  newCategory.name = req.body.name;
  
  console.log('FilePath: ', filePath);

  // Read the existing JSON file
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    try {
      const categories = JSON.parse(data);
      // Check if category name exists
      const categoryExists = categories.find(category => category.name === newCategory.name);
      if (categoryExists) {
        res.status(400).json({ error: 'Category already exists' });
        return;
      }
      newCategory.id = categories.length + 2;
      categories.push(newCategory);

      console.log('categories: ', categories);
      
      // Validate the data using schema
      const validData = categoriesSchemaValidation(categorySchema, categories);
      if (!validData) {
        res.status(400).json({ error: 'Invalid data' });
        return;
      }
      // Write the updated categories back to the JSON file
      writeFile(filePath, JSON.stringify(categories, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        res.status(200).json({ message: 'Categories updated successfully' });
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

/**
 * Retrieves the maximum id value from an array of categories stored in a JSON file.
 * 
 * @param {string} filePath - The path to the JSON file containing the categories.
 * @returns {number} - The maximum id value from the categories.
 */
function getMaxCategoryId(categories) {
  return categories.reduce((max, category) => (category.id > max ? category.id : max), 0);
}

module.exports.handler = serverless(app);