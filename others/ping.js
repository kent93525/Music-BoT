const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `ping`,
  description: `我能提供你我的延遲`,
  aliases: ["latency"],
  cooldown: 2,
  edesc: "輸入此命令可以查看我對你說話的延遲",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the Ping embed
    message.reply(new MessageEmbed().setColor("#F0EAD6").setTitle(":signal_strength: `延遲 " + client.ws.ping + "ms` :globe_with_meridians:"));
  }
}