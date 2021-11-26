const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

const db = require('quick.db');


module.exports = {
  name: `prefix`,
  description: `設置服務器特定的前綴`,
  aliases: ["setprefix"],
  cooldown: 5,
  edesc: `輸入此命令可以設置特定於服務器的前綴！ 用法: ${PREFIX}prefix <NEW PREFIX>`,
 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    //react with approve emoji
    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`Current Prefix: \`${prefix}\``)
    .setFooter('Please provide a new prefix')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🚫 你沒有此命令的權限！`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`'❗ 前綴不能有兩個空格'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`✅ 成功將新前綴設置為 **\`${args[0]}\`**`))
  }
}