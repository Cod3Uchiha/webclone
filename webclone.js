const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

async function downloadWebsiteSource(url) {
    try {
        const response = await axios.get(url);
        const fileName = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '') + '.html';
        fs.writeFileSync(fileName, response.data);
        console.log('Website source code downloaded successfully to', fileName);
    } catch (error) {
        console.error('Failed to download website source code:', error.message);
    }
}

// Create a readline interface to get user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user to enter the URL
rl.question('Enter the URL of the website you want to download: ', (url) => {
    downloadWebsiteSource(url);
    rl.close();
});
