'use strict';

const ExecStack = require('exec-stack');
const teamspeak = require('node-teamspeak');
const async = require('async');

const events = { 'textmessage': 'message', 'cliententerview': 'join', 'clientleftview': 'leave' };

class Alfred extends ExecStack {

	/**
	 * A Teamspeak 3 Bot Framework
	 * 
	 * @author schroffl
	 * @extends exec-stack
	 * 
	 * @param {Object} [config] - Basic configuration of the bot
	 *
	 * @constructor
	 */

	constructor(config) {
		super();

		this._globals = new Map();
		this._config = {
			'name': 'Alfred',
			'host': '127.0.0.1',
			'port': 10011,
			'loginName': 'serveradmin',
			'loginPass': 'changeme',
			'sid': 1
		};

		for(const key in config)
			this._config[key] = config[key];	
	}

	/**
	 * Connect to the teamspeak and walk through the login process
	 * 
	 * @author schroffl 
	 *
	 * @returns {Promise} A promise that resolves on successful login and rejects if any command fails
	 */

	login() {
		return new Promise((resolve, reject) => {

			const config = this._config,
				  ts = this._teamspeak = new teamspeak(config.host, config.port)
				  this.send = ts.send.bind(ts);

			for(const event in events)
				ts.on(event, res => this.run(events[event], res));

			async.series([
				callback =>
					// Login with the specified name and password
					ts.send('login', { 'client_login_name': config.loginName, 'client_login_password': config.loginPass }, err => callback(err)),
				callback =>
					// Tell Teamspeak what Virtual Server shall be used
					ts.send('use', { 'sid': config.sid }, err => callback(err)),
				callback => {
					// Get the client id
					ts.send('whoami', null, (err, res) => {
						if(!err) this.set('clid', res.client_id);
						callback(err);
					});
				},
				callback => 
					// Update the nickname
					ts.send('clientupdate', { 'client_nickname': config.name }, err => callback(err)),
			], err => {
				// If any errors were encountered reject the promise ...
				if(err) reject(err);
				// ... otherwise call 'login' and resolve the promise
				else this.run('login', this).then(resolve);
			});
		});		
	}

	/**
	 * Set a value
	 * 
	 * @param key - The key of the value
	 * @param value - The actual value
	 *
	 * @author schroffl 
	 */

	set() {
		this._globals.set.apply(this._globals, Array.from(arguments));
	}

	/**
	 * Get a value
	 * 
	 * @param key - The key of the value
	 *
	 * @author schroffl
	 *
	 * @returns The value of the key or 'undefined' if not found
	 */

	get() {
		return this._globals.get.apply(this._globals, Array.from(arguments));
	}
}

module.exports = Alfred;