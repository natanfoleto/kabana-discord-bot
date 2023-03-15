const Discord = require("discord.js");
const { ButtonStyle } = require('discord.js');
const config = require("./config.json");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

//! STATUS !//

let status = [
  `🔥 Meus comandos são em slash {/}`,
  `🔥 Sou o bot oficial deste servidor!`,
  `🔥 IP - jogar.kabana-mc.net`,
  `🔥 Loja - kabana-mc.net`,
  `🔥 Olá seja bem vindo a KabanaMC!`,
]

i = 0

setInterval(() => {
  client.user.setActivity(`${status[i++ % status.length]}`, {
  })
}, 1000 * 10);

//! AUTO ROLE !//

client.on('guildMemberAdd', async member => {
  const group = member.guild.roles.cache.get("1085554828278775908")

  if (!group) return console.log("O cargo de auto-role, não está configurado.")

  member.roles.add(group)
    .catch(err => console.log(err));
})

//! SUGESTÕES !//

client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'suggestionModal') {
    const moment = require("moment")
    const channel = client.channels.cache.get('1078316873256538112')
    const suggestion = interaction.fields.getTextInputValue('sugestão');

    interaction.reply({
      content: `${interaction.user}, sua sugestão foi enviada com sucesso!`, ephemeral: true
    })

    channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor("#313236")
          .setAuthor({
            name: `👤 - ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dinamyc: true })
          })
          .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dinamyc: true })
          })
          .setThumbnail(interaction.user.displayAvatarURL({
            format: "png",
            dinamyc: true,
            size: 4096
          }))
          .setDescription(`**Horário da sugestão:**
            <t:${moment(interaction.createdTimestamp).unix()}>(<t:${parseInt(interaction.createdTimestamp / 1000)}:R>)

            **Sobre o usuário:**

            **ID:** (\`${interaction.user.id}\`)
            **Usuario que fez a sugestão:** ${interaction.user}
            **Nome no discord:** \`${interaction.user.tag}\`

            **Sugestão:**
            \`\`\`${suggestion}\`\`\`
          `)
      ]
    })
  }
})


//! TICKETS !//

client.on("interactionCreate", async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "tickets") {
      const ticket = interaction.values[0]

      if (ticket === "support") {
        if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
          interaction.reply({ content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
        } else {
          const staffRole = '1077663995705700382' // * ID DA DO CARGO STAFF

          interaction.guild.channels.create({
            name: `Suporte-${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            topic: `${interaction.user.id}`,
            parent: '1077728286534279198', // * ID DA CATEGORIA QUE O TICKET SERÁ CRIADO
            permissionOverwrites: [
              {
                id: '1068720047868092567', // * ID DO CARGO STAFF+
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: '1077663995705700382', // * ID DO CARGO STAFF-
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: interaction.guild.id,
                deny: [Discord.PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              }
            ]
          }).then((channel) => {
            interaction.reply({ content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`, ephemeral: true })

            const embed = new Discord.EmbedBuilder()
              .setColor("#313236")
              .setThumbnail(interaction.guild.iconURL())
              .setAuthor({
                name: 'Sistema de atendimento - KabanaMC',
                iconURL: 'https://i.imgur.com/Cl6NXLV.png'
              })
              .setDescription(`
              Opa ${interaction.user}, você abriu o ticket com sucesso, muito em breve algum membro da <@&${staffRole}> responderá você!
              
              > Se você abriu o ticket acidentalmente ou caso queira fecha-lo, basta clicar no botão abaixo!
              
              `)
              .setTimestamp()
              .setFooter({
                text: ("© Todos os diretos reservados")
              });

            let buttons = new Discord.ActionRowBuilder().addComponents([
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Danger)
                .setLabel('Fechar')
                .setCustomId('close'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel('Assumir')
                .setCustomId('assume'),
              new Discord.ButtonBuilder()
                .setEmoji('<:estrela:1054534268388384778>')
                .setLabel('Site')
                .setURL(`https://kabana-mc.net`)
                .setStyle(ButtonStyle.Link)
            ])

            channel.send({ content: `**🔔<@&${staffRole}> - Suporte**`, embeds: [embed], components: [buttons] }).then(m => { m.pin() })
            channel.send(`${interaction.user}`).then(msg => setTimeout(msg.delete.bind(msg), 7000))
          })
        }
      }

      if (ticket === "complaint") {
        if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
          interaction.reply({ content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
        } else {
          const staffRole = '1077663995705700382'// * ID DO CARGO STAFF

          interaction.guild.channels.create({
            name: `🔖Denúncias-${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            topic: `${interaction.user.id}`,
            parent: '1077728270386221146', // * ID DA CATEGORIA QUE O TICKET SERA CRIADO.
            permissionOverwrites: [
              {
                id: '1077663995705700382', // * ID DO CARGO STAFF
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: '1077663995705700382', // * ID DO CARGO STAFF
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: interaction.guild.id,
                deny: [Discord.PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              }
            ]
          }).then((channel) => {

            interaction.reply({ content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`, ephemeral: true })

            const embed = new Discord.EmbedBuilder()
              .setColor("#313236")
              .setThumbnail(interaction.guild.iconURL())
              .setAuthor({
                name: 'Sistema de atendimento - KabanaMC',
                iconURL: 'https://i.imgur.com/Cl6NXLV.png'
              })
              .setDescription(`
              Opa ${interaction.user}, você abriu o ticket com sucesso, muito em breve algum membro da <@&${staffRole}> responderá você!
              
              > Se você abriu o ticket acidentalmente ou caso queira fecha-lo, basta clicar no botão abaixo!
              
              `)
              .setTimestamp()
              .setFooter({
                text: ("© Todos os diretos reservados")
              });

            let buttons = new Discord.ActionRowBuilder().addComponents([
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Danger)
                .setLabel('Fechar')
                .setCustomId('close'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel('Assumir')
                .setCustomId('assume'),
              new Discord.ButtonBuilder()
                .setEmoji('<:estrela:1054534268388384778>')
                .setLabel('Site')
                .setURL(`https://kabana-mc.net`)
                .setStyle(ButtonStyle.Link)
            ])

            channel.send({ content: `**🔔<@&${staffRole}> - Denúncia**`, embeds: [embed], components: [buttons] }).then(m => { m.pin() })
            channel.send(`${interaction.user}`).then(msg => setTimeout(msg.delete.bind(msg), 7000))
          })
        }
      }

      if (ticket === "financial") {
        if (interaction.guild.channels.cache.find((c) => c.topic === interaction.user.id)) {
          interaction.reply({ content: `**Calma! Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)}.**`, ephemeral: true })
        } else {
          const staffRole = '1077663995705700382'// * ID DO CARGO STAFF

          interaction.guild.channels.create({
            name: `🔖Financeiro-${interaction.user.username}`,
            type: Discord.ChannelType.GuildText,
            topic: `${interaction.user.id}`,
            parent: '1077728301851881543', // * ID DA CATEGORIA QUE O TICKET SERA CRIADO.
            permissionOverwrites: [
              {
                id: '1077663995705700382', // * ID DO CARGO STAFF
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: '1077663995705700382', // * ID DO CARGO STAFF
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              },
              {
                id: interaction.guild.id,
                deny: [Discord.PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
              }
            ]
          }).then((channel) => {
            interaction.reply({
              content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`,
              ephemeral: true
            })

            let embed = new Discord.EmbedBuilder()
              .setColor("#313236")
              .setThumbnail(interaction.guild.iconURL())
              .setAuthor({
                name: 'Sistema de atendimento - KabanaMC',
                iconURL: 'https://i.imgur.com/Cl6NXLV.png'
              })
              .setDescription(`
              Opa ${interaction.user}, você abriu o ticket com sucesso, muito em breve algum membro da <@&${staffRole}> responderá você!
              
              > Se você abriu o ticket acidentalmente ou caso queira fecha-lo, basta clicar no botão abaixo!
              
              `)
              .setTimestamp()
              .setFooter({
                text: ("© Todos os diretos reservados")
              });

            let buttons = new Discord.ActionRowBuilder().addComponents([
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Danger)
                .setLabel('Fechar')
                .setCustomId('close'),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel('Assumir')
                .setCustomId('assume'),
              new Discord.ButtonBuilder()
                .setEmoji('<:estrela:1054534268388384778>')
                .setLabel('Site')
                .setURL(`https://kabana-mc.net`)
                .setStyle(ButtonStyle.Link)
            ])

            channel.send({ content: `**🔔<@&${staffRole}> - Financeiro**`, embeds: [embed], components: [buttons] }).then(m => { m.pin() })
            channel.send(`${interaction.user}`).then(msg => setTimeout(msg.delete.bind(msg), 7000))
          })
        }
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "close") {
      const ticket = interaction.channel.topic

      interaction.channel.edit({
        permissionOverwrites: [
          {
            id: '1077663995705700382', // * ID DO CARGO STAFF
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
            deny: [Discord.PermissionFlagsBits.SendMessages]
          },
          {
            id: '1077663995705700382',// * ID DO CARGO STAFF
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
            deny: [Discord.PermissionFlagsBits.SendMessages]
          },
          {
            deny: [Discord.PermissionFlagsBits.ViewChannel],
            id: ticket,
          },
          {
            deny: [Discord.PermissionFlagsBits.ViewChannel],
            id: interaction.guild.id,
          }
        ],
      })

      const embed = new Discord.EmbedBuilder()
        .setDescription(`**❱ O ${interaction.user} fechou o ticket!**\n\n**❱ Escolha uma opção abaixo:**\n↳ Deletar ticket.\n↳ Reabrir ticket.`)
        .setColor("#313236")
        .setTimestamp()
        .setFooter({ text: ("© Todos os diretos reservados") });

      let buttons = new Discord.ActionRowBuilder().addComponents([
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Success)
          .setLabel('Reabrir')
          .setCustomId('reabrir'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Danger)
          .setLabel('Deletar')
          .setCustomId('deletar'),
      ])

      interaction.reply({ embeds: [embed], components: [buttons] })
    }

    if (interaction.customId === "reabrir") {
      interaction.message.delete()

      const ticket = interaction.channel.topic

      interaction.channel.edit({
        permissionOverwrites: [
          {
            id: '1077663995705700382', // * ID DO CARGO STAFF
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
          },
          {
            id: '1077663995705700382', // * ID DO CARGO STAFF
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions]
          },
          {
            allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions],
            id: ticket,
          },
          {
            deny: [Discord.PermissionFlagsBits.ViewChannel],
            id: interaction.guild.id,
          }
        ],
      })

      interaction.channel.send({ content: `Opa <@${ticket}>, seu ticket foi reaberto por ${interaction.user}!` })
    }

    if (interaction.customId === "deletar") {
      const topic = interaction.channel.topic
      const channel = interaction.channel
      const discordTranscripts = require("discord-html-transcripts")
      const attachment = await discordTranscripts.createTranscript(channel);

      interaction.channel.delete()

      const embed = new Discord.EmbedBuilder()
        .setDescription(`**❱ Ticket de:**\n↳ <@${topic}>\`(${topic})\`\n\n**❱ Deletado pelo staff:**\n↳ ${interaction.user}\`(${interaction.user.id})\``)
        .setColor("#313236")
        .setTimestamp()
        .setFooter({
          iconURL: interaction.guild.iconURL({ dynamic: true }),
          text: ("© Todos os diretos reservados")
        });

      interaction.guild.channels.cache.get('1077664783458902106') // * ID DO CANAL PARA ENVIAR AS LOGS
        .send({
          embeds: [embed],
          files: [attachment],
        })
    }
  }
})

client.on("interactionCreate", async (int) => {
  if (!int.isButton()) return;

  if (int.customId === "assume") {
    // * AQUI EM BAIXO, COLOCAR O ID DO CARGO STAFF 

    if (!int.member.roles.cache.has('1077663995705700382')) 
      return int.reply({ 
        content: `Opa ${int.user}, você não possui permissão para assumir este ticket!`, 
        ephemeral: true 
      })

    int.reply({ content: `O Membro da equipe: ${int.user} acabou de assumir o seu ticket.` })
  }
})

//! CONFIRMAR CLANS !//

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    if (interaction.customId.startsWith("clanModal")) {
      const modal = new Discord.ModalBuilder()
        .setCustomId('modal_cl')
        .setTitle(`Confirme seu clan!`)

      const name = new Discord.TextInputBuilder()
        .setCustomId('name')
        .setLabel('QUAL O NOME DO SEU CLAN?')
        .setStyle(Discord.TextInputStyle.Paragraph)
        .setRequired(true)

      const tag = new Discord.TextInputBuilder()
        .setCustomId('tag')
        .setLabel('QUAL A TAG DO SEU CLAN?')
        .setMinLength(3)
        .setMaxLength(5)
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true)

      const members = new Discord.TextInputBuilder()
        .setCustomId('members')
        .setLabel('QUANTOS MEMBROS TEM O SEU CLAN?')
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(true)

      const discord = new Discord.TextInputBuilder()
        .setCustomId('discord')
        .setLabel('QUAL É O SERVIDOR DO DISCORD DO SEU CLAN?')
        .setStyle(Discord.TextInputStyle.Short)
        .setRequired(false)

      const inputName = new Discord.ActionRowBuilder().addComponents(name)
      const inputTag = new Discord.ActionRowBuilder().addComponents(tag)
      const inputMembers = new Discord.ActionRowBuilder().addComponents(members)
      const inputDiscord = new Discord.ActionRowBuilder().addComponents(discord)

      modal.addComponents(inputName, inputTag, inputMembers, inputDiscord)

      await interaction.showModal(modal);
    }
  }

  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'modal_cl') {
    let privateChannel = client.channels.cache.get('1077666904438755408') // * Canal para o envio das logs privadas
    let publicChannel = client.channels.cache.get('1077666824918937643') // * Canal para o envio das logs da confirmação pública

    const name = interaction.fields.getTextInputValue('name');
    const tag = interaction.fields.getTextInputValue('tag');
    const members = interaction.fields.getTextInputValue('members');
    const discord = interaction.fields.getTextInputValue('discord');

    interaction.reply({
      content: `Sua Confirmação foi enviado!`,
      ephemeral: true
    })

    let privateEmbed = new Discord.EmbedBuilder()
      .setColor('#313236')
      .setDescription(`
            O clan **[${name}] - ${tag}** acaba de confirmar presença
            
            Com um total de ${members} membros
            
            Discord do clan
            ${discord || "Nenhum servidor mencionado"}
          `)

    let publicEmbed = new Discord.EmbedBuilder()
      .setColor('#313236')
      .setDescription(`O clan **[${tag}] - ${name}** acaba de confirmar presença em nosso **Rankup Empire!**`)
      .setAuthor({ name: 'Um novo clan foi confirmado!' })
      .setImage("https://i.imgur.com/Pjh5c6x.png")

    privateChannel.send({ embeds: [privateEmbed] })
    publicChannel.send({ embeds: [publicEmbed] })
  }
}
)

//! MANUTENÇÃO !//

client.on('interactionCreate', interaction => {
  if (!interaction.isModalSubmit()) return;

  const title = interaction.fields.getTextInputValue('title')
  const description = interaction.fields.getTextInputValue('description')

  const embed = new Discord.EmbedBuilder()
    .setAuthor({ name: 'Anúncios - KabanaMC', iconURL: 'https://i.imgur.com/Cl6NXLV.png' })
    .setColor("#313236")
    .setDescription(`**${title} \n\n${description}**`)
    .setFooter({ iconURL: interaction.guild.iconURL({ dynamic: true }), text: ("© Alguns direitos reservados.") })

  interaction.reply({ embeds: [embed] })
})

//! ANTICRASH !//

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Erro possivelmente não tratado em: Promise ", promise, "Motivo: ", reason.message);
});
