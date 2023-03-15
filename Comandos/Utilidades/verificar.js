const Discord = require('discord.js');

module.exports = {
  name: "verificar",
  description: "Sistema de verificação",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const btn = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("verify")
          .setLabel(`Verificar`)
          .setEmoji('<:confirmar:1054522311551758376>')
          .setStyle(Discord.ButtonStyle.Success)
      )

    const embedVerify = new Discord.EmbedBuilder()
      .setTitle(`Bem-vindo`)
      .setDescription(`
          Bem-vindo ao servidor, clique no botão e verifique-se para ganhar acesso!
          
          Ao clicar aceitar você concorda com os termos e regras
          <#1071905656266817617>
        `)
      .setColor("Green")
      .setThumbnail(client.user.displayAvatarURL())

    await interaction.channel.send({ embeds: [embedVerify], components: [btn] }).then((send) => {
      client.on('interactionCreate', (interaction) => {
        if (interaction.isButton) {
          if (interaction.customId === "verify") {
            const group = "1068720047687737443"

            if (interaction.member.roles.highest.id === group) {
              const embedAlreadyExists = new Discord.EmbedBuilder()
                .setDescription(`Você já foi verificado com o cargo <@&${group}>`)
                .setColor("Red")

              interaction.reply({ embeds: [embedAlreadyExists], ephemeral: true }).then((reply) => {
                setTimeout(() => { send.delete() }, 5000)
                setTimeout(() => { reply.delete() }, 5000)
              })

              return
            }

            interaction.member.roles.add(`${group}`)

            const embedSuccess = new Discord.EmbedBuilder()
              .setDescription(`**Você foi verificado com o cargo <@&${group}>!**`)
              .setColor("Green")

            interaction.reply({ embeds: [embedSuccess], ephemeral: true })

            const embedSuccessLog = new Discord.EmbedBuilder()
              .setTitle(`Um novo usuário foi verificado\n\nEste usúario é o ${interaction.guild.memberCount}º membro a ser verificado no nosso servidor`)
              .setThumbnail(client.user.displayAvatarURL())
              .setColor('#313236')
              .addFields({
                name: '\`\`\`Usuário\`\`\`',
                value: `${interaction.user}`,
                inline: false,
              })
              .setTimestamp()

            interaction.guild.channels.cache.get('1085403253174452335').send({ embeds: [embedSuccessLog] })
          }
        }
      });
    })
  }
}