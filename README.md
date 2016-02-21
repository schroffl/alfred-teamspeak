# Alfred
A Teamspeak 3 Bot Framework utilizing the [Teamspeak ServerQuery](http://forum.teamspeak.com/threads/91465-How-to-use-the-Server-Query)

## Installation
```javascript
$ npm install alfred-teamspeak
```

## Example
```javascript
const Alfred = require('alfred-teamspeak');
```

```javascript
const bot = new Alfred({
	'loginName': 'serveradmin',
	'loginPass': 'changeme'
});

bot.login().then(() => {
	// Do your stuff
	console.log('Login!');
}).catch(err => {
	// Encountered an error during the login process
	console.error(err);
});
```

## <a name="options"></a>Options
Options are passed via an object on construction

#### <a name="option-name"></a>name *= Alfred*
The name of the bot

#### <a name="option-host"></a>host *= 127.0.0.1*
The host to connect to

#### <a name="option-port"></a>port *= 10011*
The port on which your Teamspeak Query is listening

#### <a name="option-login-name"></a>loginName *= serveradmin*
The name to login with

#### <a name="option-login-pass"></a>loginPass *= changme*
The password to login with

#### <a name="option-sid"></a>sid *= 1*
The Virtual Server ID

## <a name="methods"></a>Methods

#### <a name="method-login"></a>.login()
Login with the specified name and password.
Returns a promise which is being resolved on successful login and rejected on failure.

#### <a name="method-set"></a>.set(key, value)
Set a bot-wide variable.

#### <a name="method-get"></a>.get(key)
Get a bot-wide variable.

#### <a name="method-use"></a>.use(*event*, eventHandler)
Mount the specified eventHandler to the given event.
If *event* is omitted, the handler will be called for any event.
