import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceBuild = join(__dirname, '../client/build');
const destBuild = join(__dirname, './client/build');

try {
  // Remove existing build if it exists
  if (await fs.pathExists(destBuild)) {
    await fs.remove(destBuild);
    console.log('Removed existing build directory');
  }

  // Copy build from client to server/client
  if (await fs.pathExists(sourceBuild)) {
    await fs.copy(sourceBuild, destBuild);
    console.log('Build copied successfully from ../client/build to ./client/build');
  } else {
    console.error('Source build directory not found at:', sourceBuild);
    process.exit(1);
  }
} catch (error) {
  console.error('Error copying build:', error);
  process.exit(1);
}

