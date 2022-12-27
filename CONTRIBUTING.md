# Contributing

Welcome! Thank you for your interest.

## Installation

Make sure you have `Node` and `npm` installed.

First, let's make sure you have the entire project in your environment. Clone it:  
`git clone https://github.com/Lamarcke/Jakan.git`

And then:  
`npm install`

That's it! You are ready to go.

## Trunk
We highly recommend [installing Trunk](https://docs.trunk.io/docs/install).  
Trunk is a CLI tool and VS Code extension that setups and runs linters in your entire codebase. 

If you are using it, it will automatically run checks for ESLint, Prettier and other tools available in this repo.
It can used as a git hook, and it will then automatically format and check before `git commit` and `git push`.

### Editor support
Trunk extension is currently only available for VS Code. If you are using other editors, Trunk is available as a CLI tool to check and format your code, and it's only installed locally.

If you don't want to use Trunk, the main lint/formatters we use are ESLint and Prettier, and most editors provide support for them.

## What you need to keep in mind

Our Typescript + ESLint configs are very rigid. Please make sure to never use `any` unless necessary (like in catch blocks, and `unknow` is preferable).
It's also important to documment your new code/changes in the docstrings to make sure `TypeDoc` adds then correctly.

You can use tools like `Mintlify` for this. Just make sure the results make sense.

Don't be afraid to file a issue againsn't this repo if you are having any problems or doubts. We are happy to help.
