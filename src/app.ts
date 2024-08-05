import {
  addKeyword,
  createBot,
  createFlow,
  createProvider,
  MemoryDB,
} from "@bot-whatsapp/bot";

import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3002);

  provider.http?.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const body = req.body;
      const message = body.message;
      const mediaUrl = body.mediaUrl;

      await bot.sendMessage("", message, {
        media: mediaUrl,
      });
      res.end("OK");
    })
  );

  await createBot({
    flow: createFlow([]),
    database: new MemoryDB(),
    provider,
  });
};
main();
