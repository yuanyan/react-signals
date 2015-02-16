React Signals
=============

Signals Component for React.

## Demo & Examples

Live demo: [yuanyan.github.io/react-signals](http://yuanyan.github.io/react-signals/)

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use `react-signals` is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/react-signals.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-signals --save
```

## Usage

### Register signal

```
<Signals onFirstSignalName={this.firstHandler} onSecondSignalName={this.secondHandler}/>
```

### Notify signal
By statics method:

```
var Signals = require('react-signals);
Signals.notify('firstHandler', data);
```

By DOM custom event:

```
var event = new CustomEvent('react-signal', {
    bubbles: false,
    detail: {
        name: 'secondHandler',
        data: data
    }
});
document.dispatchEvent(event);
```
