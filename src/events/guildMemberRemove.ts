import { Interaction, TextChannel } from "discord.js";

import { Event } from "../interfaces";

export const event: Event = {
  name: "guildMemberRemove",
  run: async (client, interaction: Interaction) => {
    const { user } = interaction;

    const channelLog = client.channels.cache.find(
      (ch) => ch.id === process.env.QUIT_LOG_CHANNEL
    );

    if (channelLog?.isTextBased()) {
      await (<TextChannel>channelLog).send({
        content: `🡪 ${user} saiu do servidor!`,
      });
    }
  },
};
