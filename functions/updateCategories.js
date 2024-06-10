import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { readFile } from 'fs';
import { join } from 'path';

const app = express();
app.use(cors());
app.use(json());

// API endpoint for updating categories
app.post('/.netlify/functions/updateCategories', (req, res) => {
  console.log('req.body', req.body);
  const newCategories = req.body;
  const filePath = join(__dirname, '..', 'src/assets/data/categories.json');

  // Read the existing JSON file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    try {
      const existingCategories = JSON.parse(data);
      const updatedCategories = [...existingCategories, ...newCategories];

      // Write the updated categories back to the JSON file
      fs.writeFile(filePath, JSON.stringify(updatedCategories, null, 2), 'utf8', (err) => {
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

export const handler = app;
