////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "search",
  description: "搜尋並選擇要播放的視頻",
  aliases: ["s"],
  cooldown: 3,
  edesc: `輸入此命令以查尋歌曲的前 5 個結果！\nUsage: ${PREFIX}search <TITEL | URL>`,

async execute(message,args,client) {
    //if its not in a guild return
    if(!message.guild) return;
     //define channel
     const { channel } = message.member.voice;
     //get serverqueue
     const serverQueue = message.client.queue.get(message.guild.id);
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //if the argslength is null return error
    if (!args.length)
      return attentionembed(message,`用法: ${message.client.prefix}${module.exports.name} <Video Name>`)
    //if there is already a search return error
    if (message.channel.activeCollector)
      return attentionembed(message,"有一個搜索活動！");
    //if the user is not in a voice channel return error
    if (!message.member.voice.channel)
      return attentionembed(message,"請先加入語音頻道")
       //If not in the same channel return error
    if (serverQueue && channel !== message.guild.me.voice.channel)
    return attentionembed(message, `你必須和我在同一個語音頻道`);
    //define search
    const search = args.join(" ");
    //define a temporary Loading Embed
    let temEmbed = new MessageEmbed()
    .setAuthor("Loading...", "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
    .setColor("#F0EAD6")
    //define the Result Embed
    let resultsEmbed = new MessageEmbed()
      .setTitle("查尋結果")
      .setDescription(`\`${search}\``)
      .setColor("#F0EAD6")
      .setAuthor("搜索結果！", "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png","http://harmonymusic.tk")
      .setFooter("用你最喜歡的號碼回复","https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
    //try to find top 5 results
    try {
      //find them
      const results = await ytsr.default.search(search, { limit: 5 });
      //map them and sort them and add a Field to the ResultEmbed
      results.map((video, index) => resultsEmbed.addField(video.url, `${index + 1}. ${video.title}`));
      // send the temporary embed
      const resultsMessage = await message.channel.send(temEmbed)
      //react with 5 Numbers
        await resultsMessage.react("1️⃣");
        await resultsMessage.react("2️⃣");
        await resultsMessage.react("3️⃣");
        await resultsMessage.react("4️⃣");
        await resultsMessage.react("5️⃣");
      //edit the resultmessage to the resultembed
        await resultsMessage.edit(resultsEmbed)
      //set the collector to true
      message.channel.activeCollector = true;
      //wait for a response
      let response;
      await resultsMessage.awaitReactions((reaction, user) => user.id == message.author.id,
      {max: 1, time: 60000, errors: ['time'],} ).then(collected => {
        //if its one of the emoji set them to 1 / 2 / 3 / 4 / 5
          if(collected.first().emoji.name == "1️⃣"){ return response = 1;}
          if(collected.first().emoji.name == "2️⃣"){ return response = 2;}
          if(collected.first().emoji.name == "3️⃣"){ return response = 3;}
          if(collected.first().emoji.name == "4️⃣"){ return response = 4;}
          if(collected.first().emoji.name == "5️⃣"){ return response = 5;}
          //otherwise set it to error
          else{
            response = "error";
          }
        });
        //if response is error return error
      if(response === "error"){
        //send error message
        attentionembed(message,"請使用正確的表情符號！");
        //try to delete the message
        return resultsMessage.delete().catch(console.error);
      }
      //get the field name of the response
      const choice = resultsEmbed.fields[parseInt(response) - 1].name;
      //set collector to false aka off
      message.channel.activeCollector = false;
      //play the collected song
      message.client.commands.get("play").execute(message, [choice]);
      //delete the search embed
      resultsMessage.delete().catch(console.error);
      //catch any errors while searching
    } catch (error) {
      //log them
      console.error(error);
      //set collector false, just incase its still true
      message.channel.activeCollector = false;
    }
  }
};
