const Discord = require("discord.js")
const util = require('minecraft-server-util')
module.exports = {
    name: "ip", 
    description: "Veja informaçoes do servidor.",
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async(client, interaction) => {
            const embed = new Discord.EmbedBuilder()
            .setColor("#313236")
            .setTitle(`${interaction.guild.name}`)
            .setDescription(`
            > IP de conexão: **jogar.kabana-mc.net**
            > Loja: [Clique aqui](https://kabana-mc.net/)
            > Versão: **1.8x**`)
            .setImage('attachment://banner.png')

            await interaction.deferReply();
            interaction.editReply({embeds: [embed], files: [{attachment: 'http://status.mclive.eu/jogar.kabana-mc.net/jogar.kabana-mc.net/banner.png', name: 'banner.png'}]})
        }
    }  