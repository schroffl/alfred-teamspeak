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
let toBold = "Hello World ";
let toUnderlineIt = "I'm using builder.";
let message;
message = Builder.bold(toBold + Builder.underline(toUnderlineIt));
message = Builder.italic(message);
user.respond(message); // send the message to the user
```

## URL Usage
Send a url message to the client.
```javascript
let url = "https://github.com/schroffl/alfred-teamspeak";
let text = "Github";
let message = Builder.url(url, text);
user.respond(message);
```

## Client Usage
Send a message with client data
```javascript
let clid = user.get("clid");
let uid = user.get("uid");
let name = user.get("name");
let message = Builder.client(clid, uid, name);
user.respond(message);
```

## Color Usage
Color a message and send it to the client.
```javascript
let hex = "ff0000";
let text = "I'm in red";
let message = Builder.color(hex, text);
user.respond(message);
```

**NOTE:** More functionality will follow in the future.
