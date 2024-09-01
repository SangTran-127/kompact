import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export function copyDirectory(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(
        chalk.green(
          `Creating ${entry.name} with size ${(
            fs.statSync(destPath).size / 1024
          ).toFixed(2)}KB`
        )
      );
    }
  }
}
