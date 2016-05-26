/**
 * Settings model events
 */

'use strict';

import {EventEmitter} from 'events';
var Settings = require('../../sqldb').Settings;
var SettingsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SettingsEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Settings.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SettingsEvents.emit(event + ':' + doc._id, doc);
    SettingsEvents.emit(event, doc);
    done(null);
  }
}

export default SettingsEvents;
