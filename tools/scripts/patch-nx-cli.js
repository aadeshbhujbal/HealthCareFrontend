const fs = require('fs');
const path = require('path');

// Create symlinks for local packages
const createSymlinks = () => {
  const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

  // Ensure @health-care-frontend directory exists
  const scopeDir = path.join(nodeModulesPath, '@health-care-frontend');
  if (!fs.existsSync(scopeDir)) {
    fs.mkdirSync(scopeDir, { recursive: true });
  }

  // Create symlinks for each library
  const libraries = ['design-system', 'shared-services'];

  libraries.forEach((lib) => {
    const targetPath = path.resolve(__dirname, `../../libs/${lib}`);
    const symlinkPath = path.join(scopeDir, lib);

    // Remove existing symlink if it exists
    if (fs.existsSync(symlinkPath)) {
      fs.unlinkSync(symlinkPath);
    }

    // Create relative symlink
    const relativePath = path.relative(path.dirname(symlinkPath), targetPath);
    fs.symlinkSync(relativePath, symlinkPath, 'junction');

    console.log(`Created symlink for @health-care-frontend/${lib}`);
  });
};

try {
  createSymlinks();
  console.log('Successfully patched workspace packages');
} catch (error) {
  console.error('Error patching workspace packages:', error);
  process.exit(1);
}
