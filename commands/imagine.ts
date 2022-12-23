const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const created = require('../generateImage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("imagine")
        .setDescription("imagine a picture")
        .addStringOption((option: any) =>
            option
                .setName("imagination")
                .setDescription("Your imagination in a sentence")
                .setRequired(true)
        ),

    async execute(client: any, interaction: any) {
        await interaction.deferReply();

        let prompt = interaction.options.getString('imagination');
    
        const image = await created(prompt);

        const imageEmbed = new EmbedBuilder()
        .setTitle(`${prompt}`)
        .setImage(image)
        .setColor("Blurple")

        await interaction.editReply({ embeds: [imageEmbed] });
    }
}

export {}