const Discord = require(`discord.js`)

module.exports = {
    name: "ping",
    description: "Veja o ping do bot !",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const ping = Math.round(client.ws.ping)
        const gateway = Date.now() - interaction.createdTimestamp

        await interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setColor("#313236")
                    .setDescription(`**Estou calculando o ping, aguarde**`)
            ]
        })

        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde.**`)
                ]
            })
        }, 500)

        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde..**`)
                ]
            })
        }, 1000)
        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde...**`)
                ]
            })
        }, 1500)
        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde.**`)
                ]
            })
        }, 2000)
        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde..**`)
                ]
            })
        }, 2500)
        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`**Estou calculando o ping, aguarde...**`)
                ]
            })
        }, 3000)
        setTimeout(() => {
            interaction.editReply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#313236")
                        .setDescription(`🌐 | Ping (latência): \`${ping}\` ms\n\n☁️ | Gateway Ping: \`${gateway}\` ms`)
                ]
            })
        }, 5000)
    }
}
