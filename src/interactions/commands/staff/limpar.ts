import { PermissionFlagsBits, ApplicationCommandOptionType } from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "limpar",
  description: "Limpa as mensagens de um canal.",
  options: [
    {
      name: "amount",
      description: "O número de mensagens a serem apagadas (1-99).",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  testOnly: false,
  run: async ({ interaction }) => {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      await interaction.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    }

    const amount = interaction.options.get("amount");

    const value = Number(amount?.value) + 1;

    if (value > 100 || value <= 0) {
      if (!interaction.replied) {
        await interaction.reply({
          content: `A quantidade precisa ser um número de \`1 a 99\``,
          ephemeral: true,
        });
      }
    } else {
      const messages = await interaction.channel?.messages.fetch({
        limit: value,
      });

      messages?.forEach((message) => message.delete());
    }

    await interaction.reply({
      content: "Limpeza em andamento 🔄️",
      ephemeral: true,
    });
  },
};
