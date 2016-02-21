'use strict';

const Alfred = require('./lib/index');
const User = require('./lib/user');

module.exports = class AlfredComplete extends Alfred {

	constructor(options) {
		super(options);
		
		this.use(this.user = User);
	}
}

module.exports.Base = Alfred;