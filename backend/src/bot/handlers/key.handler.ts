import { Group } from "../../lib/database/model/group.model.js";
import { Subscription } from "../../lib/database/model/subscription.model.js";
import bot from "../../lib/telegram/config.js";
import { generateInviteLink } from "../../lib/telegram/utils/index.js";

export const keyVerify = () => {
  bot.onText(/\/key (.+)/, async (msg, match) => {
    const userId = msg.from?.id;
    const chatId = msg.chat.id;

    const key = match?.[1];

    const subscription = await Subscription.findOne({
      subscription_key: key,
    });

    if (!subscription) {
      bot.sendMessage(
        chatId,
        `May be your key is invalid or a server error occurred. Please try again`
      );
      return;
    }

    if (subscription.status !== "activated") {
      bot.sendMessage(chatId, `You subscription is not activated`);
    }

    const groupInfo = await Group.findOne({
      _id: subscription.of_group,
    });

    if (!groupInfo) {
      bot.sendMessage(chatId, `Server error`);
      return;
    }

    if (userId) {
      await Subscription.updateOne({ telegram_user_id: userId });
    }

    if (key && key === subscription.subscription_key) {
      const link = (
        await generateInviteLink(Number(groupInfo.group_id), userId as number)
      ).invite_link;

      bot.sendMessage(chatId, `your Key is valid. Invite Link: ${link}`);
      return;
    }

    bot.sendMessage(chatId, "Please provide a valid group ID.");
  });
};
