# Alfred [![npm version](https://badge.fury.io/js/alfred-teamspeak.svg)](https://badge.fury.io/js/alfred-teamspeak)
A Teamspeak 3 Bot Module utilizing the [Teamspeak ServerQuery](http://forum.teamspeak.com/threads/91465-How-to-use-the-Server-Query)

## Installation
```javascript
$ npm install alfred-teamspeak
```

## Example
```javascript
const Alfred = require('alfred-teamspeak');
const bot = new Alfred();

bot.login('username', 'password')
	.then(() => console.log('Connected!'))
    .catch(err => console.error(err));
    
bot.on('cliententerview', data => console.log(data.client_nickname, 'connected!'));
```

## <a name="options"></a>Options
Options are passed via an object on construction: `new Alfred({ ... })`

| Name | Default     | Description                  |
| ---- | ----------- | ---------------------------- |
| name | `Alfred`    | The name of the bot          |
| host | `127.0.0.1` | The IP to connect            |
| port | `10011`     | The query port of the server |
| sid  | `1`         | The ID of the Virtual Server |

## <a name="methods"></a>Methods

#### <a name="method-login"></a>Alfred.login(username, password)
Login with the specified name and password.
Returns a promise which is being resolved on successful login and rejected on failure.

#### <a name="method-send"></a>Alfred.send( ... )
Inherited from [schroffl/teamspeak-query](https://github.com/schroffl/teamspeak-query).

#### <a name="method-set"></a>Alfred.set(key, value)
Set a variable.

#### <a name="method-get"></a>Alfred.get(key)
Get the value of a variable.  
**NOTE:** After the login you can use `Alfred.get('clid')` to obtain the ID of the bot.

#### <a name="method-use"></a>Alfred.use(*event*, callback)
Mount the specified callback function to the given event.
If *event* is omitted, the handler will be called for any event.

## Middleware
As already said, middleware can be mounted via `Alfred.use` and may or may not only be used for a specific event such as `cliententerview`.  
Whenever an event occurs, the stack for it will be called with the data the server has given. After the stack has finished, the event will be emitted. So `Alfred.on('cliententerview', ...)` will be fired when all the middleware has processed the data.  
If you want to create your own middleware, take a look at [Creating Middleware](docs/MIDDLEWARE.md).  
An example can be found here: [lib/user.js](lib/user.js)

## User Middleware
Alfred already ships with a package that offers an interface to easily interact with users. 
You can include like this:
```javascript
const Alfred = require('alfred-teamspeak');
const User = Alfred.User;

const bot = new Alfred();

bot.use(User);
// [...]
```
So now if anyting user-related happens, you can respond to the users as easy as:
```javascript
bot.on('cliententerview', data => data.user.respond('Hello', data.user.get('name')) );
```

Further documentation of the package can be found :
- [User Docs](docs/USER.md).
- [Builder Docs](docs/BUILDER.md).

