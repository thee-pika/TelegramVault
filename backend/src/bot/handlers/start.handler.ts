import type { SendMessageOptions } from "node-telegram-bot-api";
import {
  JOIN_GROUP,
  REGISTER_GROUP,
} from "../../lib/telegram/utils/constants.js";
import bot from "../../lib/telegram/config.js";

const replyKeyboard = {
  reply_markup: {
    keyboard: [
      [
        {
          text: REGISTER_GROUP,
        },
        {
          text: JOIN_GROUP,
        },
      ],
    ],
    resize_keyboard: true,
    one_time_keyboard: true,
  },
} as SendMessageOptions;

export const startHandler = () => {
  bot.onText(/\/start/, (msg) => {
    const chatID = msg.chat.id;

    bot.sendMessage(chatID, "choose an option:", replyKeyboard);
  });
};
