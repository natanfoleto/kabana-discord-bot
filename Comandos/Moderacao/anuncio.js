const Discord = require("discord.js");
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: "anuncio",
    description: "avisos em modal", 
    type: Discord.ApplicationCommandType.ChatInput,
    ownerOnly: true,
  
    run: async (client, interaction) => {

        let canal = interaction.options.getChannel('canal')

        const modals = new ModalBuilder()
        .setCustomId('t1')
        .setTitle('Anuncio') 

        const avisose = new TextInputBuilder()
        .setCustomId('t1') 
        .setLabel('Digite o nome do aviso!')
        .setStyle(TextInputStyle.Short) 
        .setMaxLength(30)
        .setMinLength(3)
        .setPlaceholder('Digite o titulo do aviso!')
        .setRequired(true) 


        const descricaose = new TextInputBuilder()
        .setCustomId('t2')
        .setLabel('Digite a descrição do aviso!')
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(1000)
        .setMinLength(10)
        .setPlaceholder('Fale a descrição do aviso...')
        .setRequired(true)
    
        const primeira = new ActionRowBuilder().addComponents(avisose)
        const segunda = new ActionRowBuilder().addComponents(descricaose)

        modals.addComponents(primeira, segunda)

        await interaction.showModal(modals)
    }
}
