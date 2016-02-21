'use strict';

const util = require('util')

const events = ['join', 'message'];
const properties = {
	'filter': [
		'connection_bandwidth_received_last_minute_total',
		'connection_bandwidth_received_last_second_total',
		'connection_bandwidth_sent_last_minute_total',
		'connection_bandwidth_sent_last_second_total',
		'connection_bandwidth_sent_last_minute_total',
		'connection_bytes_received_total',
		'connection_bytes_sent_total',
		'connection_packets_received_total',
		'connection_packets_sent_total',
		'connection_filetransfer_bandwidth_received',
		'connection_filetransfer_bandwidth_sent',
		'client_badges',
		'client_country',
		'client_is_channel_commander',
		'client_created',
		'client_flag_avatar',
		'client_talk_request_msg',
		'client_talk_request',
		'client_lastconnected',
		'client_totalconnections',
		'client_version_sign',
		'client_away_message',
		'client_security_hash',
		'client_meta_data',
		'client_version',
		'client_needed_serverquery_view_power',
		'client_nickname_phonetic',
		'client_is_priority_speaker',
		'client_month_bytes_uploaded',
		'client_month_bytes_downloaded',
		'client_total_bytes_uploaded',
		'client_total_bytes_downloaded',
		'client_default_token',
		'client_base64HashClientUID',
		'client_default_channel',
		'client_icon_id',
		'targetmode',
		'msg',
		'client_login_name',
		'client_platform',
		'client_input_muted',
		'client_output_muted',
		'client_outputonly_muted',
		'client_input_hardware',
		'client_output_hardware',
		'client_is_recording',
		'client_channel_group_id',
		'client_servergroups',
		'client_away',
		'client_is_talker',
		'client_type',
		'client_channel_group_inherited_channel_id',
		'connection_client_ip',
		'client_idle_time',
		'client_talk_power',
		'client_description',
		'connection_connected_time'
	],
	'rename': {
		'client_unique_identifier': 'uid',
		'client_database_id': 'dbid',
		'client_nickname': 'name',
		'client_status': 'status',
		'clid': 'clid',
		'cid': 'cid',
		'invokerid': 'clid',
		'invokername': 'name',
		'invokeruid': 'uid'
	}
};

let alfred;

class User {

	/**
	 * Wrapper to ease the process of interacting with users
	 * 
	 * @author schroffl
	 * 
	 * @param {Object} data - Data containing information about the user
	 *
	 * @constructor
	 */

	constructor(data) {
		this.detail = {};

		for(const prop in data) {
			if(!!~properties.filter.indexOf(prop)) 
				// You shall not pass!
				this.detail[prop] = data[prop];
			else if(properties.rename.hasOwnProperty(prop))
				this[properties.rename[prop]] = data[prop];
		}
	}

	/**
	 * Respond to a user via 'sendtextmessage'
	 * 
	 * @author schroffl
	 * 
	 * @param {...*} message - Concatenated via whitespace
	 */

	respond() {
		const args = Array.from(arguments);

		for(let i=0; i<args.length; i++)
			if(typeof args[i] === 'object') args[i] = util.inspect(args[i]);

		alfred.send('sendtextmessage', { 'targetmode': 1, 'target': this.clid, 'msg': args.join(' ') });
	}

	/**
	 * Poke a user via 'clientpoke'
	 * 
	 * @author schroffl
	 * 
	 * @param {...*} message - Concatenated via whitespace
	 */

	poke() {
		const args = Array.from(arguments);

		for(let i=0; i<args.length; i++)
			if(typeof args[i] === 'object') args[i] = util.inspect(args[i]);

		alfred.send('clientpoke', { 'clid': this.clid, 'msg': args.join(' ') });
	}

	/**
	 * Poke a user via 'clientpoke'
	 * 
	 * @author schroffl
	 * 
	 * @param {Number} channelid - The channel to move the client into
	 */

	move(cid) {
		alfred.send('clientmove', { 'clid': this.clid, cid });
	}
}

module.exports = function() {
	const args = Array.from(arguments),
		  event = args.shift(),
		  next = args.pop();

	switch(event) {
		case 'login':
			alfred = args[0];
			break;

		default:
			if(!!~events.indexOf(event))
				args[0].user = new User(args[0]);
	}

	next();
}