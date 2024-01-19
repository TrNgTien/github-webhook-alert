import express, { Request, Response } from 'express';
import { Telegraf } from 'telegraf';
import { EAction, EGithubEvents } from './types';
require('dotenv').config();

const expressApp = express();

const PORT = process.env.PORT || 3000;
const PREFIX_PHOTO =
  'https://www.freepik.com/premium-vector/flat-chat-bot-marketing-design-chat-messenger-icon-support-service-icon-chat-bot-flat-style-online-consultation-support-service-bot_17408508.htm#query=bot%20logo&position=18&from_view=keyword&track=ais';

expressApp.use(
  express.json({
    type: 'application/json',
  }),
);


const bot = new Telegraf(process.env.TELE_BOT_KEY);

bot.launch().then();

bot.command('start', (ctx) => {
  const { id } = ctx.chat ?? {};

  bot.telegram.sendMessage(id, `Current ${id}`);
});

bot.command('cmd', (ctx) => {
  ctx.replyWithPhoto(PREFIX_PHOTO, {
    caption: `Here are all commands:
    1. /start: start instructions`,
  });
});

expressApp.get('/ping', (_: Request, res: Response) => {
  res.status(202).send('Pong!!');
});

expressApp.post('/webhook', (request: Request, res: Response) => {
  const githubEvent = request.headers['x-github-event'];

  switch (githubEvent) {
    case EGithubEvents.ISSUES: {
      const data = request.body;
      const action = data.action;
      if (action === EAction.OPENED) {
        console.log('[webhook][opened]: %o', data);
      } else if (action === EAction.CLOSED) {
        console.log(`An issue was closed by ${data.issue.user.login}`);
      } else {
        console.log(`Unhandled action for the issue event: ${action}`);
      }

      break;
    }
    case EGithubEvents.PING: {
      console.log('GitHub sent the ping event');
      break;
    }
    default: {
      console.log(`Unhandled event: ${githubEvent}`);
      break;
    }
  }

  return res.status(200).json({ message: 'Successfully!' });
});

expressApp.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}......!`);
});
