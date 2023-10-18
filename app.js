const venom = require('venom-bot');
const fs = require('fs');

venom.create({
  session: 'tec-jovem'
}).then((client) => start(client)).catch((error) => {
  console.log(error);
});

function start(client) {
    client.onMessage(async (message) => {
      console.log('Mensagem recebida:', message.body);
      console.log('É uma mensagem de grupo:', message.isGroupMsg);
      console.log(message)
      console.log(client)
      console.log(message.sender.id)
  
      if (message.isGroupMsg) {
        const blacklistNumbers = fs.readFileSync('blacklist.txt', 'utf-8').split('\n');
        console.log('Números na lista negra:', blacklistNumbers);
  
        if (blacklistNumbers.includes(message.sender.id)) {
          console.log('Remetente está na lista negra. Removendo...');

          console.log(typeof(message.chatId), message.chatId)
          console.log(typeof(message.sender.id), message.sender.id)

          console.log(client.removeParticipant())

          await client.removeParticipant(message.chatId, message.sender.id)
        }
      }
    });
  }
  
