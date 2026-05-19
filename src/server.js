const express = require('express');
const config = require('./config');
const { getBot } = require('./bot');

function startServer() {
  const app = express();
  app.use(express.json());

  const bot = getBot();
  const webhookPath = `/webhook/${config.botToken}`;
  const webhookUrl = `${config.serverUrl}${webhookPath}`;

  // Register webhook with Telegram
  bot.setWebHook(webhookUrl).then(() => {
    console.log(`[SERVER] Webhook set: ${webhookUrl}`);
  }).catch((err) => {
    console.error('[SERVER] Failed to set webhook:', err.message);
  });

  app.post(webhookPath, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });

  app.get('/', (req, res) => res.send('Tandoori Bot is running.'));

  app.listen(config.port, () => {
    console.log(`[SERVER] Express listening on port ${config.port}`);
  });
}

module.exports = { startServer };
