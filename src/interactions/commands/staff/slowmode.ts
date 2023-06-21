import {
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  TextChannel,
} from "discord.js";
import ms from "ms";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "slowmode",
  description: "Seta o tempo de envio de mensagens em um canal de texto.",
  options: [
    {
      name: "channel",
      description: "Mencione um canal de texto.",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "time",
      description: "Coloque o tempo do modo lento [ 1s | 1m | 1h ].",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  testOnly: false,
  run: async ({ client, interaction }) => {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      await interaction.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    }

    try {
      const time = interaction.options.get("time")?.value;
      const msTime = ms(String(time));

      if (!time) {
        await interaction.reply({
          content: `Forneça um tempo válido: [s|m|h].`,
          ephemeral: true,
        });
      }

      const channel = client.channels.cache.find(
        (ch) => ch.id === interaction.options.get("channel")?.value
      );

      if (channel?.isTextBased()) {
        await (<TextChannel>channel).setRateLimitPerUser(msTime / 1000);

        await interaction.reply({
          content: `O canal de texto ${channel} teve seu modo lento definido para \`${time}\`.`,
        });
      }
    } catch (error) {
      await interaction.reply({
        content: "Houve um erro ao tentar ativar o slowmode para este canal.",
        ephemeral: true,
      });
    }
  },
};
