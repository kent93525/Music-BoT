const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
  approveemoji,
  denyemoji 
} = require(`../config.json`);

module.exports = {
  name: `help`,
  description: `能幫助你的好東西!`,
  aliases: ["h","commands"],
  cooldown: 3,
  edesc: "輸入 help 以獲得所有命令，輸入 help <COMMANDNAME> 以獲取有關此命令的擴展信息！",
  execute(message,args,client) {
     
    let commands = message.client.commands.array();
 
    let helpEmbed = new MessageEmbed()
    .setTitle("**HELP MENU 🔰 Commands**")
    .setAuthor(`!WKuma[機械白熊]`, "https://cdn.discordapp.com/icons/725381110476963881/3ad78e075586d8156ea058fc65b1f742.png")
    .addField('•前綴資訊', `前綴: \`${PREFIX}\`\n你也可以標註我 ${client.user} 來查詢前綴!`, false)
    .addField("• 作者", `\`\`\`yml\nName: WKuma[白熊]#3272\`\`\``)
    .addField("• 相關連結", `**[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) \`|\` [My Server](https://discord.gg/mHGRT3UvF3)\**`)
    .addField(`------------所有音樂命令都在下面------------`)
      .setFooter( client.user.username +`例子: ${PREFIX}help <命令> 了解更多信息！ `)  
      .setColor("#F0EAD6");

      let ifargstruedothis = -1;
      
      switch(args[0]){
          case "filter":
           ifargstruedothis=0;
          break;
          case "leave ":
           ifargstruedothis=1;
          break;
          case "loop":
            ifargstruedothis=2;
          break;
          case "lyrics":
            ifargstruedothis=3
          break;
          case "nowplaying":
            ifargstruedothis=4
          break;
          case "pause":
            ifargstruedothis=5
          break;
          case "play":
            ifargstruedothis=6
          break;
          case "playlist":
            ifargstruedothis=7
          break;
          case "queue":
            ifargstruedothis=8
          break;
          case "radio":
            ifargstruedothis=9
          break;
          case "remove":
            ifargstruedothis=10
          break;
          case "resume":
            ifargstruedothis=11
          break;
          case "search":
            ifargstruedothis=12
          break;
          case "shuffle":
            ifargstruedothis=13
          break;
          case "skip":
            ifargstruedothis=14
          break;
          case "skipto":
            ifargstruedothis=15
          break;
          case "stop":
            ifargstruedothis=16
          break;
          case "volume":
            ifargstruedothis=17
          break;
          case "help":
            ifargstruedothis=18
          break;    
          case "invite":
            ifargstruedothis=19
          break;
          case "ping":
            ifargstruedothis=20
          break;
          case "prefix":
            ifargstruedothis=21
          break;
          case "uptime":
            ifargstruedothis=22
          break;
          case "botlist":
            ifargstruedothis=23
          break;
          default:        
            commands.forEach((cmd) => {
              helpEmbed.addField(
                `**${message.client.prefix}${cmd.name}**`,
                `${cmd.description}`,
                true
              );
            });
          if(!message.guild) {
            if(!args[0]) {message.react(approveemoji);return message.channel.send(helpEmbed);}
            return
            }
            message.channel.send(helpEmbed);
           
        break;
       }
     
       if(ifargstruedothis>=0){
         let aliases = commands[ifargstruedothis].aliases;
         if(aliases === undefined || !aliases) aliases="No Aliases!";
         let cooldown = commands[ifargstruedothis].cooldown;
         if(cooldown === undefined || !cooldown) cooldown="No Cooldown!";


        helpEmbed.addField(
          `**${message.client.prefix}${commands[ifargstruedothis].name}**`,
          `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
        );
        helpEmbed.addField(
          `**:notes: Aliases:**`,
          `\`${aliases}\``
        );
        helpEmbed.addField(
          `**:wrench: Cooldown:**`,
          `\`${cooldown}\``
        );
        if(!message.guild) return message.channel.send(helpEmbed);
          message.channel.send(helpEmbed);
       }

}
}