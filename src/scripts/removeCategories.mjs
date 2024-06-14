import fs from 'fs';
import path from 'path';

/**
 * Function to remove one or more categories from the categories file.
 * @param {Array} categoryIds the one or more categories to be removed.
 * @returns {console} Logs success or failure message
 */
function removeCategories(categoryIds) {
  const categoriesPath = path.join(__dirname, '../assets/data/categories.json');
  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  
  const remainingCategories = categoriesData.filter(category =>!categoryIds.includes(category.id));
  
  fs.writeFileSync(categoriesPath, JSON.stringify(remainingCategories, null, 2), 'utf8');

  const removedCategories = categoriesData.filter(category => categoryIds.includes(category.id));
  removedCategories.forEach(category => {
    console.log('Category removed: ', category.name);
  });
}

removeCategories([7, 8]);
export default removeCategories;