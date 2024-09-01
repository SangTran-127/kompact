import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs';
import gradient from 'gradient-string';
import path from 'path';
import { controllerMockup } from '../utils/index.js';

enum GenerateOption {
  Controller = 'c',
}
// TODO: Add controller on main.ts file

export const generateCommand = new Command('generate')
  .option('-c <name>', 'Add the controller name')
  .description('Generate a new Kompact module')
  .action(async (options) => {
    try {
      const appPath = path.join(process.cwd(), '/src/app.ts');
      const controllerPath = path.join(process.cwd(), '/src/controllers');
      if (!fs.existsSync(appPath) || !fs.existsSync(controllerPath)) {
        console.error(appPath);
        console.error(
          'Error: app.ts or controller folder not found in the current directory.'
        );
        process.exit(1);
      }
      for (const option in options) {
        if (option === GenerateOption.Controller) {
          const targetController = `${options[option]}.controller.ts`;
          const targetControllerPath = `${controllerPath}/${targetController}`;
          const targetIndexControllerPath = controllerPath + '/index.ts';
          const targetTemplate = controllerMockup(options[option], undefined);
          if (fs.existsSync(targetControllerPath)) {
            console.log(
              chalk.green(`${targetController} is already on project`)
            );
            const answer = await input({
              message: `If you want to replace/override it type ${chalk.blue(
                options[option]
              )}`,
            });
            if (answer !== options[option]) {
              console.log(chalk.red('Cancel, create controller failed'));
              process.exit(1);
            }
          }
          console.log(
            gradient.fruit(
              `Create ${targetController} successfully, happy coding 😍🥰`
            )
          );
          fs.writeFileSync(targetControllerPath, targetTemplate, 'utf-8');
          fs.writeFileSync(
            targetIndexControllerPath,
            `export * from ${options[option]}.controller}`
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
