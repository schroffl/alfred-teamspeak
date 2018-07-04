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
    data.user.respond(Builder.bold("Hello world! " + Builder.underline("It's me " + Builder.italic("#HD"))));
    let clid = data.user.get("clid");
    let uid = data.user.get("uid");
    let name = data.user.get("name");
    data.user.respond(Builder.url("https://www.google.com", "Click here to open google"));
    data.user.respond(Builder.color("ff0000", "I'm in red color."));
    data.user.poke(Builder.client(clid, uid, name));
});
