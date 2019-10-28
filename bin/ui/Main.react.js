'use strict';

var React = require('react');

var _require = require('../config'),
    config = _require.config;

var Game = require('./Game.react');
var Lobby = require('./Lobby.react');
var Button = require('./components/Button.react');

function Main(props) {

  var content = React.useMemo(function () {
    if (props.state.game == null) {
      return React.createElement(Lobby, { dispatch: props.dispatch });
    } else {
      return React.createElement(Game, {
        state: props.state,
        width: config.canvasWidth, height: config.canvasHeight
      });
    }
  }, [props.state, config.canvasHeight, config.canvasWidth, props.dispatch]);

  return React.createElement(
    React.Fragment,
    null,
    content,
    getModal(props)
  );
}

function getModal(props) {
  if (!props.modal) {
    return null;
  }
  var _props$state$modal = props.state.modal,
      title = _props$state$modal.title,
      text = _props$state$modal.text,
      buttons = _props$state$modal.buttons;

  var rect = document.getElementById('container').getBoundingClientRect();
  var buttonHTML = buttons.map(function (button) {
    return React.createElement(Button, { label: button.label, onClick: button.onClick });
  });
  return React.createElement(
    'div',
    { className: 'modal',
      style: {
        width: 300,
        top: (rect.height - 200) / 2,
        left: (rect.width - 300) / 2
      } },
    React.createElement(
      'h3',
      null,
      React.createElement(
        'b',
        null,
        title
      )
    ),
    text,
    React.createElement(
      'div',
      { className: 'modalButtons' },
      buttonHTML
    )
  );
}

module.exports = Main;