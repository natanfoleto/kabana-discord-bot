import {
  PermissionFlagsBits,
  EmbedBuilder,
  ApplicationCommandOptionType,
} from "discord.js";

import ms from "ms";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "castigar",
  description: "Coloque um membro de castigo.",
  testOnly: false,
  options: [
    {
      name: "user",
      type: ApplicationCommandOptionType.User,
      description: "Selecione um usuário.",
      required: true,
    },
    {
      name: "time",
      type: ApplicationCommandOptionType.String,
      description: "Selecione um tempo para colocar o usuário de castigo.",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "5 Minutos",
          value: "5m",
        },
        {
          name: "10 Minutos",
          value: "10m",
        },
        {
          name: "15 Minutos",
          value: "15m",
        },
        {
          name: "30 Minutos",
          value: "30m",
        },
        {
          name: "45 Minutos",
          value: "45m",
        },
        {
          name: "1 Hora",
          value: "1h",
        },
        {
          name: "2 Horas",
          value: "1h",
        },
        {
          name: "5 Horas",
          value: "1h",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "24 Horas",
          value: "24h",
        },
        {
          name: "1 Dia",
          value: "24h",
        },
        {
          name: "3 dias",
          value: "72h",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
      ],
    },
    {
      name: "reason",
      type: ApplicationCommandOptionType.String,
      description: "Diga o motivo para castigar o usuário",
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
      try {
        const targetUser = interaction.guild?.members.cache.get(user.id);
        const time = interaction.options.get("time");
        const reason = interaction.options.get("reason");
        const duration = ms(String(time?.value));

        if (!targetUser)
          return await interaction.reply({
            content: "Usuário não encontrado.",
            ephemeral: true,
          });

        const embed = new EmbedBuilder()
          .setColor("DarkRed")
          .setDescription(
            `
            **O usuário ${user} (\`${interaction.user.id}\`) foi castigado.**
            
            **Motivo**
            ${reason?.value || "Nenhum motivo fornecido"}
            
            **Duração do castigo**
            ${time?.value}
          `
          )
          .setFooter({
            text: `Castigado por ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          });

        await targetUser.timeout(
          duration,
          typeof reason?.value === "string" ? reason?.value : ""
        );

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        const embed = new EmbedBuilder().setColor("DarkRed").setDescription(
          `
            **Houve um erro ao processar a solicitação.**
  
            **Possíveis causas**
  
            Tentou castigar alguém da staff.
            Usuário ou ID de usuário está inválido.
            Usuário não está no servidor.
            Usuário já foi castigado.
            Outros.
          `
        );

        await interaction.reply({ embeds: [embed] });
      }
    } else {
      await interaction.reply({ content: "Usuário não encontrado." });
    }
  },
};
