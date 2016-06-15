'use strict';

const EventEmitter = require('eventemitter2');

class FunctionStack {

	/**
	 * Wrapper to call functions in series with a shared data object
	 */
	constructor() {
		this.stack = [ ];
	}

  	/**
  	 * Add a function to the stack
  	 *
  	 * @param      {Function}  callback  The function
  	 */
  	use(callback) {
    	this.stack.push(callback);
  	}

  	/**
  	 * Execute the stack
  	 *
  	 * @param      {Object}    data      The shared data
  	 * @param      {Function}  callback  The function to call after the stack has finished
  	 */
  	run(data, callback) {
  		let chain = [ ];

  		this.stack.forEach((fn, i) => 
			chain[i] = () => fn.call(this, data, chain[i + 1]) );

  		chain.push(() => typeof callback === 'function' ? callback.call(this, data) : null);

  		chain[0]();
  	}
}

class EventedStack extends EventEmitter {

	/**
	 * Wrapper to handle different stacks for multiple events
	 */
	constructor() {
		super();

		this.events = { };
		this.anyEvents = [ ];
	}

	/**
	 * Add a function to an events stack
	 *
	 * @param      {Strign}    event     The event
	 * @param      {Function}  callback  The function
	 */
	use(event, callback) {
		if(typeof event === 'string') {
			if(!this.events[event]) {
				this.events[event] = new FunctionStack();
				this.anyEvents.forEach(fn => 
					this.events[event].use( fn(event) ) );
			}

			this.events[event].use(callback);
		} else {
			callback = event;

			let pos = this.anyEvents.push(event => (data, next) => callback.call(this, event, data, next));

			for(let event in this.events)
				this.events[event].use( this.anyEvents[pos](event) );
		}
	}

	/**
	 * Execute the stack of a given event
	 *
	 * @param      {String}    event     The event
	 * @param      {Object}    data      The shared data
	 */
	run(event, data) {
		let callback = done => this.emit(event, done);

		if(event in this.events)
			this.events[event].run(data, callback);
		else {
			let chain = new FunctionStack();

			this.anyEvents.forEach(fn =>
				chain.use( fn(event) ) );

			chain.run(data, callback);
		}
	}
}

module.exports = EventedStack;