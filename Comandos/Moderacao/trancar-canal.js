const Discord = require("discord.js")

module.exports = {
    name: "trancar-canal",
    description: "[Moderação] tranque um canal",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply(`Tu não tens a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`)
        } else {
            let embed = new Discord.EmbedBuilder()
                .setTitle("Canal trancado !")
                .setColor('#313236')
                .addFields({name: `📌 Este canal foi trancado, apenas staffs podem escrever aqui!`, value: `Trancado por: ${interaction.user}`})
                interaction.reply({ embeds: [embed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.editReply(` Ops, algo deu errado ao tentar trancar este canal.`)
                })
            })
        }
    }    
}