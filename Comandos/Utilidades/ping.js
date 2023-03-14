const Discord = require(`discord.js`)

module.exports = {
    name: "ping",
    description: "Veja o ping do bot !",
    type: Discord.ApplicationCommandType.ChatInput,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Message} interaction
     */

    run: async(client, interaction, args) => {
        
      const ping = Math.round(client.ws.ping)
      const gateway = Date.now() - interaction.createdTimestamp
        const msg = await interaction.reply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("#313236")
            .setDescription(`**Estou calculando o ping, aguarde**`)
        ]})
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`**Estou calculando o ping, aguarde.**`)
            ]})
        }, 1000)
    
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`**Estou calculando o ping, aguarde..**`)
            ]})
        }, 2000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`**Estou calculando o ping, aguarde...**`)
            ]})
        }, 3000)
        setTimeout(() => {
          interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
              .setColor("#313236")
              .setDescription(`**Estou calculando o ping, aguarde.**`)
          ]})
      }, 4000)
      setTimeout(() => {
        interaction.editReply({embeds: [
            new Discord.EmbedBuilder()
            .setColor("#313236")
            .setDescription(`**Estou calculando o ping, aguarde..**`)
        ]})
    }, 5000)
    setTimeout(() => {
      interaction.editReply({embeds: [
        new Discord.EmbedBuilder()
          .setColor("#313236")
          .setDescription(`**Estou calculando o ping, aguarde...**`)
      ]})
  }, 6000)
        setTimeout(() => {
            interaction.editReply({embeds: [
                new Discord.EmbedBuilder()
                .setColor("#313236")
                .setDescription(`<:ping:1054536447023124540> | Ping (latência): \`${ping}\` ms\n\n☁️ | Gateway Ping: \`${gateway}\` ms`)
            ]})
        }, 8000)
    }
}
