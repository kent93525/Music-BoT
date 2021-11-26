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
  name: "loop",
  aliases: ['l'],
  description: "循環播放",
  cooldown: 3,
  edesc: `在聊天中輸入命令來激活 / 停用循環，您也可以對循環表情符號做出反應！ \nUsage: ${PREFIX}loop`,
execute(message) {
    //if not in a Guild return
    if(!message.guild) return;
    //Get the current Queue
    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "我做不到 請重新撥放歌曲!").catch(console.error);
    //If not in a VOICE 
    if (!canModifyQueue(message.member)) return;
    //Reverse the Loop state
    queue.loop = !queue.loop;
    //Define the Loop embed
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#F0EAD6" : "#F0EAD6")
    .setAuthor(`🔁Loop is ${queue.loop ? " enabled" : " disabled"}`, "https://i.redd.it/y3wduhwn4gd61.jpg")
    //react with approve emoji
    message.react(approveemoji);
    //send message into the Queue chat
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
