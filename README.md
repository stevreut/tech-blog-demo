# Demonstration Technical Blog

## Description

A mostly failed attempt to implement a web-based blog for posts on
technical subjects using MVC, ORM and Handlebars.js.

(Unfortunately, as of the evening of 5 September 2023, the implementation
could only be made partially functional and insufficient time remained to
attempt a Heroku deployment.)


## Table of Contents

- [Usage](#usage)
- [License](#license)

## Installation

1. Install NodeJS if it is not already installed.
2. from the [tech-blog-demo repository of GitHub](https://github.com/stevreut/tech-blog-demo):
    - select the green "**<> Code**" button
    - select the "**Download ZIP**" button from the resulting pop-up dialog
3. Placed the resulting `tech-blog-demo-main.zip` file in the location of your choice.
4. Unpack the `tech-blog-demo-main.zip` file, which should resulting in a folder/directory with name `tech-blog-demo-main`:
    - on Mac: double-click
    - on Windows: right-click and [follow these instructions](https://support.microsoft.com/en-us/windows/zip-and-unzip-files-f6dde0a7-0fec-8294-e1d3-703ed85e7ebc)
5. Place the resulting files (except for this README.md) in a new directory.
6. Using bash, Mac terminal, or equivalent utility:
    - `cd` to the resulting `tech-blog-demo-main` directory
    - `npm install` (to install "dotenv", "express.js", "sequelize", "mysql2", and "sequelize") 
7. Initialize a new git repository in that new directory.
8. Install MySQL

(Alternative instructions involving installation on a server such as Heroku are pending
a successful completion of the implementation.)


## Usage

(Note that these instructions are for use on a *local* environment.  In addition, this implementation is, at best, only partially functional.  More detailed and accurate instructions will
follow when/if it is ever possible to satisfactorily complete this assignment.)

Once installed:
1. `cd` to the folder in which the application is installed (that which contains package.json and server.js files, among others).
2. Issue the command: `npm run start`


## License

See details re the MIT license in this repository.
