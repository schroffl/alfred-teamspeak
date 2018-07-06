'use strict';

const util = require('util')
const rename = {
    'client_unique_identifier': 'uid',
    'client_database_id': 'dbid',
    'client_nickname': 'name',
    'client_status': 'status',
    'clid': 'clid',
    'cid': 'cid',
    'invokerid': 'clid',
    'invokername': 'name',
    'invokeruid': 'uid'
};

class User extends Map {

    /**
     * Wrapper to ease the process of interacting with users
     *
     * @author     schroffl
     *
     * @param      {Object}  data    Data containing information about the
     *                               user
     *
     * @class
     */
    constructor(data) {
        super();

        this.detail = new Map();

        for (const prop in data) {
            if (prop in rename)
                this.set(rename[prop], data[prop]);
            else
                this.detail.set(prop, data[prop]);
        }
    }
}

module.exports = function(event, data, next) {
    let user = data.user = new User(data),
        clid = data.user.get('clid'),
        bot = this;

    /**
     * Gets all the information about the user
     */
    user.getInfo = () => this.send('clientinfo', { clid });

    /**
     * Respond to the user via a text message
     */
    user.respond = function() {
        bot.send('sendtextmessage', {
            'targetmode': 1,
            'target': clid,
            'msg': Array.from(arguments).join(' ')
        });
    };

    /**
     * Poke the user
     */
    user.poke = function() {
        bot.send('clientpoke', {
            clid,
            'msg': Array.from(arguments).join(' ')
        });
    };

    /**
     * Move the user
     *
     * @param      {Number}  cid     The channel id
     */
    user.move = cid => this.send('clientmove', { clid, cid });


    /**
     * Kick the user
     *
     * @param      {String}  msg     A kick message
     * @param      {String}  type    When its value is 'channel', the user
     *                               only get kicked out of his current
     *                               channel
     */
    user.kick = (msg, type) => this.send('clientkick', { clid, 'reasonid': type === 'channel' ? 4 : 5, 'reasonmsg': msg });

    user.server = () => {
        let object = {
            client: this,
            bot: bot,
            clid: clid,
            getDBID: function() {
                return new Promise((resolve, reject) => {
                    let cldid = this.client.get("dbid");
                    if (cldid == null) {
                        this.client.send("clientinfo", {
                                'clid': this.clid,
                            })
                            .then(res => {
                                this.client.set("dbid", res.client_database_id);
                            })
                            .then(resolve)
                            .catch(reject)
                    }
                });
            },
            addGroup: function(sgid) {
                return new Promise((resolve, reject) => {
                    this.getDBID().then(() => bot.serverGroup().addClient(sgid, this.client.get("dbid")))
                        .then(resolve)
                        .catch(reject);
                });
            },
            deleteGroup: function(sgid) {
                return new Promise((resolve, reject) => {
                    this.getDBID().then(() => bot.serverGroup().deleteClient(sgid, this.client.get("dbid")))
                        .then(resolve)
                        .catch(reject);
                });
            }
        };
        return object;
    };

    next();
}
