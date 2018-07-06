'use strict';

const TeamspeakQuery = require('teamspeak-query');
const EventedStack = require('./stack');

class Alfred extends EventedStack {

    /**
     * A Teamspeak 3 Bot Library
     *
     * @author     schroffl
     * @class
     *
     * @param      {Object}  config  Basic configuration of the bot
     */
    constructor(config) {
        super();

        this._globals = new Map();
        this._config = Object.assign({
            'name': 'Alfred',
            'host': '127.0.0.1',
            'port': 10011,
            'sid': 1
        }, config);

        this.query = new TeamspeakQuery(this._config.host, this._config.port);
        this.send = this.query.send.bind(this.query);
        this.permissionsList = new Map();
    }

    /**
     * Connect to the server and authenticate
     *
     * @author     schroffl
     *
     * @param      {String}   username  The username
     * @param      {String}   password  The password
     * @return     {Promise}  A promise that resolves on successful login and
     *                        rejects if any command fails
     */
    login(username, password) {
        return new Promise((resolve, reject) => {

            const config = this._config,
                query = this.query;

            query.onAny(this.run.bind(this));

            query.send('login', { 'client_login_name': username, 'client_login_password': password })
                .then(() => query.send('use', { 'sid': config.sid }))
                .then(() => query.send('clientupdate', { 'client_nickname': config.name }))
                .then(() => query.send('whoami'))
                .then(res => this.set('clid', res.client_id))
                .then(() => {
                    this.query.send("permissionlist").then(res => {
                        let permids = res.permid;
                        let permnames = res.permname;
                        for (let index = 0; index < permids.length; index++) {
                            const permid = permids[index];
                            const permname = permnames[index];
                            this.permissionsList[permname] = permid;
                        }
                    }).catch(console.error);
                })
                .then(resolve).catch(reject);
        });
    }

    /**
     * Set a value
     *
     * @author     	schroffl
     *
     * @param 		{String}	key     The key of the value
     * @param 		{*}			value   The value itself
     */
    set(key, value) {
        this._globals.set.apply(this._globals, Array.from(arguments));
    }

    /**
     * Get a value
     *
     * @author 		schroffl
     * 
     * @param 		{String}	key 	The key of the value
     * @return 		{*} 		The value of the key or 'undefined' if the key does not exist
     */
    get(key) {
        return this._globals.get.apply(this._globals, Array.from(arguments));
    }

    /**
     * Disconnect the bot from the connection.
     * 
     * @author 		iHDeveloper
     */
    disconnect() {
        let clid = this.get("clid");
        if (clid == null) return;
        this.query.send("logout").then(() => {
            this.query.send("quit").then(() => {
                console.log("Closing the process in 1 second...");
                setTimeout(() => {
                    process.exit(0);
                }, 1000);
            }).catch(console.error);
        }).catch(console.error);
    }

    /**
     * Manage server group in the bot server.
     * 
     * @author      iHDeveloper
     */
    serverGroup() {
        let object = {
            query: this.query,
            bot: this,

            /**
             * Add client into server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The server group id to add client into it.
             * @param       cldbid The client database id to find it.
             * @return      {Promise} A promise resolves when the client added
             *                        reject when the client didn't add into the server group.
             */
            addClient: function(sgid, cldbid) {
                return this.query.send("servergroupaddclient", { 'sgid': sgid, 'cldbid': cldbid });
            },

            /**
             * Create a server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       name The name of the new server group.
             * @return      {Promise} A promise resolves when the server group created
             *                        rejected when the server group didn't create.
             */
            add: function(name) {
                return this.query.send("servergroupadd", { 'name': name });
            },

            /**
             * Add/Set a permission into the server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The server groupd id.
             * @param       pername the permission name.
             * @param       permvalue the value of the permission.
             * @param       permnegated the negate of the permission.
             * @param       permskip the skip of the permission.
             * @return      {Promise} A promise resolves when the permission added into the server group
             *                        rejected when the permission didn't added to the server group.
             */
            addPermission: function(sgid, permname, permvalue, permnegated, permskip) {
                if (sgid == null) throw new Error("Servergroup ID not found");
                if (permvalue == null) permvalue = 0;
                if (permnegated == null) permnegated = 0;
                if (permskip == null) permskip = 0;
                if (permname == null) throw new Error("permission name not found");
                let permid = this.bot.permissionsList[permname];
                if (permid == null) throw new Error("Permission id not found by Permission name");
                return this.query.send("servergroupaddperm", {
                    'sgid': sgid,
                    'permid': permid,
                    'permvalue': permvalue,
                    'permnegated': permnegated,
                    'permskip': permskip,
                });
            },

            /**
             * Get Clients list of the server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The server group id to get clients list of it.
             * @return      {Promise} A promise resolves when the clients list successfully got
             *                        reject when there's an error happend.
             */
            clientList: function(sgid) {
                if (sgid == null) throw new Error("Servergroup ID not found");
                return this.query.send("servergroupclientlist", { 'sgid': sgid });
            },

            /**
             * Copy or Create from another server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       ssgid The server group who you will copy from it.
             * @param       tsgid The target of the server group if set to 0 then it will create new one.
             * @param       name The name of the server group.
             * @param       type Default is 1. It can be used to create ServerQuery and template groups.
             * @return      {Promise} A promise that resolves if the servergroup created
             *                        and rejected if the failed to copy that servergroup .
             */
            copy: function(ssgid, tsgid, name, type) {
                if (tsgid == null) tsgid = 0;
                if (ssgid == null) throw new Error("Servergroup not found");
                if (type == null) type = 1;
                return this.query.send("servergroupcopy", {
                    'ssgid': ssgid,
                    'tsgid': tsgid,
                    'name': name,
                    'type': type
                });
            },

            /**
             * Delete client from the server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The ID of the server group.
             * @param       cldbid The client database id.
             * @return      {Promise} A promise resolves when the client deleted from the server group
             *                        rejected when the client didn't delete the server group from it.
             */
            deleteClient: function(sgid, cldbid) {
                return this.query.send("servergroupdelclient", { 'sgid': sgid, 'cldbid': cldbid });
            },

            /**
             * Delete the server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The id of server group.
             * @param       force if true then the server group will be removed even if there are clients on it.
             * @return      {Promise} A promise resolves when the server group removed
             *                        rejected when there's error happend.
             */
            delete: function(sgid, force) {
                if (sgid == null) throw new Error("Servergroup ID not found");
                if (force == null) force = false;
                return this.query.send("servergroupdel", {
                    'sgid': sgid,
                    'force': force ? 1 : 0
                });
            },

            /**
             * Delete permissions from server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The ID of the server group,
             * @param       perms You can make one permission name or many in array.
             * @return     {Promise} A promise resolves when the permissions deleted from the server group
             *                        rejected when the permissions didn't remove from the server group.
             */
            deletePermissions: function(sgid, perms) {
                if (sgid == null) throw new Error("Servergroup ID not found!");
                if (perms == null) throw new Error("Permissions not found to delete them");
                return this.query.send("servergroupdelperm", {
                    'sgid': sgid,
                    'permid': perms,
                });
            },

            /**
             * List of all server groups.
             * 
             * @author      iHDeveloper
             * 
             * @return      {Promise} A promise resolves when the server groups successfully receieved
             *                        rejected when the server groups didn't received.
             */
            list: function() {
                return this.query.send("servergrouplist");
            },

            /**
             * Permissions List of a server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The ID of server group.
             * @return      {Promise} A promise resolves when the list successfully received
             *                        rejected when the list didn't received.
             */
            permissionsList: function(sgid) {
                if (sgid == null) throw new Error("Servergroup ID not found");
                return this.query.send("servergrouppermlist", {
                    'sgid': sgid,
                });
            },

            /**
             * Rename a server group.
             * 
             * @author      iHDeveloper
             * 
             * @param       sgid The ID of the server group.
             * @param       name The new name of the server group.
             * @return      {Promise} A promise resolves when the server group named
             *                        rejected when the server group didn't renamed.
             */
            rename: function(sgid, name) {
                if (sgid == null) throw new Error("Servergroup ID not found");
                if (name == null) throw new Error("New Name not found");
                return this.query.send("servergrouprename", {
                    'sgid': sgid,
                });
            }
        };
        return object;
    }
}

module.exports = Alfred;