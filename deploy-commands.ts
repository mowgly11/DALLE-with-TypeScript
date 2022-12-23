const { REST, Routes } = require('discord.js');
const configFile = require('./secret.json');
const fs = require('node:fs');

const commands = [];

const commandsFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'));

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(configFile.token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationCommands(configFile.clientId),
            { body: commands },
        );
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

export {}