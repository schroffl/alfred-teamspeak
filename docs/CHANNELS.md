# Channels Manager
This package exposes an interface to easily manage the channels from your bot.

## Usage
```javascript
const Alfred = require('alfred-teamspeak');
const Builder = Alfred.Builder;
const bot = new Bot();
// TODO connect to the server and etc..

bot.channel().list().then(channels => {
    for (let id in channels) {
        let channel = channels[id];
        var id = channel.cid;
        var name = channel.name;
        var clientscount = channel.clientscount;
        // do anything with them
    }
}).catch(console.error);
```

## Methods
### Channel list
```javascript
bot.channel().list().then(channels => {
    var channel = channels[0];
    console.log(channel.cid);                   // output: channel id
    console.log(channel.name);                  // output: channel name
    console.log(channel.order);                 // output: channel order
    console.log(channel.clientscount);          // output: channel clientscount
    console.log(channel.subscribePower);        // output: channel subscribePower
}).catch(console.error);
```
### Channel Info
- `cid` the id of the channel info.
```javascript
bot.channel().info(cid).then(channel => {
    console.log(channel.cid);                                // output: channel_id
    console.log(channel.name);                               // output: channel_name
    console.log(channel.topic);                              // output: channel_topic
    console.log(channel.description);                        // output: channel_description
    console.log(channel.password);                           // output: channel_password
    console.log(channel.codec.default);                      // output: channel_codec
    console.log(channel.codec.quailty);                      // output: channel_codec_quality
    console.log(channel.maxclients);                         // output: channel_maxclients
    console.log(channel.maxFamilyClients);                   // output: channel_maxfamilyclients
    console.log(channel.order);                              // output: channel_order
    console.log(channel.flag.parmanet);                      // output: channel_flag_parmanet
    console.log(channel.flag.semiParmanet);                  // output: channel_flag_semi_parmanet
    console.log(channel.flag.temporary);                     // output: channel_flag_temporary
    console.log(channel.flag.default);                       // output: channel_flag_default
    console.log(channel.flag.maxclients.unlimited);          // output: channel_flag_maxclients_unlimited
    console.log(channel.flag.maxclients.inherited);          // output: channel_flag_maxclients_inherited
    console.log(channel.neededTalkPower);                    // output: channel_needed_talk_power
    console.log(channel.phonetic);                           // output: channel_name_phonetic
    console.log(channel.icon);                               // output: channel_icon_id
    console.log(channel.parent);                             // output: cpid
}).catch(console.error);
```
### Move Channel
- `id` The id of channel.
- `parentid` The id of the parent channel.
- `order` The sort order. Default is 0
```javascript
bot.channel().move(id, parentid, order).then(() => {
    // On channel moved successfully
}).catch(console.error);
```
### Channel Create
- `name` The name of the channel.
- `channel` The channel properties
```javascript
bot.channel().create(name, { // aka channel
    topic: "Channel_Topic",
    description: "Channel_Description",
    password: "Channel_Password",
    maxclients: 64
    flag: {
        permanent: 1,
        semiPermanent: 0,
        temporary: 0,
    },
    neededTalkPower: 10
}).then(channel => {
    let id = channel.cid;
    data.user.respond(Builder.bold(`channel created with id ${id}`));
}).catch(console.error);
```
### Channel delete
- `cid` The id of the server group which will copy it.
- `force` If true then the server will delete channel even with clients on it.
```javascript
bot.channel().delete(cid, force).then(() => {
    // On successfully deleted the channel
}).catch(console.error);
```
### Channel edit
- `cid` The channel id.
- `channel` The channel properties.
```javascript
bot.channel().edit(cid, { // aka channel
    name: "Channel_name",
    topic: "Channel_topic",
    description: "Channel_description",
    password: "Channel_passowrd",
    // other channel properties to edit etc...
}).then(() => {
    // On successfully channel edited
}).catch(console.error);
```
