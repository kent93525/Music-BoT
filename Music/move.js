require('array.prototype.move');
const { canModifyQueue } = require("../util/nkm");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "移動列隊中的歌曲",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("列隊空空的 跟你的腦袋一樣呢!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`使用方法: ${message.client.prefix}move <列隊號碼>`);
    if (isNaN(args[0])) return message.reply(`適用方法: ${message.client.prefix}move <列隊號碼>`);

    let songMoved = queue.songs[args[0] - 1];

    queue.songs.move(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} 🚚 下一首將播放 **${songMoved.title}**.`);
  }
};