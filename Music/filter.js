////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const ytsr = require("youtube-sr")
const { Client, Collection, MessageEmbed } = require("discord.js");
const { play } = require("../include/play")
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "filter",
  description: "設置音效 ",
  aliases: ["f"],
  cooldown: 3,
  edesc: `Type this Command to change the current audio effect - style \nUsage: ${PREFIX}filter <Filtertype>`,

  async execute(message, args, client) {
    //if its not in a guild return
    if (!message.guild) return;
    //define channel
    const { channel } = message.member.voice;
    //get serverqueue
    const queue = message.client.queue.get(message.guild.id);
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //if the argslength is null return error
    //if there is already a search return error
    if (message.channel.activeCollector)
      return attentionembed(message, "有一個搜索活動！ ");
    //if the user is not in a voice channel return error
    if (!message.member.voice.channel)
      return attentionembed(message, "請先加入語音頻道")
    //If not in the same channel return error
    if (queue && channel !== message.guild.me.voice.channel)
      return attentionembed(message, `你必須和我在同一個語音頻道`);
    //Define all filters with ffmpeg    https://ffmpeg.org/ffmpeg-filters.html
    const filters = [
      'bass=g=20,dynaudnorm=f=200',//bassboost
      'apulsator=hz=0.08', //8D
      'aresample=48000,asetrate=48000*0.8',//vaporwave
      'aresample=48000,asetrate=48000*1.25',//nightcore
      'aphaser=in_gain=0.4',//phaser
      'tremolo',//tremolo
      'vibrato=f=6.5',//vibrato
      'surround',//surrounding
      'apulsator=hz=1',//pulsator
      'asubboost',//subboost
      'chorus=0.5:0.9:50|60|40:0.4|0.32|0.3:0.25|0.4|0.3:2|2.3|1.3',//chorus of 3
      'stereotools=mlev=0.015625',//karaoke
      'sofalizer=sofa=/path/to/ClubFritz12.sofa:type=freq:radius=2:rotation=5',//sofa
      'silenceremove=window=0:detection=peak:stop_mode=all:start_mode=all:stop_periods=-1:stop_threshold=0',//desilencer
      "remove",
    ];
    //set some temporary variables
    let varforfilter; let choice;
    //get user input
    switch (args[0]) {
      case "bassboost":
        varforfilter = 0;
        break;
      case "8D":
        varforfilter = 1;
        break;
      case "vaporwave":
        varforfilter = 2;
        break;
      case "nightcore":
        varforfilter = 3;
        break;
      case "phaser":
        varforfilter = 4;
        break;
      case "tremolo":
        varforfilter = 5;
        break;
      case "vibrato":
        varforfilter = 6;
        break;
      case "surrounding":
        varforfilter = 7;
        break;
      case "pulsator":
        varforfilter = 8;
        break;
      case "subboost":
        varforfilter = 9;
        break;
      case "chorus":
        varforfilter = 10;
        break;
      case "karaoke":
        varforfilter = 11;
        break;
      case "sofa":
        varforfilter = 12;
        break;
      case "desilencer":
        varforfilter = 13;
        break;
      case "clear":
        varforfilter = 14;
        break;
      default:
        //fires if not valid input
        varforfilter = 404;
        message.channel.send(new MessageEmbed()
        .setColor("#F0EAD6")
        .setTitle(`\`無效命令 請嘗試以下效果:\``)
        .setDescription(`
        \`bassboost\` 低音增強
        \`8D\` 8D 環繞音效
        \`vaporwave\` 不知道中文是甚麼
        \`nightcore\` 就是 Nightcore 
        \`sofa \` 讓耳機用戶聽的更舒服 應該有用
        \`desilencer \` 消除人類聲
        \`clear\` 移除所有效果`)
        .setFooter(`一個例子: ${PREFIX}filter bassboost`)
        .setAuthor(`!WKuma[機械白熊]`, "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
        )
        break;
    }
    //set choice to zero
    choice = filters[varforfilter];
    if (varforfilter === 404) return;
    try {
      const song = queue.songs[0];
      //play the collected song song, message, client, filters
      message.channel.send(new MessageEmbed()
      .setColor("#F0EAD6")
      .setAuthor("Applying: " + args[0], "https://cdn.discordapp.com/app-icons/883385486306050049/e1b549c89da4780690bf368b38487e69.png")).then(msg =>{
        msg.delete({timeout: 2000});
      })
      play(song, message, client, choice);
      //catch any errors while searching
    } catch (error) {
      //log them
      console.error(error);
      //set collector false, just incase its still true
      message.channel.activeCollector = false;
    }
  }
};