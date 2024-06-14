// Function to update the itemsSchema with category names
async function updateSchema() {
    // Read the JSON files using the File System Access API
    const categoriesFileHandle = await window.showOpenFilePicker({ types: [{ accept: { 'application/json': ['.json'] } }] });
    const categoriesFile = await categoriesFileHandle[0].getFile();
    const categoriesData = JSON.parse(await categoriesFile.text());
    console.log(categoriesData);

    const itemsFileHandle = await window.showOpenFilePicker({ types: [{ accept: { 'application/json': ['.json'] } }] });
    const itemsFile = await itemsFileHandle[0].getFile();
    const itemsData = JSON.parse(await itemsFile.text());

    const itemsSchemaFileHandle = await window.showOpenFilePicker({ types: [{ accept: { 'application/json': ['.json'] } }] });
    const itemsSchemaFile = await itemsSchemaFileHandle[0].getFile();
    const itemsSchema = JSON.parse(await itemsSchemaFile.text());

    const validCategories = categoriesData.filter((category, index, self) => index === self.findIndex((t) => (t.name === category.name)) && typeof category.name == 'string').map(category => category.name);
    console.log('Valid categories: ', validCategories);
    console.log('info check before: ', itemsSchema.items.properties.description.properties.category.enum);
    // Read and update schema
    itemsSchema.items.properties.description.properties.category.enum = validCategories;
    console.log('info check after: ', itemsSchema.items.properties.description.properties.category.enum);

    // Write the updated schema back to the file
    const writableStream = await itemsSchemaFileHandle[0].createWritable();
    await writableStream.write(JSON.stringify(itemsSchema, null, 2));
    await writableStream.close();

    return { itemsSchema, categoriesData, itemsData };
}

export default updateSchema;
