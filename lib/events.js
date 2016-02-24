/**
 * This file contains events to subscribe to
 * as well as nice names mapped to those events
 *
 * @see [Event list]{@link http://yat.qa/ressourcen/server-query-notify/}
 */

 'use strict';

 module.exports = {
 	'cliententerview': 'join', 
 	'clientleftview': 'leave',
 	'textmessage': 'message',
 	'clientmoved': 'moved',
 	'serveredited': null,
 	'channelchanged': null,
 	'channelmoved': null,
 	'channelcreated': null,
 	'channeldeleted': null,
 	'tokenused': null
 };

 for(const key in module.exports)
 	if(module.exports[key] === null) module.exports[key] = key;