import {
  CacheType,
  ButtonInteraction,
  TextChannel,
  EmbedBuilder,
} from "discord.js";

import { createTranscript } from "discord-html-transcripts";

import Bot from "../../client";

export async function ticketDelete(
  client: Bot,
  interaction: ButtonInteraction<CacheType>
) {
  const channel = interaction.channel as TextChannel;
  const ticket = channel.topic;

  const attachment = await createTranscript(channel);

  await interaction.channel?.delete();

  const embed = new EmbedBuilder()
    .setDescription(
      `
        **Ticket** de <@${ticket}>\`(${ticket})\`
        
        **Deletado por** ${interaction.user}\`(${interaction.user.id})\`
      `
    )
    .setColor("#313236")
    .setTimestamp();

  const channelLog = client.channels.cache.find(
    (ch) => ch.id === process.env.STAFF_LOG_CHANNEL
  );

  if (channelLog?.isTextBased()) {
    await (<TextChannel>channelLog).send({
      embeds: [embed],
      files: [attachment],
    });
  }
}
