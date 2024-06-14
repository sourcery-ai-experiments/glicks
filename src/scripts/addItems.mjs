import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//Get the __filename equivalent by using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to add items to items file
function addItems(items) {
    const itemsPath = path.join(__dirname, '../assets/data/items.json');
    const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));
    itemsData.push(items);
    fs.writeFileSync(itemsPath, JSON.stringify(itemsData, null, 2), 'utf8');
    items.forEach(item => {
        console.log('Item added: ', item.name);
    });
}

export default addItems;