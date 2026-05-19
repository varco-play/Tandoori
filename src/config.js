require('dotenv').config();

const required = ['BOT_TOKEN', 'PHILADELPHIA_ADMIN_ID', 'PITTSBURGH_ADMIN_ID', 'NEW_YORK_ADMIN_ID'];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`[CONFIG] Missing required env variable: ${key}`);
    process.exit(1);
  }
}

const config = {
  botToken: process.env.BOT_TOKEN,
  mode: process.env.MODE || 'polling',
  port: parseInt(process.env.PORT) || 3000,
  serverUrl: process.env.SERVER_URL || '',
  adminIds: {
    philadelphia: process.env.PHILADELPHIA_ADMIN_ID,
    pittsburgh: process.env.PITTSBURGH_ADMIN_ID,
    new_york: process.env.NEW_YORK_ADMIN_ID,
  },
};

module.exports = config;
