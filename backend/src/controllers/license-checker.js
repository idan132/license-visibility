const fs = require('fs');
const path = require('path');
const {Request, Response} = require('express');
const { json } = require('express/lib/response');
const { dir } = require('console');

function findLicenses(codeDir, parentNodeModulesDir = null) {
  const licenses = {};
  const nodeModulesDir = path.join(codeDir, 'node_modules');
  if (fs.existsSync(nodeModulesDir) && nodeModulesDir.indexOf("test") == -1) {
    // If this is a subdirectory of a node_modules directory, use the parent directory as the parent node_modules directory
    const parent = parentNodeModulesDir || path.dirname(nodeModulesDir);

    fs.readdirSync(nodeModulesDir).forEach(moduleName => {
      const moduleDir = path.join(nodeModulesDir, moduleName);
      const packageFile = path.join(moduleDir, 'package.json');

      if (fs.existsSync(packageFile)) {
        const packageData = JSON.parse(fs.readFileSync(packageFile));
        const modulePath = path.dirname(path.join(parent, path.relative(parentNodeModulesDir || codeDir, packageFile)));

        if (packageData.license) {
          licenses[packageData.name] = {
            license: packageData.license,
            path: modulePath
          };
        }
      }

      if (fs.lstatSync(moduleDir).isDirectory()) {
        Object.assign(licenses, findLicenses(moduleDir, nodeModulesDir));
      }
    });
  }

  // Recursively search subdirectories
  fs.readdirSync(codeDir).forEach(file => {
    const filePath = path.join(codeDir, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      Object.assign(licenses, findLicenses(filePath, parentNodeModulesDir));
    }
  });

  return licenses;
}

async function licenseCheck(req, res) {
  try{
    console.log('I am in the code')
    let codeDir = req.body.codeDir
    let dirs = codeDir.split("/")
    const num_of_dirs = dirs.length
    const root_dir = dirs[num_of_dirs - 1]
    
    var results = []
    const licenses = await findLicenses(codeDir)
    var i = 1
    for (let dependency in licenses) {
      const raw_path = licenses[dependency].path.split("/node_modules")[0]
      const path = root_dir + raw_path.split(root_dir)[1]
      results.push({
        id: i,
        dependency: dependency,
        license: licenses[dependency].license,
        path: path
      })

      i++
    }
    
    console.log('Third-party licenses:');
    console.log(JSON.stringify(results, null, 2));
  
    res.send({
      licenses: results
    })
  }
  catch(err){
    console.log(err)
  }
}



module.exports = licenseCheck;

