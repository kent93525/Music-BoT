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
  name: "remove",
  description: "從列隊中刪除歌曲",
  aliases: ["delete"],
  cooldown: 1.5,
  edesc: `輸入命令 可以移除列隊中的歌曲\nUsage: ${PREFIX}remove <Queue num.>`,

execute(message, args) {
  //if its not a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if there is no queue return error
    if (!queue) return attentionembed(message,"沒有列隊");
    //if he isnt in the same voice channel as the bot
    if (!canModifyQueue(message.member)) return;
    //if no args then return error
    if (!args.length) return attentionembed(message,`用法: ${message.client.prefix}remove <Queue Number>`);
    //If not a number then return error
    if (isNaN(args[0])) return attentionembed(message,`用法: ${message.client.prefix}remove <Queue Number>`);
    //get the song
    const song = queue.songs.splice(args[0] - 1, 1);
    //react with approve
    message.react(approveemoji)
    //send approve
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`:no_entry_sign: | ${message.author} 從隊列中刪除了  **${song[0].title}** `)
    .setColor("#F0EAD6")
    );
  }
};
