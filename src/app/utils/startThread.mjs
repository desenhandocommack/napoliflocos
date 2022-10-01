export default function startThread(msg, username) {
  if (msg.attachments.size > 0) {
    const attachmentName = msg.attachments.first().name;

    const file = attachmentName.slice(0, attachmentName.lastIndexOf('.'));

    msg.startThread({
      name: `Post de ${username} (${file})`,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
    });
  } else {
    msg.delete();
  }
}
