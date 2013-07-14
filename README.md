timer
=====

```JavaScript

// invoke a function every midnight (00:00.00)
timer.onDateChange( fn );

// remove the date change watch
var dateChangeEvent = timer.onDateChange( fn );
dateChangeEvent.stop();

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

// invoke a function at the 
timer.every( 200 ).milliseconds( fn );
timer.every( 5 ).seconds( fn );
timer.every( 12 ).minutes( fn );
timer.every( 10 ).hours( fn );
timer.every( 2 ).days( fn );

// get present time
timer.now();
```
