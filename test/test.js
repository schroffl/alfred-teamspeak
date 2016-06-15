'use strict';

const Alfred = require('../index');

const bot = new Alfred();

bot.login('username', 'password')
	.then(() => bot.send('servernotifyregister', { 'event': 'server' }))
	.then(() => bot.send('servernotifyregister', { 'event': 'textserver' }))
	.then(() => console.log('Connected with clid', bot.get('clid')))
	.catch(console.error);

bot.use(Alfred.User);

bot.on('cliententerview', data =>
	console.log(data.user.get('name'), 'connected', '[db:' + data.user.get('dbid') + ']') );

bot.on('clientleftview', data => 
	console.log(data.user.get('name'), 'disconnected') );

bot.on('textmessage', data =>
	data.user.poke(data.msg) );