import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Running post-build tasks...");

// Copy native modules directly on macOS
if (process.platform === "darwin") {
  const outDir = path.join(__dirname, "../out");
  const appName = "frameresizer2-darwin-arm64";
  const appPath = path.join(
    outDir,
    appName,
    "frameresizer2.app",
    "Contents",
    "Resources",
  );

  const resourcesNodeModules = path.join(appPath, "node_modules");
  const projectNodeModules = path.join(__dirname, "../node_modules");

  const modulesToCopy = [
    "sharp",
    "@img",
    "detect-libc",
    "semver",
    "queue",
    "util-deprecate",
  ];

  try {
    console.log("📦 Copying native modules to app resources...");

    // Create node_modules directory if it doesn't exist
    if (!fs.existsSync(resourcesNodeModules)) {
      fs.mkdirSync(resourcesNodeModules, { recursive: true });
    }

    // Copy all required modules
    for (const moduleName of modulesToCopy) {
      const moduleSrc = path.join(projectNodeModules, moduleName);
      const moduleDest = path.join(resourcesNodeModules, moduleName);

      if (fs.existsSync(moduleSrc)) {
        try {
          execSync(`cp -r "${moduleSrc}" "${moduleDest}"`, {
            stdio: "inherit",
          });
          console.log(`✓ ${moduleName} copied successfully!`);
        } catch (err) {
          console.warn(`⚠️ Warning: Failed to copy ${moduleName}`);
        }
      }
    }
  } catch (error) {
    console.warn("⚠️ Warning: Failed to copy native modules:", error.message);
  }
}

console.log("✓ Post-build tasks completed successfully!");
