const Discord = require('discord.js');

module.exports = {
  name: "verificar",
  description: "Sistema de verificação",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const memberRole = "1068720047687737443"

    if (interaction.member.roles.highest.id === memberRole) {
      const embedAlreadyExists = new Discord.EmbedBuilder()
        .setDescription(`Você já foi verificado com o cargo <@&${memberRole}>`)
        .setColor("Red")

      await interaction.reply({ embeds: [embedAlreadyExists], ephemeral: true }).then((reply) => {
        setTimeout(() => { reply.delete() }, 5000)
      })

      return
    }

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
      client.on('interactionCreate', async (interaction) => {
        if (interaction.isButton) {
          if (interaction.customId === "verify") {
            await interaction.member.roles.add(`${memberRole}`).then(async () => {
              const autoRole = "1085554828278775908"

              await interaction.member.roles.remove(`${autoRole}`)
            })

            const embedSuccess = new Discord.EmbedBuilder()
              .setDescription(`**Você foi verificado com o cargo <@&${memberRole}>!**`)
              .setColor("Green")

            await interaction.reply({ embeds: [embedSuccess], ephemeral: true })

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

            await interaction.guild.channels.cache.get('1085403253174452335').send({ embeds: [embedSuccessLog] })
          }
        }
      });
    })
  }
}