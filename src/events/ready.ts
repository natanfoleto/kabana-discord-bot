import { Event } from "../interfaces";

export const event: Event = {
  name: "ready",
  run: (client) => {
    console.log(`Client ${client.user?.username} was started successfully!`);
  },
};
