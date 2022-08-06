#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {defaultCommand} from '../lib/commands/defaultCommand.js';
import {listCommand} from '../lib/commands/listCommand.js';
import {getPkg} from '../lib/getPkg.js';

const pkg = getPkg();

const argv = yargs(hideBin(process.argv))
  .usage(chalk.magenta('\n' + pkg.description))
  .option('config', {
    alias: 'c',
    desc: 'Specified config filepath',
    type: 'string'
  })
  .example('npx $0')
  .help('help')
  .alias('help', 'h')
  .alias('version', 'v')
  .command('$0', 'Run your script', {}, defaultCommand)
  .command('list', 'Show all scripts', {}, listCommand)
  .fail((msg, err, yargs) => {
    if (err) {
      console.error(chalk.bgRed.bold(err.name));
      console.error(chalk.red(err.message));
      // console.error(chalk.red(err.stack));
      process.exit(1);
    }
  }).argv;