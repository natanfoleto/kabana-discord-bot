const Discord = require('discord.js')

module.exports = {
    name: 'sugestao',
    description: 'Envie uma sugestão para nossa equipe',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const modal = new Discord.ModalBuilder()
            .setCustomId('suggestionModal')
            .setTitle(`Enviar sugestão`)

        const suggestion = new Discord.TextInputBuilder()
            .setCustomId('sugestão')
            .setLabel('Qual sua sugestão?')
            .setStyle(Discord.TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(suggestion);

        modal.addComponents(firstActionRow)

        await interaction.showModal(modal);

    }
}
