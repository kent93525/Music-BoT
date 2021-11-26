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
  name: "volume",
  aliases: ["v"],
  description: "改變音量",
  cooldown: 5,
  edesc: `輸入此命令可以調整音量<0-200>!\nUsage: ${PREFIX}volume <0-200>`,

execute(message, args) {
    //if not a guild return
    if(!message.guild) return;
    //react with approve emoji
    message.react(approveemoji);
    //get the current queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message,`現在沒有音樂 無法執行動作!`);
    //if not in the same voice channel as the Bot return 
    if (!canModifyQueue(message.member)) return;
    //define Info Embed
    const volinfoembed = new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🔊 目前音量: \`${queue.volume}%\``)
    //if no args return info embed   			 
    if (!args[0]) return message.channel.send(volinfoembed).catch(console.error);
    //if args is not a number return error
    if (isNaN(args[0])) return attentionembed(message,"這不是 **0** 和 **200** 之間的數字");
    //if args is not a Number between 150 and 0 return error
    if (parseInt(args[0]) < 0 || parseInt(args[0]) > 200)
      return attentionembed(message,"這不是 **0** 和 **200** 之間的數字");
    //set queue volume to args
    queue.volume = args[0];
    //set current volume to the wanted volume
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    //define approve embed
    const volinfosetembed = new MessageEmbed()   
    .setColor("#F0EAD6")
    .setTitle(`🔊 Volume changed to: \`${args[0]}%\`!`)  
    //Send approve message
    return queue.textChannel.send(volinfosetembed).catch(console.error);
  }
};
