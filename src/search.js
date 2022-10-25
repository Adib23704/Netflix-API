import table from 'cli-table';
import prompts from 'prompts';
import { load, httpClient } from './utils.js';
import chalk from 'chalk';

export default async function search() {
    const response = await prompts([
        {
            type: 'select',
            name: 'type',
            message: 'What do you wanna search?',
            choices: [
                { title: chalk.white.bold('Movie'), value: 'movie' },
                { title: chalk.white.bold('Series'), value: 'series' }
            ],
        },
        {
            type: 'text',
            name: 'name',
            message: 'Type the name/shortname/piece of the name of the title'
        },
        {
            type: 'number',
            name: 'limit',
            message: 'How many results do you wanna fetch? (Max: 10)',
            initial: 1,
            style: 'default',
            min: 1,
            max: 10,
            validate: value => (value < 1 || value > 10) ? 'Should be between 1 to 10!' : true
        },
        {
            type: 'select',
            name: 'order',
            message: 'Order by:',
            choices: [
                { title: chalk.white('Date'), value: 'date' },
                { title: chalk.white('Rating'), value: 'rating' },
                { title: chalk.white('Title'), value: 'title' },
                { title: chalk.white('Type'), value: 'video_type' },
                { title: chalk.white('Runtime'), value: 'runtime' },
                { title: chalk.white('Year'), value: 'film_year' }
            ]
        },
        {
            type: 'select',
            name: 'orderEx',
            message: 'Order by format:',
            choices: [
                { title: chalk.white('Ascending'), value: 0 },
                { title: chalk.white('Descending'), value: 1 }
            ]
        },
    ]);
    let orderBy;
    if (response.orderEx == 1) {
        orderBy = `${response.order}_dsc`;
    }
    else {
        orderBy = response.order;
    }
    load.start('Searching...');
    const { data: data } = await httpClient.get(`/search/titles?type=${response.type}&title=${response.name}&order_by=${orderBy}&limit=${response.limit}`)
        .catch(function (error) {
            console.log(chalk.white(`Something went wrong! Contact the developer. 
            
            Code: ${chalk.red(error.status)}
            Error: ${chalk.red(error.message)}`));
        });
    var Table = new table({
        head: [
            'No.', 'Title ID',
            'Title', 'Type'
        ]
    });
    if (data.results == null) {
        load.stop();
        console.log(`${chalk.red.bold('X')} - No results found...`);
    }
    else {
        for (let index = 0; index < Object.keys(data.results).length; index++) {
            Table.push([
                chalk.blue(index + 1),
                chalk.white.bold(data.results[index].netflix_id),
                chalk.greenBright(data.results[index].title) + chalk.green.italic(' (' + data.results[index].year + ')'),
                chalk.white((data.results[index].title_type == 'series') ? ('Series') : ('Movie'))
            ]);
        }
        load.stop();
        console.log(Table.toString());
    }
}