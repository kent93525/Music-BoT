const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { attentionembed } = require("../util/attentionembed"); 
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);
module.exports = {
  name: "pause",
  aliases: ["pa"],
  description: "暫停當前播放的音樂",
  cooldown: 5,
  edesc: `輸入命令可以暫停歌曲！\nUsage: ${PREFIX}pause`,
  execute(message) {
    //If not in a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "現在沒有音樂 無法執行動作!").catch(console.error);
    //If not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //If its playing
    if (queue.playing) {
      //set playing to false
      queue.playing = false;
      //pause the music
      queue.connection.dispatcher.pause(true);
      //define the pause embed
      const pausemebed = new MessageEmbed().setColor("#F0EAD6")
      .setAuthor(`音樂被 ${message.author.username} 暫停了!`, "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
      //react with approve emoji
      message.react(approveemoji)
      //return message
      return queue.textChannel.send(pausemebed).catch(console.error);
    }
  }
};
