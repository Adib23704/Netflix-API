import chalk from 'chalk';
import prompts from 'prompts';
import list from './src/list.js'
import search from './src/search.js'
import title from './src/title.js'

async function main() {
    const answer = await askQuestion();
    if (answer == 0 || answer == 1) { list(answer); }
    else if (answer == 2) { search(); }
    else if (answer > 2 && answer < 6) { title(answer); }
    else {
        console.log(chalk.green('Have a nice dayy ~~~'));
        process.exit()
    }
}

async function askQuestion() {
    const response = await prompts({
        type: 'select',
        name: 'choice',
        message: 'What do you wanna do?',
        choices: [
            { title: 'List of available ' + chalk.red.bold('countries'), value: 0 },
            { title: 'List of available ' + chalk.red.bold('genres'), value: 1 },
            { title: 'Search for ' + chalk.green.bold('titles'), value: 2 },
            { title: 'Get a title\'s ' + chalk.yellow.bold('details'), value: 3 },
            { title: 'Get a title\'s ' + chalk.yellow.bold('episodes'), value: 4 },
            { title: 'Get a title\'s ' + chalk.yellow.bold('genres'), value: 5 },
            { title: chalk.red.bold('Quit'), value: 6 }
        ],
    });
    return response.choice;
}

main();