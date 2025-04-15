const axios = require('axios');

// Function to check if the Discord bot is online
async function isDiscordBotOnline(botToken) {
    try {
        const response = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                Authorization: `Bot ${botToken}`
            }
        });
        return response.status === 200;
    } catch (error) {
        console.error('Error checking Discord bot status:', error.message);
        return false;
    }
}

// Function to check if the website is online
async function isWebsiteOnline(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        console.error('Error checking website status:', error.message);
        return false;
    }
}

// Example usage of the functions and writing the results to an object
async function getStatus(botToken, websiteUrl) {
    const status = {
        discordBotOnline: await isDiscordBotOnline(botToken),
        websiteOnline: await isWebsiteOnline(websiteUrl)
    };
    // Write the status to separate HTML elements
    if (typeof document !== 'undefined') {
        const discordStatusElement = document.getElementById('botStatus');
        const websiteStatusElement = document.getElementById('websiteStatus');

        if (discordStatusElement) {
            discordStatusElement.textContent = `Bot Online`;
        }

        if (websiteStatusElement) {
            websiteStatusElement.textContent = `Website Online`;
        }
    }

    return status;
}

// Export the functions for use in other modules
module.exports = { getStatus };

// Example: Call the function and write the status to elements
