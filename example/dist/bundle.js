require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-signals":[function(require,module,exports){
var React = require('react');

// private shared database
var signals = {};

var Signals = React.createClass({displayName: "Signals",
    statics: {
        // signal dispatcher
        notify: function(name, data){
            var handlers = signals[name];
            if(handlers){
                handlers.forEach(function(handler){
                    handler(data);
                })
            }
        }
    },
    componentWillMount: function () {
        for(var prop in this.props){
            if(this.props.hasOwnProperty(prop)){
                var m = prop.match(/on([A-Z]+.*)/);
                var handler = this.props[prop];

                if(typeof handler !== "function"){
                    throw Error('Signal handler must be a function');
                }

                if(m){
                    var signalName = m[1].replace(/(.)/, function(c){
                        return c.toLowerCase()
                    });
                    var handlers = signals[signalName];
                    if(!handlers){
                        signals[signalName] = [handler];
                    }else{
                        handlers.push(handler);
                    }
                }
            }
        }
    },
    render: function(){
        return null
    }
});

// signal listener at document
document.addEventListener('react-signal', function(e) {
    Signals.notify(e.detail.name, e.detail.data);
});

module.exports = Signals;

},{"react":undefined}]},{},[]);
