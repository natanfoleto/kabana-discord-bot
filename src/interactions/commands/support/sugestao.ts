import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
} from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "sugestao",
  description: "Envie sua sugestão para melhorar a nossa experiência.",
  testOnly: false,
  run: async ({ interaction }) => {
    const modal = new ModalBuilder()
      .setCustomId("suggestion")
      .setTitle("Enviar sugestão");

    const inputTarget =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("target")
          .setLabel("Alvo da sugestão")
          .setStyle(TextInputStyle.Short)
          .setMaxLength(32)
          .setMinLength(2)
          .setPlaceholder("Servidor do discord, Rankup E., Loja, outros ...")
          .setRequired(true)
      );

    const inputSuggestion =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId("suggestion")
          .setLabel("Sugestão")
          .setStyle(TextInputStyle.Paragraph)
          .setMaxLength(1024)
          .setMinLength(8)
          .setPlaceholder("Digite aqui a sua sugestão ...")
          .setRequired(true)
      );

    modal.addComponents(inputTarget, inputSuggestion);

    await interaction.showModal(modal);
  },
};
