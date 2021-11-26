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
  name: "stop",
  description: "停止播放",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `輸入此命令我將會停止播放並離開!\nUsage: ${PREFIX}stop`,

async execute(message,args,client) {
  //if not in a guild retunr
  if (!message.guild) return;
  //react with approve emoji
  message.react(approveemoji).catch(console.error);
  const { channel } = message.member.voice;
  //get the serverQueue
  const queue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "請先加入語音頻道");  
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `你必須和我在同一個語音頻道`);
  //if no Queue return error
  if (!queue)
    return attentionembed(message, "你啥也阻止不了");
  //if not in the same channel return
  if (!canModifyQueue(message.member)) return;
  //Leave the channel
  await channel.leave();
  //send the approve message    
  message.channel.send(new MessageEmbed()
  .setColor("#F0EAD6")
  .setAuthor(`${message.author.username} 停止播放!`, "https://i.redd.it/y3wduhwn4gd61.jpg"))
  .catch(console.error);
  }
};
