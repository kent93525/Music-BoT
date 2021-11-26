////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "恢復當前播放的音樂",
  cooldown: 5,
  edesc: `輸入此命令以恢復暫停的歌曲！\nUsage: ${PREFIX}resume`,
  
execute(message) {
    //if not a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the Server Queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message,"現在沒有音樂 無法執行動作!").catch(console.error);
    //if user not in the same channel as the bot retunr
    if (!canModifyQueue(message.member)) return;
    //if its paused
    if (!queue.playing) {
      //set it to true
      queue.playing = true;
      //resume the Bot
      queue.connection.dispatcher.resume();
      //Create approve embed
      const playembed = new MessageEmbed().setColor("#F0EAD6")
      .setAuthor(`${message.author.username} 恢復了音樂！`, "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
      //send the approve
      return queue.textChannel.send(playembed).catch(console.error);
    }
    //if its not paused return error
    return  attentionembed(message, "隊列沒有暫停！").catch(console.error);
  }
};
