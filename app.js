require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var React = require('react');
var Signals = require('react-signals');

setTimeout(function(){
    Signals.notify('firstSignalName');
}, 1000);

setTimeout(function(){
    var event = new CustomEvent('react-signal', {
        bubbles: false,
        detail: {
            name: 'secondSignalName',
            data: {}
        }
    });
    document.dispatchEvent(event);
}, 2000);

var App = React.createClass({displayName: "App",

    firstHandler: function(){
        this.setState({
            name: 'firstSignalName',
            now: +new Date
        })
    },
    secondHandler: function(){
        this.setState({
            name: 'secondSignalName',
            now: +new Date
        })
    },
    getInitialState: function(){
        return {
            name: '',
            now: +new Date
        }
    },
    render: function(){
        var signalText= '';
        if(this.state.name){
            signalText = 'Accept signal'  + this.state.name + ' when ' + this.state.now
        }
        return (
            React.createElement("div", null, 
                signalText, 
                React.createElement(Signals, {onFirstSignalName: this.firstHandler, onSecondSignalName: this.secondHandler})
            )
         )
    }
});

React.render(React.createElement(App, null), document.body);

},{"react":undefined,"react-signals":undefined}]},{},[1]);
