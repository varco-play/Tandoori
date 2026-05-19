require('dotenv').config();
const config = require('./src/config');
const { createBot } = require('./src/bot');

console.log(`[MAIN] Starting Tandoori Hiring Bot in ${config.mode.toUpperCase()} mode...`);

const bot = createBot();

if (config.mode === 'webhook') {
  if (!config.serverUrl) {
    console.error('[MAIN] SERVER_URL is required for webhook mode. Exiting.');
    process.exit(1);
  }
  const { startServer } = require('./src/server');
  startServer();
} else {
  console.log('[MAIN] Bot running in polling mode. Press Ctrl+C to stop.');
}

process.on('SIGINT', () => {
  console.log('\n[MAIN] Shutting down...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('[MAIN] Uncaught exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('[MAIN] Unhandled rejection:', reason);
});
