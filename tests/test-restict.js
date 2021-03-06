/*
 * Copyright (c) 2013, Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
var vows = require('vows'),
    assert = require('assert');

require('..');

var tests = {
    
    'testing restrict child_process methods': {
        topic: function () {
	    var self = this;
	    try {
		require('child_process').spawn('grep',['BLA', './*']);
	    } catch (e) {
		self.callback(null, {
		    'error': e
		});
	    }
	},
	'verify error': function (topic) {
	    assert.ok(topic.error !== null);
	}
    },
    'testing restrict kill method': {
        topic: function () {
	    var self = this;
	    try {
		process.kill(30);
	    } catch (e) {
		self.callback(null, {
		    'error': e
		});
	    }
	},
	'verify error': function (topic) {
	    assert.ok(topic.error !== null);
	}
    },
    'testing restrict process_wrap method': {
        topic: function () {
	    var self = this;
	    try {
		process.binding('process_wrap');
	    } catch (e) {
		self.callback(null, {
		    'error': e
		});
	    }
	},
	'verify error': function (topic) {
	    assert.ok(topic.error !== null);
	}
    },
    'testing restrict other binding method': {
        topic: function () {
	    var self = this;
	    try {
		process.binding('evals');
		self.callback(null, {
		    error: null 
		});
	    } catch (e) {
		console.log(e);
		self.callback(null, {
		    'error': e
		});
	    }
	},
	'verify error': function (topic) {
	    assert.ok(topic.error === null);
	}
    },
    'testing restrict other process methods': {
        topic: function () {
	    var self = this;
	    try {
                var memoryUsage = process.memoryUsage();
		self.callback(null, {
		    'error': null,
		    'output': memoryUsage
		});
	    } catch (e) {
		self.callback(null, {
		    'error': e
		});
	    }
	},
	'verify error': function (topic) {
	    assert.ok(topic.error === null);
	}
    }
}
vows.describe('restrict').addBatch(tests).export(module);
