'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var Game = require('./ui/Game.react');
var React = require('react');
var ReactDOM = require('react-dom');

var _require2 = require('./reducers/rootReducer'),
    rootReducer = _require2.rootReducer;

var _require3 = require('./systems/initSystems'),
    initSystems = _require3.initSystems;

var store = createStore(rootReducer);
window.store = store; // useful for debugging

// initializes the other systems on game start
initSystems(store);

ReactDOM.render(React.createElement(Game, { store: store }), document.getElementById('container'));