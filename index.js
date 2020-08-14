#!/usr/bin/env node
const { program, option } = require('commander');
const chalk = require('chalk');
const package = require('./package');
const api = require('./api.js');

program
    .version(package.version)
    .name("git-bump")
    .usage("[options]");

program.on('--help', () => {
    console.log(
        '\nUsage: \n' +
        '  $ git-bump --patch\n' +
        '  $ git-bump --minor\n' +
        '  $ git-bump --major\n\n' +
        '  $ git-bump --patch --no-tag\n' +
        '  $ git-bump --patch --no-merge\n' +
        '  $ git-bump --patch --push'
    );
});

const OPTIONS = [
    {
        longID: 'patch',
        shortID: 'p',
        description: `Increase patch version`,
        handler: increaseVersion
    },
    {
        longID: 'minor',
        shortID: 'mr',
        description: `Increase minor version`,
        handler: increaseVersion
    },
    {
        longID: 'major',
        shortID: 'mj',
        description: `Increase major version`,
        handler: increaseVersion
    },
    {
        longID: 'no-tag',
        shortID: '',
        description: `Dont't create git tag`,
    },
    {
        longID: 'no-merge',
        shortID: '',
        description: `Dont't merge branches`,
    },
    {
        longID: 'push',
        shortID: '',
        description: `Push to the remote repository`,
    }
];

async function increaseVersion() {
    try {
        const files = await api.bump(this.longID);
        const { version } = require(files[0]);

        await api.commit(files, `release version ${version}`);

        if (program.tag) {
            await api.tag(`v${version}`);
        }

        if (program.merge) {
            await api.mergeInto('master');
        }

        if (program.push){
            await api.push('master');
        }

        console.log(chalk.green(`Version has incresed to ${version}`));
    }
    catch (err) {
        console.log(chalk.red(err));
        process.exit(-1);
    }
}

OPTIONS.forEach(option => {
    const optionFormated = getFormatedOption(option);

    if (optionFormated) {
        program.option(optionFormated, option.description);

        if (isFunction(option.handler)) {
            program.on(`option:${option.longID}`, () => {
                option.handler(option.longID)
            });
        }
    }
});

program.parse(process.argv);

function getFormatedOption({ shortID, longID }) {
    const result = [];

    if (shortID) {
        result.push(`-${shortID}`);
    }

    if (longID) {
        result.push(`--${longID}`);
    }

    return result.join(',');
}

function isFunction(verifiable) {
    return typeof verifiable === 'function';
}

if (process.argv.length < 3) {
    program.help();
}