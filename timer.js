var timer = (function timer() {

	var _observers = [];

	function getTimeNow() {
		return new Date().getTime();
	}

	function getMidnightTime() {
		var midnight = new Date();
		midnight.setHours(24);
		midnight.setMinutes(0);
		midnight.setSeconds(0);
		midnight.setMilliseconds(0);
		return midnight.getTime();
	}

	function msUntilFutureTime(time) {
		return time - getTimeNow();
	}

	function executeObservers() {
		for (var i in _observers) {
			try {
				_observers[i].call(null);
			} catch (e) {}
		}
		setMidnightWatch();
	}

	function setMidnightWatch() {
		setTimeout(function () {
			executeObservers();
		}, msUntilFutureTime(getMidnightTime()));
	}

	function addMidnightObserver(fn) {
		if (typeof fn == 'function') {
			_observers.push(fn);
		}
	}

	function removeMidnightObserver(fn){
		for( var i in _observers ){
			var observerFn = _observers[i];
			if( fn === observerFn ){
				_observers.splice(i, 1);
				break;
			}
		}
	}

	function at(time, fn) {
		if (typeof fn !== 'function') {
			return;
		}
		var diff = msUntilFutureTime(time);
		if (diff < 0) {
			return;
		}
		setTimeout(function () {
			fn();
		}, diff);
		return time;
	}

	setMidnightWatch();

	return {
		'now' : function(){
			return new Date();
		},
		'onDateChange': function (fn) {
			addMidnightObserver(fn);
			return {
				stop : function(){
					return removeMidnightObserver(fn);
				}
			};
		},
		'at': function (dateArg, fn) {
			var type = typeof dateArg;
			var parsedDate = null;
			var parsedDateInMs;
			if (type == 'string') {
				parsedDate = new Date(dateArg);
			} else if (type == 'number') {
				parsedDate = new Date();
				parsedDate.setTime(dateArg);
			} else if (dateArg instanceof Date) {
				parsedDate = dateArg;
			}
			if (!parsedDate || isNaN(parsedDate.getTime())) {
				throw new Error('Could not parse date ' + dateArg + ' correctly');
			}
			parsedDateInMs = parsedDate.getTime();
			return at(parsedDateInMs, fn);
		},
		'in' : function (num) {
			if (typeof num !== 'number') {
				throw new Error('Expected a number');
			}

			function getFutureTime(multiplier) {
				return getTimeNow() + (multiplier * num);
			}
			return {
				millisecond: function (fn) {
					return this.milliseconds.apply(this, arguments);
				},
				milliseconds: function (fn) {
					return at(getFutureTime(1), fn);
				},
				second: function (fn) {
					return this.seconds.apply(this, arguments);
				},
				seconds: function (fn) {
					return at(getFutureTime(1000), fn);
				},
				minute: function (fn) {
					return this.minutes.apply(this, arguments);
				},
				minutes: function (fn) {
					return at(getFutureTime(1000 * 60), fn);
				},
				hour: function (fn) {
					return this.hours.apply(this, arguments);
				},
				hours: function (fn) {
					return at(getFutureTime(1000 * 60 * 60), fn);
				},
				day: function (fn) {
					return this.day.apply(this, arguments);
				},
				days: function (fn) {
					return at(getFutureTime(1000 * 60 * 60 * 24), fn);
				}
			};
		},
		'every': function (num) {
			if (typeof num !== 'number') {
				throw new Error('Expected a number');
			}
			var stop = false;
			var count = 0;
			var maxCount;
			var stopFn;

			function generateReturnObject(opts) {
				return {
					stop: function () {
						stop = true;
					},
					stopAfter: function (maxNum) {
						maxCount = maxNum;
					}
				};
			}

			function getFutureTime(multiplier) {
				return getTimeNow() + (multiplier * num);
			}

			function generateAtMethod(multiplier, fn) {
				var time = getFutureTime(multiplier);
				at(time, function () {
					count++;
					if (stop) {
						return;
					}
					if (typeof maxCount == 'number' && count > maxCount) {
						return;
					}
					fn();
					generateAtMethod(multiplier, fn);
				});
			}
			return {
				millisecond: function (fn) {
					return this.milliseconds.apply(this, arguments);
				},
				milliseconds: function (fn) {
					generateAtMethod(1, fn);
					return generateReturnObject();
				},
				second: function (fn) {
					return this.seconds.apply(this, arguments);
				},
				seconds: function (fn) {
					generateAtMethod(1000, fn);
					return generateReturnObject();
				},
				minute: function (fn) {
					return this.minutes.apply(this, arguments);
				},
				minutes: function (fn) {
					generateAtMethod(1000 * 60, fn);
					return generateReturnObject();
				},
				hour: function (fn) {
					return this.hours.apply(this, arguments);
				},
				hours: function (fn) {
					generateAtMethod(1000 * 60 * 60, fn);
					return generateReturnObject();
				},
				day: function (fn) {
					return this.days.apply(this, arguments);
				},
				days: function (fn) {
					generateAtMethod(1000 * 60 * 60 * 24, fn);
					return generateReturnObject();
				}
			};
		}
	};

})();