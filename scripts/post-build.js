const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "..", "node_modules");
const destBaseDir = path.resolve(
  __dirname,
  "..",
  "out",
  "frameresizer2-win32-x64",
  "resources",
  "node_modules",
);

// Modules to copy outside ASAR
const modulesToCopy = ["sharp", "@img", "detect-libc", "semver", "@img/colour"];

function copyModule(moduleName) {
  const srcPath = path.join(srcDir, moduleName);
  const destPath = path.join(destBaseDir, moduleName);

  if (!fs.existsSync(srcPath)) {
    console.log(`⚠ Source path not found: ${srcPath}`);
    return;
  }

  // Remove existing destination
  if (fs.existsSync(destPath)) {
    fs.rmSync(destPath, { recursive: true, force: true });
  }

  // Create parent directory
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  // Copy the module
  fs.cpSync(srcPath, destPath, { recursive: true });
  console.log(`✓ Copied ${moduleName}`);
}

try {
  console.log("Running post-build tasks...");

  // Ensure destination directory exists
  fs.mkdirSync(destBaseDir, { recursive: true });

  // Copy modules
  modulesToCopy.forEach((moduleName) => {
    copyModule(moduleName);
  });

  console.log("✓ Post-build tasks completed successfully!");
} catch (error) {
  console.error("Error during post-build:", error);
  process.exit(1);
}
