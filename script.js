const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Your bot's token
const TOKEN = 'MTM0OTQ1NjgyMTUzMzgwMjUyNg.G5_IIR.rclkOPZW6Q9DkL8glSjIdSm5shrh3MXxbh5aR4'; // Replace this with your actual bot token

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// When the bot receives a message
client.on('messageCreate', message => {
  if (message.content === '!ping') {
    message.channel.send('Pong!');
  }
});

// Log in to Discord with the app's token
client.login(TOKEN);
