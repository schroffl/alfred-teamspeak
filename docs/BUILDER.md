# Builder with format
This package exposes an interface to easily send messages with format like bold, underline, italic, client, url and color.

## Usage
```javascript
const Alfred = require('Alfred');
const Builder = Alfred.Builder;

// NOTE: it will apply it only in teamspeak.
// We don't recommended using this in the console.
console.log(Builder.bold("Hello World!"));
```

# Bold / Underline / Italic Usage
Send a message with format to the client.
```javascript
var toBold = "Hello World ";
var toUnderlineIt = "I'm using builder.";
var message;
message = Builder.bold(toBold + Builder.underline(toUnderlineIt));
message = Builder.italic(message);
user.respond(message); // send the message to the user
```

## URL Usage
Send a url message to the client.
```javascript
var url = "https://github.com/schroffl/alfred-teamspeak";
var text = "Github";
var message = Builder.url(url, text);
```

## Client Usage
Send a message with client data
```javascript
var clid = user.get("clid");
var uid = user.get("uid");
var name = user.get("name");
var message = Builder.client(clid, uid, name);
```

## Color Usage
Color a message and send it to the client.
```javascript
var hex = "ff0000";
var text = "I'm in red";
var message = Builder.color(hex, text);
user.respond(message);
```

**NOTE:** More functionality will follow in the future.