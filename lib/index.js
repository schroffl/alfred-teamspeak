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
		this._config = {
			'name': 'Alfred',
			'host': '127.0.0.1',
			'port': 10011,
			'sid': 1
		};

		for(const key in config)
			this._config[key] = config[key];	

		this.query = new TeamspeakQuery(this._config.host, this._config.port);
		this.send = this.query.send.bind(this.query);
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
}

module.exports = Alfred;