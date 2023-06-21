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
  name: "manutencao",
  description: "Faz um anuúncio de manutenção de algum servidor.",
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
      .setCustomId("maintenance")
      .setTitle("Anúnciar manutenção");

    const inputServer =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("server")
          .setLabel("Servidor")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(32)
          .setMinLength(4)
          .setPlaceholder("Digite o servidor ...")
          .setRequired(true)
      );

    const inputTitle =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("title")
          .setLabel("Título")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(32)
          .setMinLength(4)
          .setPlaceholder("Digite o título da manutenção ...")
          .setRequired(true)
      );

    const inputDescription =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("description")
          .setLabel("Descrição")
          .setStyle(TextInputStyle.Paragraph)
          .setMaxLength(1024)
          .setMinLength(8)
          .setPlaceholder("Digite a descrição da manutenção ...")
          .setRequired(true)
      );

    const inputTime =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("time")
          .setLabel("Tempo")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(32)
          .setMinLength(4)
          .setPlaceholder("Digite o tempo de estimado (02:30hrs)")
          .setRequired(true)
      );

    const inputLogo =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("logo")
          .setLabel("Logo do servidor")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(1000)
          .setMinLength(4)
          .setPlaceholder("Digite a URL da logo do servidor ...")
      );

    modal.addComponents(
      inputServer,
      inputTitle,
      inputDescription,
      inputTime,
      inputLogo
    );

    await interaction.showModal(modal);
  },
};
