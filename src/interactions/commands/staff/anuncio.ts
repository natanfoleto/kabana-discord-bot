import {
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
} from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "anuncio",
  description: "Criar um anúncio no servidor.",
  testOnly: false,
  run: async ({ interaction }) => {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)
    ) {
      await interaction.reply({
        content: "Você não tem permissão para usar este comando.",
        ephemeral: true,
      });
    }

    const modal = new ModalBuilder()
      .setCustomId("announcement")
      .setTitle("Enviar anúncio");

    const title = new TextInputBuilder()
      .setCustomId("title")
      .setLabel("Título do anúncio")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(30)
      .setMinLength(3)
      .setPlaceholder("Digite o titulo do anúncio ...")
      .setRequired(true);

    const description = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Descrição do anúncio")
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(1000)
      .setMinLength(10)
      .setPlaceholder("Descreva a descrição do anúncio ...")
      .setRequired(true);

    const inputTitle =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        title
      );
    const inputDescription =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        description
      );

    modal.addComponents(inputTitle, inputDescription);

    await interaction.showModal(modal);
  },
};
