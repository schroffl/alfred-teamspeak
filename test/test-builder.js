const Alfred = require('../index');
const Builder = Alfred.Builder;

const bot = new Alfred();

bot.login('username', 'password')
    .then(() => bot.send('servernotifyregister', { 'event': 'server' }))
    .then(() => bot.send('servernotifyregister', { 'event': 'textprivate' }))
    .then(() => console.log('Connected with clid', bot.get('clid')))
    .catch(console.error);

bot.use(Alfred.User);

bot.on('cliententerview', data => console.log(data.user.get('name'), 'connected', '[db:' + data.user.get('dbid') + ']'));

bot.on('clientleftview', data => console.log(data.user.get('name'), 'disconnected'));

bot.on('textmessage', data => {
    let msg = "" + data.msg;
    console.log(JSON.stringify(data));
    if (msg.startsWith("!exit")) {
        bot.disconnect();
        console.log("disconnected");
    }
    if (msg.startsWith("!kickserver")) {
        data.user.serverKick(Builder.underline("Bye from the server!"));
    }
    if (msg.startsWith("!kickchannel")) {
        data.user.channelKick(Builder.italic("bye have great day!"));
    }
});
