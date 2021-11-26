////////////////////////////
////////CONFIG LOAD/////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skipto",
  aliases: ["st", "jump"],
  description: "跳到指定的隊列號碼",
  cooldown: 5,
  edesc: `跳到列隊中的指定號碼\nUsage: ${PREFIX}skipto`,

execute(message, args) {
    //if not in a guild return
    if (!message.guild) return;
    //react with approve
    message.react(approveemoji).catch(console.error);
    //if no args return error
    if (!args.length)
      return attentionembed(message, `Try: ${message.client.prefix}${module.exports.name} <列隊號碼>`)
    //if not a number return error
    if (isNaN(args[0]))
      return attentionembed(message, `Try: ${message.client.prefix}${module.exports.name} <列隊號碼>`)
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue) return attentionembed(message, "沒有隊列!");
    //if member not in the same voice channel as the Bot return
    if (!canModifyQueue(message.member)) return;
    //if args bigger then the Server Queue return error
    if (args[0] > queue.songs.length)
      return attentionembed(message, `隊列只有 ${queue.songs.length} 長!`);
    //set playing to true
    queue.playing = true;
    //if the queue is loop 
    if (queue.loop) {
      //make a loop for all songs to skip and add them at the end again
      for (let i = 0; i < args[0] - 1; i++) 
        queue.songs.push(queue.songs.shift());
    //if not a loop
    } else {
      //remove all songs including the args 
      queue.songs = queue.songs.slice(args[0] - 1);
    }
    //end current song
    queue.connection.dispatcher.end();
    //Send approve
    queue.textChannel.send(
      new MessageEmbed()
        .setColor("#F0EAD6")
        .setAuthor(`${message.author.username}#${message.author.discriminator} 跳過了 ${args[0]} 首歌曲!`, "https://i.redd.it/y3wduhwn4gd61.jpg")
    ).catch(console.error);
  }
};
