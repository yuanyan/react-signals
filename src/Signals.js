var React = require('react');

// private shared database
var signals = {};

var Signals = React.createClass({
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
