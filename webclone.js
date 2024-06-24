const axios = require('axios');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');

// Stylish banner
console.log(chalk.bold.yellow('*****************************'));
console.log(chalk.bold.yellow('*               Welcome to TKM WebClone               *'));
console.log(chalk.bold.yellow('*     © Takudzwa Mlambo AKA Cod3Uchiha - All rights reserved   *'));
console.log(chalk.bold.yellow('*****************************'));

// Prompt for the website URL
const websitePrompt = {
    type: 'input',
    name: 'url',
    message: 'Enter the URL of the website you want to download:',
    validate: function (value) {
        if (value.trim() !== '') {
            return true;
        }
        return 'Please enter a valid URL.';
    }
};

// Function to download website source
async function downloadWebsiteSource(url) {
    try {
        const response = await axios.get(url);
        const fileName = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '') + '.html';
        const filePath = path.join('/storage/emulated/0/Download', fileName); // Save in the device's Downloads folder
        fs.writeFileSync(filePath, response.data);
        console.log(chalk.green('✔ Website source code downloaded successfully to', filePath));
    } catch (error) {
        console.error(chalk.red('✘ Failed to download website source code:', error.message));
    }
}

// Initiate the prompt
inquirer.prompt(websitePrompt).then(answers => {
    const url = answers.url.trim();
    console.log(chalk.yellow('Downloading the website source code...'));
    downloadWebsiteSource(url);
}).catch(error => {
    console.error(chalk.red('✘ An error occurred:', error));
});
