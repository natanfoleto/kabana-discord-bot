import { CacheType, EmbedBuilder, ModalSubmitInteraction } from "discord.js";

export async function maintenance(
  interaction: ModalSubmitInteraction<CacheType>
) {
  const server = interaction.fields.getTextInputValue("server");
  const title = interaction.fields.getTextInputValue("title");
  const description = interaction.fields.getTextInputValue("description");
  const time = interaction.fields.getTextInputValue("time");
  const logo = interaction.fields.getTextInputValue("logo");

  const embed = new EmbedBuilder()
    .setTitle("Um servidor entrou em manutenção")
    .setDescription(
      `
        >>> **${title}**

        ${description}

        **Servidor**: ${server}
        **Tempo estimado**: ${time}
      `
    )
    .setColor("DarkRed")
    .setThumbnail(logo || "https://i.imgur.com/1eyPLUv.png");

  await interaction.reply({ embeds: [embed] });
}
