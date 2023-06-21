import {
  CacheType,
  EmbedBuilder,
  ModalSubmitInteraction,
  TextChannel,
} from "discord.js";

import moment from "moment";

import Bot from "../../client";

export async function suggestion(
  client: Bot,
  interaction: ModalSubmitInteraction<CacheType>
) {
  const target = interaction.fields.getTextInputValue("target");
  const suggestion = interaction.fields.getTextInputValue("suggestion");

  const channel = client.channels.cache.get(process.env.SUGGESTION_LOG_CHANNEL);

  if (channel?.isTextBased()) {
    const embed = new EmbedBuilder()
      .setColor("#111111")
      .setAuthor({
        name: `${interaction.user.username}\n`,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setThumbnail(
        interaction.user.displayAvatarURL({
          size: 4096,
        })
      )
      .setDescription(
        `
          >>> **Uma nova sugestão foi enviada!**

          **Sugestão criada em**
          <t:${moment(interaction.createdTimestamp).unix()}>

          **Dados do usuário**

          **ID:** (\`${interaction.user.id}\`)
          **Nome:** ${interaction.user}
          **TAG:** \`${interaction.user.tag}\`

          **Alvo da sugestão**
          ${target}
          
          **Sugestão**
          \`\`\`${suggestion}\`\`\`
        `
      );

    await (<TextChannel>channel).send({
      embeds: [embed],
    });
  }

  await interaction.reply({
    content: `${interaction.user}, sua sugestão foi enviada com sucesso!`,
    ephemeral: true,
  });
}
