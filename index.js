const Discord = require('discord.js');
const client = new Discord.Client();
const Scraper = require('images-scraper');
const config = require('./config');
var cheeseImgs;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const google = new Scraper({
        puppeteer: {
            headless: true
        }
    })
    cheeseImgs = await (await google.scrape('cheese', 500)).map(image => image.url);
});

client.on('message', msg => {
    if(msg.content.toLowerCase() === '?cheese'){
        const imgUrl = cheeseImgs[Math.floor(Math.random() * cheeseImgs.length)];
        msg.channel.send(imgUrl);
    }
});
console.log(config.token);
client.login(config.token);