import table from 'cli-table';
import { load, httpClient } from './utils.js';
import chalk from 'chalk';

export default async function list(value) {
    load.start('Loading list...');
    if (value == 0) {
        const { data: data } = await httpClient.get('/static/countries')
            .catch(function (error) {
                console.log(chalk.white(`Something went wrong! Contact the developer. 
                
                Code: ${chalk.red(error.status)}
                Error: ${chalk.red(error.message)}`));
            });
        var Table = new table({
            head: [
                'Country ID', 'Country [code]',
                'Total Vids', 'Total Movies',
                'Total Series', 'Expiring Titles'
            ]
        });

        for (let index = 0; index < Object.keys(data.results).length; index++) {
            Table.push([
                chalk.white.bold(data.results[index].id),
                chalk.greenBright(data.results[index].country) + chalk.green.italic(' [' + data.results[index].countrycode + ']'),
                chalk.white(Intl.NumberFormat('en-US').format(data.results[index].tvids)),
                chalk.white(Intl.NumberFormat('en-US').format(data.results[index].tmovs)),
                chalk.white(Intl.NumberFormat('en-US').format(data.results[index].tseries)),
                chalk.red(Intl.NumberFormat('en-US').format(data.results[index].expiring))
            ]);
        }
    }
    else if (value == 1) {
        const { data: data } = await httpClient.get('/static/genres')
            .catch(function (error) {
                console.log(chalk.white(`Something went wrong! Contact the developer. 
            
                Code: ${chalk.red(error.status)}
                Error: ${chalk.red(error.message)}`));
            });
        var Table = new table({
            head: [
                'Genre ID', 'Genre'
            ]
        });

        for (let index = 0; index < Object.keys(data.results).length; index++) {
            Table.push([
                chalk.white.bold(data.results[index].netflix_id),
                chalk.greenBright(data.results[index].genre)
            ]);
        }
    }
    else {
        console.log(`${chalk.red.bold('X')} ${chalk.white('- Something went wrong, please try again!')}`);
    }
    load.stop();
    console.log(Table.toString());
}