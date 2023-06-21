import {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "desbanir",
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
      description: "Diga o motivo para desbanir o usuário",
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
      const reason = interaction.options.get("reason");

      const embed = new EmbedBuilder().setColor("#cc0000").setDescription(
        `
          **O usuário ${user} (\`${interaction.user.id}\`) foi desbanido.**

          >>> **Motivo** 
          ${reason?.value}

          Desbanido por **${interaction.user}**
        `
      );

      try {
        await interaction.guild?.members.unban(user.id);

        interaction.reply({ embeds: [embed] });
      } catch (error) {
        const embed = new EmbedBuilder().setColor("#cc0000").setDescription(
          `
            **Houve um erro ao processar a solicitação.**
  
            >>> **Possíveis causas**
  
            Usuário ou ID de usuário está inválido.
            Usuário nunca esteve no servidor.
            Usuário já foi desbanido.
            Outros.
          `
        );

        await interaction.reply({ embeds: [embed] });
      }
    } else {
      await interaction.reply({
        content: `O usuário ${user} não foi encontrado.`,
      });
    }
  },
};
