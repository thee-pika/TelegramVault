import bot from "../config.js";

export const generateInviteLink = async (groupId: number, userId: number) => {
  await bot.unbanChatMember(groupId, userId, { only_if_banned: true });

  const link = await bot.createChatInviteLink(groupId, {
    expire_date: Date.now(),
    member_limit: 4,
  });

  return link;
};

export async function removeUserFromGroup(chatId: number, userId: number) {
  if (!userId) {
    return;
  }

  await bot.banChatMember(chatId, userId);
}
