const semver = require('semver');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { exec } = require('child-process-promise');

exports.bump = async function (type) {
    const types = ['patch', 'minor', 'major'];
    const typeIndex = types.indexOf(type);
    const currentDirname = process.cwd();;

    if (typeIndex != -1) {
        const files = ['package.json', 'bower.json'].map(file => path.join(currentDirname, file));
        const filteredFiles = files.filter(file => fs.existsSync(file));

        if (filteredFiles.length) {
            filteredFiles.forEach(async file => {
                try {
                    await increseVersion(file, type);
                }
                catch (err) {
                    console.log(chalk.red(err));
                    process.exit(-1);
                }
            });

            return filteredFiles;
        }
    }
}

function increseVersion(filePath, type) {
    const file = require(filePath);
    file.version = semver.inc(file.version, type);

    return new Promise((resolve, reject) => {
        fs.writeFile(
            filePath,
            JSON.stringify(file, null, 2),
            err => {
                if (err) {
                    reject(`Can not write down to file: ${filePath}`);
                }
                else {
                    resolve();
                }
            });
    });
}

exports.commit = function (files, message) {
    return new Promise(async (resolve, reject) => {
        try {
            await exec(`git commit ${files.join(' ')} -m "${message}"`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

exports.tag = function (name) {
    return new Promise(async (resolve, reject) => {
        try {
            await exec(`git tag ${name}`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

exports.mergeInto = function (name) {
    return new Promise(async (resolve, reject) => {
        try {
            const { stdout } = await exec('git branch --show-current');
            await exec(`git checkout ${name} && git merge ${stdout} --no-ff`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

exports.pull = function (name) {
    return new Promise(async (resolve, reject) => {
        try {
            await exec(`git pull origin ${name}`);
            resolve();
        }
        catch (err){
            reject(err);
        }
    })
}

exports.push = function (name) {
    return new Promise(async (resolve, reject) => {
        try {
            await exec(`git push origin ${name}`);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}

