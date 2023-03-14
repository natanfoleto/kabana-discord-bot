const Discord = require("discord.js")

module.exports = {
    name: "destrancar-canal", 
    description: "abra um canal.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async(client, interaction) => {
        if (!interaction.member.permissions.has("ManageChannels")) {
            interaction.reply(` Você não possui a permissão \`Gerenciar Canais\` para poder uttilizar este comando.`)
        } else {
            let destrancar = new Discord.EmbedBuilder()
            .setTitle("<:feliz:1033518052177887323> Canal destrancado !")
            .addFields({name: ` Esse canal foi destrancado, agora todos poderão digitar novamente.`, value: `<:emoji_9:1033560781314342962> Destrancado por: ${interaction.user}`})
            .setColor('#313236')
            interaction.reply({embeds: [destrancar]}).then(msg => { 
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(e => {
                    console.log(e)
                
                    msg.edit(` Ops, algo deu errado ao tentar destrancar este chat.`)
                })
            })
        }
    }        
}