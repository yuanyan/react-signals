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

var App = React.createClass({

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
            <div>
                {signalText}
                <Signals onFirstSignalName={this.firstHandler} onSecondSignalName={this.secondHandler}/>
            </div>
         )
    }
});

React.render(<App/>, document.body);
