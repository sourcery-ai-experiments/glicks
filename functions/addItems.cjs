/**
 * Netlify function file for handling api request to add items 
 * to the items.json data file
 */
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const { readFile, writeFile } = require('fs');
const { join, resolve } = require('path');
const serverless = require('serverless-http');
const { v4: uuidv4 } = require('uuid');
const itemsSchema = require(resolve('src', 'schemas', 'itemsSchema.json'));
const { itemsSchemaValidation } = require(resolve('src', 'scripts', 'schemaValidation.cjs'));

const app = express();
app.use(cors());
app.use(json());

const itemsFilePath = join('src', 'assets', 'data', 'items.json');

//API endpoint for adding items 
app.post('/api/addItems', (req, res) => {
    const receivedItems = req.body;
    readFile(itemsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        try {
            const items = JSON.parse(data);
            console.log("type: ", typeof items);
            // Check if item with same name or image or description exists
            for (newItem of receivedItems) {
                // Add an id thats one higher than highest id in all items
                newItem.id = items.length + receivedItems.filter(item => item.id).length + 1;
                for (existingItem of items) {
                    if (
                        existingItem.id === newItem.id ||
                        existingItem.name === newItem.name ||
                        existingItem.imageSrc === newItem.imageSrc ||
                        JSON.stringify(existingItem.description) === JSON.stringify(newItem.description))
                    {
                        similarItemExists = true;
                        break;
                    } else {
                        similarItemExists = false;
                        console.log('check 2 similarItemExists: ', similarItemExists);
                        continue;
                    }
                }
                console.log('check 3 similarItemExists: ', similarItemExists);
                if (similarItemExists) {
                    res.status(400).json({ error: 'Item already exists' });
                    return;
                } else {
                    continue;
                }
            }
            // add itemsWithId into the array in items object
            items.push(...receivedItems);
            console.log('items type after push: ', typeof items);

            const validItems = itemsSchemaValidation(itemsSchema, items);
            if (!validItems.valid) {
                res.status(400).json({ error: 'Invalid items ' + JSON.stringify(validItems.errors) });
                return;
            }

            // Write the new data to the JSON file
            writeFile(itemsFilePath, JSON.stringify(items), err => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    res.status(500).json({ error: 'Internal server error' });
                    return;
                }
                res.status(200).json({ message: 'Items added successfully' });
            });
        } catch (err) {
            console.error('Error parsing JSON file:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

/**
 * Function that checks the highest id in the received param and returns one higher
 * @param {Array} items - Array of items
 * @returns {Number} highest id in the array
 */
function getHighestId(items) {
    return Math.max(...items.map(item => item.id));
}

module.exports.handler = serverless(app);
