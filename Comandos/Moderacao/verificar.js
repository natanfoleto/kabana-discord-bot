const Discord = require('discord.js');

module.exports = {
  name: "verificação",
  description: "Sistema de Verificação",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
      interaction.reply(`Você não possui poermissão para utilizar este comando.`);
    } else {
      let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("Ver")
          .setLabel(`・Verificar`)
          .setEmoji('<:confirmar:1054522311551758376>')
          .setStyle(Discord.ButtonStyle.Success),
        new Discord.ButtonBuilder()
          .setCustomId("Duvida")
          .setLabel(`・Dúvida`)
          .setEmoji('🧠')
          .setStyle(Discord.ButtonStyle.Danger)
      )

      let embed = new Discord.EmbedBuilder()
        .setTitle(`Bem-Vindo`)
        .setDescription(`Bem-vindo ao servidor, clique no botão e verifique-se para ganhar acesso!\n \n Ao clicar no botão vc concorda com os termos: \n <#1071905656266817617>`)
        .setColor("#313236")
        .setThumbnail(client.user.displayAvatarURL())

      interaction.reply({ content: `<:confirmar:1054522311551758376> Mensagem enviada!`, ephemeral: true })
      interaction.channel.send({ embeds: [embed], components: [botao] }).then(() => {
        client.on('interactionCreate', (interaction) => {
          if (interaction.isButton) {
            if (interaction.customId === "Ver") {
              let cargoV = "1068720047687737443"
              let embedVerificado = new Discord.EmbedBuilder()
                .setDescription(`**Você foi verificado com o cargo <@&${cargoV}>!**`)
                .setColor("Green") 

              interaction.reply({ embeds: [embedVerificado], ephemeral: true})
              interaction.member.roles.add(`${cargoV}`)

              let EmbedLogV = new Discord.EmbedBuilder()
                .setTitle(`・Um usuário se verificou\n \n Este usúario é o ${interaction.guild.memberCount}º membro a ser verificado pelo nosso BOT.`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor('0x36393f')
                .addFields(
                  {
                    name:'\`\`\`Usuário\`\`\`',
                    value:`${interaction.user}`,
                    inline: false,
                  },
                ).setTimestamp()

            interaction.guild.channels.cache.get('1077724050362740756').send({ embeds: [EmbedLogV] })  
            } else if (interaction.customId === "Duvida") {
              let embedDuvida1 = new Discord.EmbedBuilder()
                .setDescription(`**Irmão só clicar no botão <:confirmar:1054522311551758376>**`)
                .setColor("0x36393f") 
                .setTimestamp()

              interaction.reply({ content: `<:confirmar:1054522311551758376> Mensagem enviada!`, ephemeral: true })

              interaction.channel.send({ embeds: [embedDuvida1], ephemeral: true}).then((msg) => {
                setTimeout(() => { msg.delete() }, 5000)
              })
            }
          }   
        });
      })
    }
  }        
}