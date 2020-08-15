# git-version-bum

This package is tools for increase project version.

## Installing

Just write down this command in your (terminal/console):

`git clone git+https://github.com/DmitriyShmaliuk/git-bump-cli.git#VERSION`

Install dependencies, use command:
`npm i`

Linking the package:
`npm link`

## Options:

| Short form | Long form  | Descriptions                  |
| ---------- | ---------- | ----------------------------- |
| -V         | --version  | Output the version number     |
| -h         | --help     | Display help for command      |
| -p         | --patch    | Increase patch version        |
| -mr        | --minor    | Increase minor version        |
| -mj        | --major    | Increase major version        |
|            | --no-tag   | Dont't create git tag         |
|            | --no-merge | Dont't merge branches         |
|            | --push     | Push to the remote repository |

## Usage:

$ git-bump --patch

$ git-bump --minor

$ git-bump --major

$ git-bump --patch --no-tag

$ git-bump --patch --no-merge

$ git-bump --patch --push

## Versions:

v0.0.1 - 14.08.2020

V0.0.2 - 15.08.2020 (last)
