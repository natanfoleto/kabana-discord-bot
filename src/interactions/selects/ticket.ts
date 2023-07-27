import {
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
  StringSelectMenuInteraction,
  TextChannel,
} from "discord.js";

export async function ticket(
  interaction: StringSelectMenuInteraction<CacheType>
) {
  const ticket = interaction.values[0];

  if (
    interaction.guild?.channels.cache.find((c) => {
      const channel = c as TextChannel;

      return channel.topic === interaction.user.id;
    })
  ) {
    await interaction.reply({
      content: `Você já tem um ticket aberto em ${interaction.guild.channels.cache.find(
        (c) => {
          const channel = c as TextChannel;

          return channel.topic === interaction.user.id;
        }
      )}.`,
      ephemeral: true,
    });

    return;
  }

  await interaction.guild?.channels
    .create({
      name: `${ticket}-${interaction.user.username}`,
      type: ChannelType.GuildText,
      topic: `${interaction.user.id}`,
      parent: process.env.TICKET_CATEGORY,
      permissionOverwrites: [
        {
          id: process.env.STAFF_ROLE,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.AddReactions,
          ],
        },
        {
          id: process.env.SUPPORT_ROLE,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.AddReactions,
          ],
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.AddReactions,
          ],
        },
        {
          id: interaction.guild.id,
          deny: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        },
      ],
    })
    .then(async (channel) => {
      await interaction
        .reply({
          content: `Olá ${interaction.user}, seu ticket foi aberto em ${channel}`,
          ephemeral: true,
        })
        .then((message) => setTimeout(message.delete.bind(message), 30000));

      const embed = new EmbedBuilder()
        .setColor("#313236")
        .setThumbnail(interaction.guild?.iconURL() || null)
        .setAuthor({
          name: "Sistema de atendimento - KabanaMC",
          iconURL: "https://i.imgur.com/Cl6NXLV.png",
        })
        .setDescription(
          `
              Olá ${interaction.user}, seja bem-vindo(a) a central de atendimento. Em breve uma pessoa da equipe irá solucionar seu problema.
              
              > Se você abriu o ticket acidentalmente ou caso queira fecha-lo, basta clicar no botão fechar abaixo!

              Agilize seu atendimento, descreva seu problema ou dúvida que um membro da equipe responderá você.
            `
        )
        .setTimestamp()
        .setFooter({
          text: "© Todos os diretos reservados",
        });

      const buttonClose = new ButtonBuilder()
        .setCustomId("ticket-close")
        .setLabel("Fechar Ticket")
        .setStyle(ButtonStyle.Secondary);

      const ticketWithCapitalLetter =
        ticket.charAt(0).toUpperCase() + ticket.substring(1);

      await channel
        .send({
          content: `**<@&${process.env.STAFF_ROLE}> ・ ${ticketWithCapitalLetter}**`,
          embeds: [embed],
          components: [
            {
              type: 1,
              components: [buttonClose],
            },
          ],
        })
        .then((message) => message.pin());

      await channel
        .send(`${interaction.user}`)
        .then((message) => setTimeout(message.delete.bind(message), 5000));
    });
}
