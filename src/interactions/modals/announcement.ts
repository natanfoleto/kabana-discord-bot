import {
  CacheType,
  EmbedBuilder,
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";
import Bot from "../../client";

export async function announcement(
  client: Bot,
  interaction: ModalSubmitInteraction<CacheType>
) {
  const title = interaction.fields.getTextInputValue("title");
  const description = interaction.fields.getTextInputValue("description");

  const channel = client.channels.cache.get(
    process.env.ANNOUUNCEMENT_LOG_CHANNEL
  );

  if (channel?.isTextBased()) {
    const embed = new EmbedBuilder()
      .setColor("#F1C21E")
      .setAuthor({
        name: `Anúncios - KabanaMC`,
        iconURL: "https://i.imgur.com/1eyPLUv.png",
      })
      .setDescription(
        `
        >>> **${title}** 
        ${description}
        
        Postado por **${interaction.user.username}**
      `
      )
      .setThumbnail(interaction.user?.displayAvatarURL())
      .setFooter({
        text: `\n© Todos os direitos reservados`,
      });

    await (<TextChannel>channel).send({
      embeds: [embed],
    });
  }

  await interaction.reply({
    content: `Anúncio criado em ${channel}!`,
    ephemeral: true,
  });
}
