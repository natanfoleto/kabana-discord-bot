import { ClientEvents } from "discord.js";

import Client from "../client";

interface Run {
  (client: Client, ...args: any[]): any;
}

interface Event {
  name: keyof ClientEvents;
  run: Run;
}

export { Event };
