import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`➤  Kabana BOT on-line em ${client.user?.username} 🔥`);
  },
};
