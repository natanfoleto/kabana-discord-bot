const Discord = require('discord.js')

module.exports = {
    name: 'sugestao',
    description: 'Envie uma sugestão para nossa equipe',
    type: Discord.ApplicationCommandType.ChatInput,


    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
            return interaction.reply({
                content: `**❌ | ${interaction.user}, Você precisa da permissão \`ADMNISTRATOR\` para usar este comando!**`,
                ephemeral: true,
            })


        const modal = new Discord.ModalBuilder()
            .setCustomId('modal_sugestao')
            .setTitle(`Olá usuário, Nos diga qual é a sua sugestão.`)
        const sugestao3 = new Discord.TextInputBuilder()
            .setCustomId('sugestão')
            .setLabel('Qual sua sugestão?')
            .setStyle(Discord.TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(sugestao3);
        modal.addComponents(firstActionRow)
        await interaction.showModal(modal);

    }
}
