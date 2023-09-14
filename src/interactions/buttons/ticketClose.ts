import {
  CacheType,
  ButtonInteraction,
  TextChannel,
  PermissionFlagsBits,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export async function ticketClose(interaction: ButtonInteraction<CacheType>) {
  const channel = interaction.channel as TextChannel;

  const ticket = channel.topic;

  if (ticket && interaction.guild) {
    await channel.edit({
      permissionOverwrites: [
        {
          id: process.env.STAFF_ROLE,
          deny: [PermissionFlagsBits.SendMessages],
        },
        {
          id: ticket,
          deny: [PermissionFlagsBits.SendMessages],
        },
      ],
    });

    const embed = new EmbedBuilder().setDescription(`
        **${interaction.user} fechou o ticket!**

        **Escolha uma opção abaixo**
        ↳ Deletar ticket
        ↳ Reabrir ticket

        > Se você não escolher uma opção em 5 minutos, nossa equipe deletará o ticket por inatividade.
      `);

    const buttonReopen = new ButtonBuilder()
      .setCustomId("ticket-reopen")
      .setLabel("Reabrir")
      .setStyle(ButtonStyle.Success);

    const buttonDelete = new ButtonBuilder()
      .setCustomId("ticket-delete")
      .setLabel("Deletar")
      .setStyle(ButtonStyle.Danger);

    await interaction.reply({
      embeds: [embed],
      components: [
        {
          type: 1,
          components: [buttonReopen, buttonDelete],
        },
      ],
    });

    return;
  }

  await interaction.reply({
    content:
      "Ocorreu um erro inesperado! Nossa equipe já está trabalhando no problema!",
  });
}
