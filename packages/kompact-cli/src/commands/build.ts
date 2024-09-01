import { Command } from 'commander';
import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import JSON5 from 'json5';

export const buildCommand = new Command('build').action(() => {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const swcPath = path.join(process.cwd(), '.swcrc');
  if (!fs.existsSync(tsconfigPath) || !fs.existsSync(swcPath)) {
    console.error(
      'Error: .swcrc or tsconfig.json not found in the current directory.'
    );
    process.exit(1);
  }
  const tsconfig = JSON5.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
  const command = `npx swc src -d ${
    tsconfig?.compilerOptions?.outDir || 'dist'
  }`;
  console.log(chalk.green('Building the kompact project...'));

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
