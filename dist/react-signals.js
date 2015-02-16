!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Signals=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});