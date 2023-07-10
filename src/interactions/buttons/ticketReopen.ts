import {
  CacheType,
  ButtonInteraction,
  TextChannel,
  PermissionFlagsBits,
} from "discord.js";

export async function ticketReopen(interaction: ButtonInteraction<CacheType>) {
  const channel = interaction.channel as TextChannel;

  const ticket = channel.topic;

  if (ticket && interaction.guild) {
    await channel.edit({
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
          id: ticket,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.AddReactions,
          ],
        },
        {
          id: interaction?.guild?.id,
          deny: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
          ],
        },
      ],
    });

    await interaction.reply({
      content: `${
        ticket === interaction.user.id ? `<@${ticket}>` : interaction.user
      } reabriu o ticket!`,
    });
  }

  await interaction.reply({
    content:
      "Ocorreu um erro inesperado! Nossa equipe já está trabalhando no problema!",
  });
}
