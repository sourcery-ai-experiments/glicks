// scripts/generate-router.js
const fs = require('fs');
const path = require('path');

const isLocalEnv = process.env.VITE_LOCAL_ENV === 'true';
const templatePath = path.resolve(__dirname, '../router.template.js');
const outputPath = path.resolve(__dirname, '../router.js');

let templateContent = fs.readFileSync(templatePath, 'utf-8');

if (isLocalEnv) {
  const adminRoute = `
  {
    path: '/admin',
    component: () => import('./views/admin/Admin.vue')
  },
  {
  path: '/admin/addItems',
  component: () => import('./views/admin/AddItems.vue')
  }`;
  templateContent = templateContent.replace('// @admin-route', adminRoute);
} else {
  templateContent = templateContent.replace('// @admin-route', '');
}

fs.writeFileSync(outputPath, templateContent);
console.log(`Router configuration generated at ${outputPath}`);
