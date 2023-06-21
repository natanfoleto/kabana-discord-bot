import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "ping",
  description: "Calcula o ping do bot.",
  testOnly: false,
  run: ({ interaction }) => {
    const { ping } = interaction.client.ws;
    const gateway = Date.now() - interaction.createdTimestamp;

    return interaction.reply({
      content: `🌐 | Ping (latência): \`${ping}\` ms\n☁️ | Gateway Ping: \`${gateway}\` ms`,
      ephemeral: true,
    });
  },
};
