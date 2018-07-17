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

let temp_channel = -1;
bot.on('textmessage', data => {
    let clid = data.user.get("clid");
    if (clid == bot.get("clid")) return; // ignore messages from the self bot
    let msg = "" + data.msg;
    if (msg.startsWith("!exit")) {
        bot.disconnect();
        console.log("disconnected");
    }
    if (msg.startsWith("!clientslist")) {
        bot.clientsList().then(users => {
            data.user.respond("Clients list: -");
            for (const user of users) {
                data.user.respond(">>" + new Alfred.Builder().empty().bold(user.name));
            }
        }).catch(console.error);
    }
    if (msg.startsWith("!kickserver")) {
        data.user.serverKick(Builder.underline("Bye from the server!"));
    }
    if (msg.startsWith("!kickchannel")) {
        data.user.channelKick(Builder.italic("bye have great day!"));
    }
    if (msg.startsWith("!sgadd")) {
        let clid = data.user.get("clid");
        bot.query.send("clientinfo", { clid }).then(res => {
            let cldbid = res["client_database_id"];
            bot.serverGroup().addClient(10, cldbid).then(() => {
                console.log(`Add Server Group`);
            }).catch(console.error);
        }).catch(console.error);
    }
    if (msg.startsWith("!sgdel")) {
        let clid = data.user.get("clid");
        bot.query.send("clientinfo", { clid }).then(res => {
            let cldbid = res["client_database_id"];
            bot.serverGroup().deleteClient(10, cldbid).then(() => {
                console.log(`Removed Server Group`);
            }).catch(console.error);
        }).catch(console.error);
    }
    if (msg.startsWith("!makemeup")) {
        bot.serverGroup().addPermission(10, "i_client_talk_power", 100, 0, 0).then(() => {
            data.user.respond(Builder.bold("You are up!"));
        }).catch(console.error);
    }
    if (msg.startsWith("!fakevip")) {
        bot.serverGroup().copy(10, null, "Im a Fake VIP", null).then(() => {
            data.user.respond(Builder.underline("Created your fake vip!"));
        }).catch(console.error);
    }
    if (msg.startsWith("!removefake")) {
        bot.serverGroup().delete(11, 1).then(() => {
            data.user.respond(Builder.underline("Removed fake from your profile!"));
        }).catch(console.error);
    }
    if (msg.startsWith("!makemedown")) {
        bot.serverGroup().deletePermissions(10, "i_client_talk_power").then(() => {
            data.user.respond(Builder.italic("You are down!"));
        }).catch(console.error);
    }
    if (msg.startsWith("!rename")) {
        bot.serverGroup().rename(10, "New name!").then(() => {
            data.user.respond(Builder.bold("Renamed to new name!"));
        }).catch(console.error);
    }
    if (msg.startsWith("!list")) {
        bot.serverGroup().list().then(res => {
            let sgids = res.sgid;
            let names = res.name;
            for (let index = 0; index < sgids.length; index++) {
                const sgid = sgids[index];
                const name = names[index];
                data.user.respond(`${(index+1)}: Id> ${sgid} Name> ${name}`);
            }
        }).catch(console.error);
    }
    if (msg.startsWith("!normal")) {
        data.user.server().addGroup(7).then(() => {
            data.user.respond(Builder.bold("You are normal"));
        }).catch(console.error);
    }
    if (msg.startsWith("!notnormal")) {
        data.user.server().deleteGroup(7).then(() => {
            data.user.respond(Builder.italic("You aren't normal"));
        }).catch(console.error);
    }
    if (msg.startsWith("!channelcreate")) {
        bot.channel().create("Test", {
            topic: "Here's the topic",
            description: "Here's the description",
            password: "12345678",
            maxclients: 64,
            flag: {
                permanent: 1,
            },
            neededTalkPower: 10
        }).then(channel => {
            temp_channel = channel.cid;
            data.user.respond(Builder.bold("channel created"));
        }).catch(console.error);
    }
    if (msg.startsWith("!channeldelete")) {
        bot.channel().delete(temp_channel, true).then(() => {
            data.user.respond(Builder.bold("channel deleted"));
        }).catch(console.error);
    }
    if (msg.startsWith("!channeledit")) {
        bot.channel().edit(temp_channel, {
            name: "We edited you"
        }).then(() => {
            data.user.respond(Builder.bold("channel edited"));
        }).catch(console.error);
    }
    if (msg.startsWith("!channellist")) {
        bot.channel().list().then(channels => {
            let x = 0;
            for (let id in channels) {
                x++;
                let channel = channels[id];
                var message = Builder.bold(`#${Builder.italic(x)} | ID: ${Builder.italic(id)} | Name: ${Builder.italic(channel.name)} | Count: ${Builder.italic(channel.clientscount)}`);
                data.user.respond(message);
            }
        }).catch(console.error);
    }
    if (msg.startsWith("!channelinfo")) {
        console.log(temp_channel);
        bot.channel().info(temp_channel).then(channel => {
            data.user.respond(Builder.bold("channel info name : " + Builder.italic(channel.name)));
        }).catch(console.error);
    }
    if (msg.startsWith("!channelmove")) {
        bot.channel().move(834, 30, 0).then(() => {
            data.user.respond(Builder.bold("channel move"));
        }).catch(console.error);
    }
});
