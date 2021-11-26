////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skip",
  aliases: ["se"],
  description: "跳過正在播放的歌曲",
  cooldown: 5,
  edesc: `輸入此命令可以跳過正在撥放的歌曲!.\n用法: ${PREFIX}skip`,

execute(message) {
    //if not in a guild retunr
    if (!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue)
      return attentionembed(message, "沒東西了! 你想跳到哪兒去?").catch(console.error);
    //if not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //set playing to true 
    queue.playing = true;
    //end current song
    queue.connection.dispatcher.end();
    //send approve message
    queue.textChannel.send(
      new MessageEmbed().setColor("#F0EAD6").setAuthor(`${message.author.username} 跳過了歌曲!`, "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
    ).catch(console.error);
  }
};
