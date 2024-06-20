// scripts/generate-router.js
const fs = require('fs');
const path = require('path');

// Log the environment variable to a file
const logPath = path.resolve(__dirname, './generateRouter.log');
fs.writeFileSync(logPath, `VITE_LOCAL_ENV: ${process.env.VITE_LOCAL_ENV}\n`, { flag: 'a' });

const isLocalEnv = process.env.VITE_LOCAL_ENV === 'true';
const templatePath = path.resolve(__dirname, '../router.template.js');
const outputPath = path.resolve(__dirname, '../router.js');

let templateContent = fs.readFileSync(templatePath, 'utf-8');

if (isLocalEnv) {
  /**
   * If the environment is local,
   * add all admin routes listed to generated router.
   */
  const adminRoutes = `
  {
    path: '/admin',
    component: () => import('./views/admin/Admin.vue')
  },
  {
  path: '/admin/addItems',
  component: () => import('./views/admin/AddItems.vue')
  }`;
  templateContent = templateContent.replace('// @admin-route', adminRoutes);
} else {
  templateContent = templateContent.replace('// @admin-route', '');
}

fs.writeFileSync(outputPath, templateContent);
console.log(`Router configuration generated at ${outputPath}`);
