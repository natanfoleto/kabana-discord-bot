const Discord = require("discord.js");

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: "anuncio",
    description: "Anúncios do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    ownerOnly: true,

    run: async (client, interaction) => {
        const modals = new ModalBuilder()
            .setCustomId('title')
            .setTitle('Enviar anúncio')

        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Título do anúncio')
            .setStyle(TextInputStyle.Short)
            .setMaxLength(30)
            .setMinLength(3)
            .setPlaceholder('Digite o titulo do anúncio')
            .setRequired(true)


        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Descrição do anúncio')
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(1000)
            .setMinLength(10)
            .setPlaceholder('Descreva a descrição do anúncio...')
            .setRequired(true)

        const inputTitle = new ActionRowBuilder().addComponents(title)
        const inputDescription = new ActionRowBuilder().addComponents(description)

        modals.addComponents(inputTitle, inputDescription)

        await interaction.showModal(modals)
    }
}
