const Discord = require("discord.js")

module.exports = {
    name: "destrancar-canal",
    description: "Destranque um canal.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply('Você não tem a permissão \`Gerenciar Canais\` para poder uttilizar este comando.')
        } else {
            let embedSuccess = new Discord.EmbedBuilder()
                .setTitle("Canal destrancado!")
                .addFields({
                    name: '🔓\nEsse canal foi destrancado! Agora todos poderão digitar novamente.',
                    value: `Destrancado por ${interaction.user}`
                })
                .setColor('#313236')

            interaction.reply({ embeds: [embedSuccess] })
                .then(() => { interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }) })
                .catch(() => { interaction.editReply('Ops, algo deu errado ao tentar destrancar este chat.') })
        }
    }
}