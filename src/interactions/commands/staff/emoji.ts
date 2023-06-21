import {
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "emoji",
  description: "Veja as informações de um emoji.",
  options: [
    {
      name: "emoji",
      description: "Insira o nome exato do emoji.",
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
      const name = interaction.options.get("emoji")?.value;

      const emoji =
        client.emojis.cache.find(
          (emoji) => `<:${emoji.name}:${emoji.id}>` === name
        ) ||
        client.emojis.cache.find((emoji) => emoji.name === name) ||
        client.emojis.cache.get(String(name));

      if (!emoji)
        return await interaction.reply({
          embeds: [
            new EmbedBuilder().setColor("Red").setDescription(
              `
                **Não encontrei o emoji :/**
              
                Siga o modelo abaixo
                \`/emoji [nome]\`
              `
            ),
          ],
        });

      const img = emoji?.animated
        ? `https://cdn.discordapp.com/emojis/${emoji?.id}.gif?size=2048`
        : `https://cdn.discordapp.com/emojis/${emoji?.id}.png?size=2048`;

      const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Download")
        .setEmoji("📎")
        .setURL(img);

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Informações do Emoji:")
        .setThumbnail(`${img}`)
        .setDescription(
          `
            Nome do emoji: \`${emoji?.name}\`
            ID do emoji: \`${emoji?.id}\`
            Menção do emoji: \`${emoji}\`
            O emoji é: \`Imagem (png/jpg)\`
            Criado em: <t:${Number(emoji?.createdTimestamp && 0 / 1000)}>
          `
        );

      await interaction.reply({
        embeds: [embed],
        components: [
          {
            type: 1,
            components: [button],
          },
        ],
      });
    } catch (error) {
      await interaction.reply(
        `Houve um erro ao tentar utilizar esse comando, ${interaction.user}`
      );
    }
  },
};
