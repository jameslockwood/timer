timer.js
=====

```JavaScript

// invoke a function every midnight (00:00.00)
timer.onDateChange( fn );

// invoke a function in a set amount of time
timer.in( 200 ).milliseconds( fn );
timer.in( 1 ).second( fn );
timer.in( 5 ).minutes( fn );
timer.in( 3 ).hours( fn );
timer.in( 2 ).days( fn );

// invoke a function at a defined time
timer.at( 1594753240, fn )          // epoch
timer.at( myDate, fn )              // date object
timer.at( '20 July 2014', fn );     // parsable date string

// continually invoke a function at a defined interval
timer.every( 200 ).milliseconds( fn );
timer.every( 5 ).seconds( fn );
timer.every( 12 ).minutes( fn );
timer.every( 10 ).hours( fn );
timer.every( 2 ).days( fn );
timer.every( 5 ).seconds( fn ).stopAfter( 3 );   // invokes function 3 times

// get present time
timer.now();

// stoping watches
var test = timer.every( 5 ).days( fn );
test.stop();

var test = timer.onDateChange( fn );
test.stop();
```
