import { EmbedBuilder, StringSelectMenuBuilder, TextChannel } from "discord.js";

import { Command } from "../../../interfaces";

export const slash: Command = {
  name: "ticket",
  description: "Abra um ticket para dúvidas ou resolução de problemas.",
  testOnly: false,
  run: async ({ client, interaction }) => {
    const channel = client.channels.cache.get(process.env.TICKET_LOG_CHANNEL);

    if (channel?.isTextBased()) {
      const embed = new EmbedBuilder()
        .setTitle("KabanaMC ・ Central de Atendimento")
        .setColor("#313236").setDescription(`
          Olá e bem-vindo à Central de Atendimento da KabanaMC! 😊

          Nossa equipe está aqui para oferecer suporte e resolver suas dúvidas, então sinta-se à vontade para nos contar como podemos ajudá-lo(a). 🌟🔧

          Nosso horário de atendimento é de segunda a sexta-feira, das 09:00 às 19:00. Nos finais de semana e feriados, embora não tenhamos atendimento obrigatório, faremos o possível para responder às suas solicitações o mais rápido possível. ⏰📆

          Estamos ansiosos para atendê-lo(a) e garantir que sua experiência com o KabanaMC seja excepcional. Não hesite em entrar em contato conosco! 💪✉️

          **Sobre o que você deseja falar?**
        `);

      const options = [
        {
          label: "❓ Dúvidas",
          description: "Use para esclarecer suas dúvidas.",
          value: "suporte",
        },
        {
          label: "🗣️ Denúncia",
          description: "Use para fazer denúncias graves.",
          value: "denúncia",
        },
        {
          label: "🔧 Técnico",
          description: "Use para resolver ou reportar problemas técnicos.",
          value: "técnico",
        },
        {
          label: "💵 Financeiro",
          description: "Use para falar de compras e pagamentos.",
          value: "financeiro",
        },
      ];

      const menu = new StringSelectMenuBuilder()
        .setCustomId("ticket")
        .addOptions(options);

      await (<TextChannel>channel)
        .send({
          embeds: [embed],
          components: [
            {
              type: 1,
              components: [menu.toJSON()],
            },
          ],
        })
        .then((message) => message.pin());
    }

    await interaction.reply({
      content: `Ticket fixado em ${channel}!`,
      ephemeral: true,
    });
  },
};
