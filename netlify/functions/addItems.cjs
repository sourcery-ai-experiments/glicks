/**
 * Netlify function file for handling api request to add items 
 * to the items.json data file
 */
const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');

const itemsSchema = require(resolve('src', 'schemas', 'itemsSchema.json'));
const { itemsSchemaValidation } = require(resolve('src', 'scripts', 'schemaValidation.cjs'));
const itemsFilePath = resolve('src', 'assets', 'data', 'items.json');
const getHighestId = require(resolve('src', 'scripts', 'getHighestId.cjs'));

// Function for adding items
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        // return error 405
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
    try {
        const { newItems, newImages } = JSON.parse(event.body);

        // Debug: Check the type and content of items
        console.log('Type of newItems:', typeof newItems);
        console.log('Is newItems an array?', Array.isArray(newItems));

        // Checks for duplicate items
        const duplicateItems = newItems.filter((newItem, index) => {
            return newItem.name === newItems[index + 1]?.name ||
                newItem.description === newItems[index + 1]?.description;
        });

        if (duplicateItems.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Duplicate items' })
            };
        }

        const data = await readFile(itemsFilePath, 'utf8');
        const items = JSON.parse(data);
        /** 
         * Check if item with same name or image or description exists 
         * if yes return error 400 
         * if not push item into existing items
        */
        for (let newItem of newItems) {
            newId = getHighestId(items) + 1;
            let itemExists = items.some(existingItem =>
                existingItem.name === newItem.name ||
                JSON.stringify(existingItem.description) === JSON.stringify(newItem.description)
            );

            if (itemExists) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'At least one item already exists' })
                }
            } else {
                const newItemWithId = { id: newId, ...newItem };
                items.push(newItemWithId);
            }
        }
        // Validate items with new items
        const validItems = itemsSchemaValidation(itemsSchema, items);
        // If invalid items, return error 400
        if (!validItems) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid items ' + validItems.errors })
            }
        }

        // Validate the image file and make sure that image name is in imageSrc
        /**
         * Each item must have an image and the imageSrc of each item must match the imageName of it's image
         * Each image object must contain a name, and image file 
         * if not, return error 400
         * if yes, push image into existing /images
         */
        if (!newImages) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No images provided' })
            }
        }
        if (!Array.isArray(newImages)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid images received' })
            }
        }
        if (newImages.length !== newItems.length) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Each item must have an image' })
            }
        }
        if (newImages.some(image => !image.fileName || !image.file)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Each image must contain a name and an image file' })
            }
        }
        if (newImages.some(image => !newItems.some(item => item.imageSrc === `/${image.fileName}`))) {
            return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Each imageSrc must match the name of an image' })
            }
        }

        // Push the images into /images and the items into items.json
        try {
            for (let image of newImages) {
                const imagePath = resolve('public', 'images', image.fileName);
                await writeFile(imagePath, image.file, 'base64');
            }
            // Write the new items data
            await writeFile(itemsFilePath, JSON.stringify(items));

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Items added successfully' })
            };
        } catch (err) {
            console.error('Error in addItems: ', err);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Internal server error' + err })
            };
        }
    } catch (err) {
        console.error('Error in addItems: ', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' + err })
        };
    }
};

