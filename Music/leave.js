module.exports = { 
    name: "leave", 
    description: "讓果滾蛋", 
    execute(message) {
         const { channel } = message.member.voice; 
         const serverQueue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("你不再房間內 那你要我去哪?").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("我不在房間裡 哪裡也去不了").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("已經有老闆聘請我了 我不需要你了!").catch(console.error); 
         if(serverQueue) { 
             serverQueue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
             serverQueue.textChannel.send('我很SAD 你要我滾出你的房間 😭').catch(console.error); 
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id); 
    message.channel.send('我很SAD 你要我滾出你的房間 😭').catch(console.error); } };