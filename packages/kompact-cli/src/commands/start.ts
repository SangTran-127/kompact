import chalk from 'chalk';
import { spawn } from 'child_process';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

export const startCommand = new Command('start')
  .option('-w', '--watch')
  .description('Watch for file changes and restart automatically')
  .action((options) => {
    // process.cwd() will be package.json
    const appPath = path.join(process.cwd(), '/src/app.ts');
    if (!fs.existsSync(appPath)) {
      console.error(appPath);
      console.error('Error: app.ts not found in the current directory.');
      process.exit(1);
    }
    const command = options.watch ? `tsx watch ${appPath}` : `tsx ${appPath}`;
    console.log(
      chalk.green(
        `Starting the kompact project${
          options.watch ? ' in watch mode' : ''
        }...`
      )
    );
    // Use spawn to run the command
    const child = spawn(command, {
      shell: true,
      stdio: 'pipe',
    });

    // Handle stdout
    child.stdout.on('data', (data) => {
      process.stdout.write(data);
    });

    // Handle stderr
    child.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    // Handle exit
    child.on('close', (code) => {
      console.log(`Process exited with code ${code}`);
      process.exit(code || undefined);
    });

    // Handle errors
    child.on('error', (err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
  });
