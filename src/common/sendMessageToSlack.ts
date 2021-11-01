export const sendMessageToSlack = async (
  email: string,
  message: string
): Promise<boolean> => {
  const messageContent = {
    text: `恋々のお問い合わせ\nEmail:${email}\n内容:${message}`,
  };

  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(messageContent),
      });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};
