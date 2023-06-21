import Client from "./client";

new Client().init();

// Registrando os eventos que vão evitar um crash na aplicação

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception: " + error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection:");
  console.log("Reason: ", reason);
  console.log("Promise: ", promise);
});
