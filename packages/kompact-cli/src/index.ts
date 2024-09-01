#!/usr/bin/env node

import { Command, program } from 'commander';
// Static import for safe
import {
  buildCommand,
  createCommand,
  generateCommand,
  startCommand,
} from './commands';

const commandList: Command[] = [
  generateCommand,
  createCommand,
  buildCommand,
  startCommand,
];

commandList.forEach((command) => {
  program.addCommand(command);
});
// Execute program
program.parse(process.argv);
