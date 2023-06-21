import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "banir",
  description: "Bane um usuário do servidor.",
  testOnly: false,
  options: [
    {
      name: "user",
      description: "Selecione um usuário",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Diga o motivo para banir o usuário",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      await interaction.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser("user");

    if (user) {
      const userCache = interaction.guild?.members.cache.get(user.id);

      const reason = interaction.options.get("reason");

      const embed = new EmbedBuilder().setColor("#cc0000").setDescription(
        `
          **O usuário ${user} (\`${interaction.user.id}\`) foi banido.**

          >>> **Motivo** 
          ${reason?.value || "..."}

          Banido por **${interaction.user}**
        `
      );

      try {
        await userCache?.ban({
          reason: typeof reason?.value === "string" ? reason?.value : "",
        });

        interaction.reply({ embeds: [embed] });
      } catch (error) {
        const embed = new EmbedBuilder().setColor("#cc0000").setDescription(
          `
            **Houve um erro ao processar a solicitação.**
  
            >>> **Possíveis causas**
  
            Tentou banir alguém da staff.
            Usuário ou ID de usuário está inválido.
            Usuário não está no servidor.
            Usuário já foi banido.
            Outros.
          `
        );

        await interaction.reply({ embeds: [embed] });
      }
    }
  },
};
