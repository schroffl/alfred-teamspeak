# User Interaction via `Alfred.User`
This package exposes an interface to easily interact with users like respond to, poke or even kick them.

## Usage
```javascript
const Alfred = require('Alfred');
const User = Alfred.User;

const bot = new Alfred();

// Mount the middleware
bot.use(User);
```

Now whenever an event is fired and the middleware has wrapped all the data, you can interact with the user like this:
```javascript
// This will poke the user with whatever he wrote
bot.on('textmessage', data => data.user.poke(data.msg));
```

## Properties
Basic information like his ID or his name can be obtained via `User.get` and any other, more detailed information via `User.detail.get`.

## Methods

#### User.getInfo( )
Obtains all the information about the user via the `clientinfo` command.
Returns a promise that resolves with the data.

#### User.respond( ... )
Sends a text message to the user. Any arguments given will be concatenated.

#### User.poke( ... )
Pokes a user. Arguments are handled the same way as with `User.respond`.

#### User.move( channelid )
Moves the user into the specified channel.

#### User.kick( *msg*, *type* )
*msg* is the optional kick message. When *type* is set to `channel`, the user will only get kicked out of his current channel.

**NOTE:** More functionality will follow in the future.