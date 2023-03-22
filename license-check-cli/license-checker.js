const fs = require('fs');
const path = require('path');

function findLicenses(codeDir) {
  const licenses = {};
  const nodeModulesDir = path.join(codeDir, 'node_modules');

  if (fs.existsSync(nodeModulesDir)) {
    fs.readdirSync(nodeModulesDir).forEach(moduleName => {
      const moduleDir = path.join(nodeModulesDir, moduleName);
      const packageFile = path.join(moduleDir, 'package.json');

      if (fs.existsSync(packageFile)) {
        const packageData = JSON.parse(fs.readFileSync(packageFile));

        if (packageData.license) {
          licenses[packageData.name] = packageData.license;
        }
      }

      if (fs.lstatSync(moduleDir).isDirectory()) {
        Object.assign(licenses, findLicenses(moduleDir));
      }
    });
  }

  // Recursively search subdirectories
  fs.readdirSync(codeDir).forEach(file => {
    const filePath = path.join(codeDir, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      Object.assign(licenses, findLicenses(filePath));
    }
  });

  return licenses;
}

const codeDir = process.argv[2];

if (!codeDir) {
  console.error('Usage: node license-checker.js <code_dir>');
  process.exit(1);
}

const licenses = findLicenses(codeDir);

console.log('Third-party licenses:');
console.log(JSON.stringify(licenses, null, 2));
