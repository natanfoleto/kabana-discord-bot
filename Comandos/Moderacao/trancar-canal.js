const Discord = require("discord.js")

module.exports = {
    name: "trancar-canal",
    description: "Tranque um canal",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply('Você não tem a permissão \`Genrenciar Canais\` para poder uttilizar este comando.')
        } else {
            const embedSuccess = new Discord.EmbedBuilder()
                .setTitle("Canal trancado!")
                .setColor('#313236')
                .addFields({
                    name: '🔐\nEste canal foi trancado, apenas staffs podem escrever aqui!',
                    value: `Trancado por: ${interaction.user}`
                })

            interaction.reply({ embeds: [embedSuccess] })
                .then(() => { interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }) })
                .catch(() => { interaction.editReply('Ops, algo deu errado ao tentar trancar este canal.') })
        }
    }
}