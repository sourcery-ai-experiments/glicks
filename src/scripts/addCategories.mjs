async function addCategories(newCategories, event) {
  event.preventDefault();
  console.log('addCategories called');
  console.log(newCategories);
  const categoriesFileHandle = await window.showOpenFilePicker({ types: [{ accept: { 'application/json': ['.json'] } }] });
  const categoriesFile = await categoriesFileHandle[0].getFile();
  const categoriesData = JSON.parse(await categoriesFile.text());
  console.log(categoriesData);

  const writableStream = await categoriesFileHandle[0].createWritable();
  await writableStream.write(JSON.stringify([...categoriesData,...newCategories], null, 2));
  await writableStream.close();
  return categoriesData;
}

export default addCategories;