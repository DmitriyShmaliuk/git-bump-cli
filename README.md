# git-bump-cli

This package is tools for increase projects version.

## Installing

Just write down these commands in your (terminal/console):

Clone project:

`npm i @d.shmaliuk/git-bump-cli -g`

or use next command:

`git clone git+https://github.com/DmitriyShmaliuk/git-bump-cli.git#VERSION`

Install dependencies:
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

## Features:

+  You have to commit all files before start to use some commands from this package. Otherwise a command will fail.

## Usage:

$ git-bump --patch

$ git-bump --minor

$ git-bump --major

$ git-bump --patch --no-tag

$ git-bump --patch --no-merge

$ git-bump --patch --push

## Last version:

V0.0.14 - 21.08.2020
