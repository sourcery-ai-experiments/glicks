// scripts/generate-router.js
const fs = require('fs');
const path = require('path');

const isLocalEnv = process.env.VITE_LOCAL_ENV === 'true';
const templatePath = path.resolve(__dirname, '../src/router.template.js');
const outputPath = path.resolve(__dirname, '../src/router.js');

let templateContent = fs.readFileSync(templatePath, 'utf-8');

if (isLocalEnv) {
  const adminRoute = `
  {
    path: '/admin',
    component: () => import('./views/Admin.vue')
  }`;
  templateContent = templateContent.replace('// @admin-route', adminRoute);
} else {
  templateContent = templateContent.replace('// @admin-route', '');
}

fs.writeFileSync(outputPath, templateContent);
console.log(`Router configuration generated at ${outputPath}`);
