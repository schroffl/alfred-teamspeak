# Server Group Manager
This package exposes an interface to easily manage the server groups from your bot.

## Usage
```javascript
const Alfred = require('alfred-teamspeak');
const bot = new Bot();
// TODO connect to the server and etc..

bot.serverGroup().list().then(res => {
    let sgids = res.sgid;
    let names = res.name;
    for (let index = 0; index < sgids.length; index++) {
        const sgid = sgids[index];
        const name = names[index];
        data.user.respond(`${(index+1)}: Id> ${sgid} Name> ${name}`);
    }
}).catch(console.error);
```

## Methods
### Add client into the server group
- `sgid` The id of the server group.
- `cldbid` the client database id.
```javascript
bot.serverGroup().addClient(sgid, cldbid).then(res => {

}).catch(console.error);
```
### Create servergroup with name
- `name` the name of the server group.
```javascript
bot.serverGroup().add(name).then(res => {

}).catch(console.error);
```
### Add permission to the server group
- `sgid` The id of the server group.
- `permname` The name of the permission.
- `permvalue` The value of the permission.
- `permnegated` The negated of the permission.
- `permskip` The skip of the permission.
```javascript
bot.serverGroup().addPermission(sgid, permname, permvalue, permnegated, permskip).then(res => {

}).catch(console.error);
```
### Get clients list of the server group
- `sgid` The id of the server group.
```javascript
bot.serverGroup().clientList(sgid).then(res => {

}).catch(console.error);
```
### Copy server group
- `ssgid` The id of the server group which will copy it.
- `tsgid` The target of the server group (`null` to create new one)
- `name` The name of the new server group which got copy.
- `type` Default is 1. It can be used to create ServerQuery and template groups.
```javascript
bot.serverGroup().copy(ssgid, tsgid, name, type).then(res => {

}).catch(console.error);
```
### Delete client from server group
- `sgid` The id of the server group.
- `cldbid` The client database id.
```javascript
bot.serverGroup().deleteClient(sgid, cldbid).then(res => {

}).catch(console.error);
```
### Delete server group
- `sgid` The id of the server group.
- `force` If true then it will delete the server group even if there's clients into it.
```javascript
bot.serverGroup().delete(sgid, force).then(res => {

}).catch(console.error);
```
### Delete permissions from server group
- `sgid` The id of th server group.
- `perms` An array of the permissions to remove.
```javascript
bot.serverGroup().deletePermissions(sgid, perms).then(res => {

}).catch(console.error);
```
### A list of all server groups
```javascript
bot.serverGroup().list().then(res => {

}).catch(console.error);
```
### A permissions list of server group
- `sgid` The id of the server group.
```javascript
bot.serverGroup().permissionsList(sgid).then(res => {

}).catch(console.error);
```
### Rename server group
- `sgid` The id of the server group.
- `name` The new name of the server group.
```javascript
bot.serverGroup().rename(sgid, name).then(res => {

}).catch(console.error);
```

## User Usage

### Add Server Group using User
- `sgid` The id of the server group
```javascript
user.server().addGroup(sgid).then(() => {

}).catch(console.error);
```
### Remove Server Group using User
- `sgid` The id of the server group
```javascript
user.server().deleteGroup(sgid).then(() => {

}).catch(console.error);
```