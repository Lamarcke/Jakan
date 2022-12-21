# Contributing

Welcome! Thank you for your interest.

## Installation

Make sure you have `Node` and `npm` installed.

First, let's make sure you have the entire project in your environment. Clone it:  
`git clone https://github.com/Lamarcke/Jakan.git`

And then:  
`npm install`

That's it! You are almost ready.

## Trunk

To ensure consistency across the codebase for multiple contributors, it's highly recommended to have [Trunk](https://docs.trunk.io/docs/install) installed.

Trunk is a tool that sets up linters, formatters and git hooks in your repository, while making sure they work with each other.

Our project already has a Trunk config in the repository, so you only need to enable it (either for CLI or as a VS Code Extension) and start coding. We highly recommend using the VS Code extension.

Before commiting or pushing, Trunk CLI will make sure your code passes it's checks, ensuring we have consistent code across the codebase.

We also plan to integrate it as a CI/CD tool in the future. So while using Trunk is not completely mandatory now, it will be soon.

## What you need to keep in mind

Our Typescript + ESLint configs are very rigid. Please make sure to never use `any` unless necessary (like in catch blocks).
It's also important to documment your new code/changes in the docstrings to make sure `TypeDoc` adds then correctly.

You can use tools like `Mintlify` for this. Just make sure the results make sense.

Don't be afraid to file a issue againsn't this repo if you are having any problems or doubts. We are happy to help.
