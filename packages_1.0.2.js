/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */
Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|aft(er)?|from|hence)/i,
        subtract: /^(\-|bef(ore)?|ago)/i,
        yesterday: /^yes(terday)?/i,
        today: /^t(od(ay)?)?/i,
        tomorrow: /^tom(orrow)?/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^mn|min(ute)?s?/i,
        hour: /^h(our)?s?/i,
        week: /^w(eek)?s?/i,
        month: /^m(onth)?s?/i,
        day: /^d(ay)?s?/i,
        year: /^y(ear)?s?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a(?!u|p)|p)/i
    },
    timezones: [{
        name: "UTC",
        offset: "-000"
    }, {
        name: "GMT",
        offset: "-000"
    }, {
        name: "EST",
        offset: "-0500"
    }, {
        name: "EDT",
        offset: "-0400"
    }, {
        name: "CST",
        offset: "-0600"
    }, {
        name: "CDT",
        offset: "-0500"
    }, {
        name: "MST",
        offset: "-0700"
    }, {
        name: "MDT",
        offset: "-0600"
    }, {
        name: "PST",
        offset: "-0800"
    }, {
        name: "PDT",
        offset: "-0700"
    }]
};
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo,
        p = function(s, l) {
            if (!l) {
                l = 2;
            }
            return ("000" + s).slice(l * -1);
        };
    $P.clearTime = function() {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);
        return this;
    };
    $P.setTimeToNow = function() {
        var n = new Date();
        this.setHours(n.getHours());
        this.setMinutes(n.getMinutes());
        this.setSeconds(n.getSeconds());
        this.setMilliseconds(n.getMilliseconds());
        return this;
    };
    $D.today = function() {
        return new Date().clearTime();
    };
    $D.compare = function(date1, date2) {
        if (isNaN(date1) || isNaN(date2)) {
            throw new Error(date1 + " - " + date2);
        } else if (date1 instanceof Date && date2 instanceof Date) {
            return (date1 < date2) ? -1 : (date1 > date2) ? 1 : 0;
        } else {
            throw new TypeError(date1 + " - " + date2);
        }
    };
    $D.equals = function(date1, date2) {
        return (date1.compareTo(date2) === 0);
    };
    $D.getDayNumberFromName = function(name) {
        var n = $C.dayNames,
            m = $C.abbreviatedDayNames,
            o = $C.shortestDayNames,
            s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.getMonthNumberFromName = function(name) {
        var n = $C.monthNames,
            m = $C.abbreviatedMonthNames,
            s = name.toLowerCase();
        for (var i = 0; i < n.length; i++) {
            if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
                return i;
            }
        }
        return -1;
    };
    $D.isLeapYear = function(year) {
        return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    };
    $D.getDaysInMonth = function(year, month) {
        return [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    };
    $D.getTimezoneAbbreviation = function(offset) {
        var z = $C.timezones,
            p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].offset === offset) {
                return z[i].name;
            }
        }
        return null;
    };
    $D.getTimezoneOffset = function(name) {
        var z = $C.timezones,
            p;
        for (var i = 0; i < z.length; i++) {
            if (z[i].name === name.toUpperCase()) {
                return z[i].offset;
            }
        }
        return null;
    };
    $P.clone = function() {
        return new Date(this.getTime());
    };
    $P.compareTo = function(date) {
        return Date.compare(this, date);
    };
    $P.equals = function(date) {
        return Date.equals(this, date || new Date());
    };
    $P.between = function(start, end) {
        return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
    };
    $P.isAfter = function(date) {
        return this.compareTo(date || new Date()) === 1;
    };
    $P.isBefore = function(date) {
        return (this.compareTo(date || new Date()) === -1);
    };
    $P.isToday = function() {
        return this.isSameDay(new Date());
    };
    $P.isSameDay = function(date) {
        return this.clone().clearTime().equals(date.clone().clearTime());
    };
    $P.addMilliseconds = function(value) {
        this.setMilliseconds(this.getMilliseconds() + value);
        return this;
    };
    $P.addSeconds = function(value) {
        return this.addMilliseconds(value * 1000);
    };
    $P.addMinutes = function(value) {
        return this.addMilliseconds(value * 60000);
    };
    $P.addHours = function(value) {
        return this.addMilliseconds(value * 3600000);
    };
    $P.addDays = function(value) {
        this.setDate(this.getDate() + value);
        return this;
    };
    $P.addWeeks = function(value) {
        return this.addDays(value * 7);
    };
    $P.addMonths = function(value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
        return this;
    };
    $P.addYears = function(value) {
        return this.addMonths(value * 12);
    };
    $P.add = function(config) {
        if (typeof config == "number") {
            this._orient = config;
            return this;
        }
        var x = config;
        if (x.milliseconds) {
            this.addMilliseconds(x.milliseconds);
        }
        if (x.seconds) {
            this.addSeconds(x.seconds);
        }
        if (x.minutes) {
            this.addMinutes(x.minutes);
        }
        if (x.hours) {
            this.addHours(x.hours);
        }
        if (x.weeks) {
            this.addWeeks(x.weeks);
        }
        if (x.months) {
            this.addMonths(x.months);
        }
        if (x.years) {
            this.addYears(x.years);
        }
        if (x.days) {
            this.addDays(x.days);
        }
        return this;
    };
    var $y, $m, $d;
    $P.getWeek = function() {
        var a, b, c, d, e, f, g, n, s, w;
        $y = (!$y) ? this.getFullYear() : $y;
        $m = (!$m) ? this.getMonth() + 1 : $m;
        $d = (!$d) ? this.getDate() : $d;
        if ($m <= 2) {
            a = $y - 1;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = 0;
            f = $d - 1 + (31 * ($m - 1));
        } else {
            a = $y;
            b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);
            c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);
            s = b - c;
            e = s + 1;
            f = $d + ((153 * ($m - 3) + 2) / 5) + 58 + s;
        }
        g = (a + b) % 7;
        d = (f + g - e) % 7;
        n = (f + 3 - d) | 0;
        if (n < 0) {
            w = 53 - ((g - s) / 5 | 0);
        } else if (n > 364 + s) {
            w = 1;
        } else {
            w = (n / 7 | 0) + 1;
        }
        $y = $m = $d = null;
        return w;
    };
    $P.getISOWeek = function() {
        $y = this.getUTCFullYear();
        $m = this.getUTCMonth() + 1;
        $d = this.getUTCDate();
        return p(this.getWeek());
    };
    $P.setWeek = function(n) {
        return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
    };
    $D._validate = function(n, min, max, name) {
        if (typeof n == "undefined") {
            return false;
        } else if (typeof n != "number") {
            throw new TypeError(n + " is not a Number.");
        } else if (n < min || n > max) {
            throw new RangeError(n + " is not a valid value for " + name + ".");
        }
        return true;
    };
    $D.validateMillisecond = function(value) {
        return $D._validate(value, 0, 999, "millisecond");
    };
    $D.validateSecond = function(value) {
        return $D._validate(value, 0, 59, "second");
    };
    $D.validateMinute = function(value) {
        return $D._validate(value, 0, 59, "minute");
    };
    $D.validateHour = function(value) {
        return $D._validate(value, 0, 23, "hour");
    };
    $D.validateDay = function(value, year, month) {
        return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
    };
    $D.validateMonth = function(value) {
        return $D._validate(value, 0, 11, "month");
    };
    $D.validateYear = function(value) {
        return $D._validate(value, 0, 9999, "year");
    };
    $P.set = function(config) {
        if ($D.validateMillisecond(config.millisecond)) {
            this.addMilliseconds(config.millisecond - this.getMilliseconds());
        }
        if ($D.validateSecond(config.second)) {
            this.addSeconds(config.second - this.getSeconds());
        }
        if ($D.validateMinute(config.minute)) {
            this.addMinutes(config.minute - this.getMinutes());
        }
        if ($D.validateHour(config.hour)) {
            this.addHours(config.hour - this.getHours());
        }
        if ($D.validateMonth(config.month)) {
            this.addMonths(config.month - this.getMonth());
        }
        if ($D.validateYear(config.year)) {
            this.addYears(config.year - this.getFullYear());
        }
        if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
            this.addDays(config.day - this.getDate());
        }
        if (config.timezone) {
            this.setTimezone(config.timezone);
        }
        if (config.timezoneOffset) {
            this.setTimezoneOffset(config.timezoneOffset);
        }
        if (config.week && $D._validate(config.week, 0, 53, "week")) {
            this.setWeek(config.week);
        }
        return this;
    };
    $P.moveToFirstDayOfMonth = function() {
        return this.set({
            day: 1
        });
    };
    $P.moveToLastDayOfMonth = function() {
        return this.set({
            day: $D.getDaysInMonth(this.getFullYear(), this.getMonth())
        });
    };
    $P.moveToNthOccurrence = function(dayOfWeek, occurrence) {
        var shift = 0;
        if (occurrence > 0) {
            shift = occurrence - 1;
        } else if (occurrence === -1) {
            this.moveToLastDayOfMonth();
            if (this.getDay() !== dayOfWeek) {
                this.moveToDayOfWeek(dayOfWeek, -1);
            }
            return this;
        }
        return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
    };
    $P.moveToDayOfWeek = function(dayOfWeek, orient) {
        var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;
        return this.addDays((diff === 0) ? diff += 7 * (orient || +1) : diff);
    };
    $P.moveToMonth = function(month, orient) {
        var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;
        return this.addMonths((diff === 0) ? diff += 12 * (orient || +1) : diff);
    };
    $P.getOrdinalNumber = function() {
        return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
    };
    $P.getTimezone = function() {
        return $D.getTimezoneAbbreviation(this.getUTCOffset());
    };
    $P.setTimezoneOffset = function(offset) {
        var here = this.getTimezoneOffset(),
            there = Number(offset) * -6 / 10;
        return this.addMinutes(there - here);
    };
    $P.setTimezone = function(offset) {
        return this.setTimezoneOffset($D.getTimezoneOffset(offset));
    };
    $P.hasDaylightSavingTime = function() {
        return (Date.today().set({
            month: 0,
            day: 1
        }).getTimezoneOffset() !== Date.today().set({
            month: 6,
            day: 1
        }).getTimezoneOffset());
    };
    $P.isDaylightSavingTime = function() {
        return (this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({
            month: 6,
            day: 1
        }).getTimezoneOffset());
    };
    $P.getUTCOffset = function() {
        var n = this.getTimezoneOffset() * -10 / 6,
            r;
        if (n < 0) {
            r = (n - 10000).toString();
            return r.charAt(0) + r.substr(2);
        } else {
            r = (n + 10000).toString();
            return "+" + r.substr(1);
        }
    };
    $P.getElapsed = function(date) {
        return (date || new Date()) - this;
    };
    if (!$P.toISOString) {
        $P.toISOString = function() {
            function f(n) {
                return n < 10 ? '0' + n : n;
            }
            return '"' + this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z"';
        };
    }
    $P._toString = $P.toString;
    $P.toString = function(format) {
        var x = this;
        if (format && format.length == 1) {
            var c = $C.formatPatterns;
            x.t = x.toString;
            switch (format) {
                case "d":
                    return x.t(c.shortDate);
                case "D":
                    return x.t(c.longDate);
                case "F":
                    return x.t(c.fullDateTime);
                case "m":
                    return x.t(c.monthDay);
                case "r":
                    return x.t(c.rfc1123);
                case "s":
                    return x.t(c.sortableDateTime);
                case "t":
                    return x.t(c.shortTime);
                case "T":
                    return x.t(c.longTime);
                case "u":
                    return x.t(c.universalSortableDateTime);
                case "y":
                    return x.t(c.yearMonth);
            }
        }
        var ord = function(n) {
            switch (n * 1) {
                case 1:
                case 21:
                case 31:
                    return "st";
                case 2:
                case 22:
                    return "nd";
                case 3:
                case 23:
                    return "rd";
                default:
                    return "th";
            }
        };
        return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function(m) {
            if (m.charAt(0) === "\\") {
                return m.replace("\\", "");
            }
            x.h = x.getHours;
            switch (m) {
                case "hh":
                    return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
                case "h":
                    return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
                case "HH":
                    return p(x.h());
                case "H":
                    return x.h();
                case "mm":
                    return p(x.getMinutes());
                case "m":
                    return x.getMinutes();
                case "ss":
                    return p(x.getSeconds());
                case "s":
                    return x.getSeconds();
                case "yyyy":
                    return p(x.getFullYear(), 4);
                case "yy":
                    return p(x.getFullYear());
                case "dddd":
                    return $C.dayNames[x.getDay()];
                case "ddd":
                    return $C.abbreviatedDayNames[x.getDay()];
                case "dd":
                    return p(x.getDate());
                case "d":
                    return x.getDate();
                case "MMMM":
                    return $C.monthNames[x.getMonth()];
                case "MMM":
                    return $C.abbreviatedMonthNames[x.getMonth()];
                case "MM":
                    return p((x.getMonth() + 1));
                case "M":
                    return x.getMonth() + 1;
                case "t":
                    return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);
                case "tt":
                    return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;
                case "S":
                    return ord(x.getDate());
                default:
                    return m;
            }
        }) : this._toString();
    };
}());
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo,
        $N = Number.prototype;
    $P._orient = +1;
    $P._nth = null;
    $P._is = false;
    $P._same = false;
    $P._isSecond = false;
    $N._dateElement = "day";
    $P.next = function() {
        this._orient = +1;
        return this;
    };
    $D.next = function() {
        return $D.today().next();
    };
    $P.last = $P.prev = $P.previous = function() {
        this._orient = -1;
        return this;
    };
    $D.last = $D.prev = $D.previous = function() {
        return $D.today().last();
    };
    $P.is = function() {
        this._is = true;
        return this;
    };
    $P.same = function() {
        this._same = true;
        this._isSecond = false;
        return this;
    };
    $P.today = function() {
        return this.same().day();
    };
    $P.weekday = function() {
        if (this._is) {
            this._is = false;
            return (!this.is().sat() && !this.is().sun());
        }
        return false;
    };
    $P.at = function(time) {
        return (typeof time === "string") ? $D.parse(this.toString("d") + " " + time) : this.set(time);
    };
    $N.fromNow = $N.after = function(date) {
        var c = {};
        c[this._dateElement] = this;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    $N.ago = $N.before = function(date) {
        var c = {};
        c[this._dateElement] = this * -1;
        return ((!date) ? new Date() : date.clone()).add(c);
    };
    var dx = ("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),
        mx = ("january february march april may june july august september october november december").split(/\s/),
        px = ("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),
        pxf = ("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),
        nth = ("final first second third fourth fifth").split(/\s/),
        de;
    $P.toObject = function() {
        var o = {};
        for (var i = 0; i < px.length; i++) {
            o[px[i].toLowerCase()] = this["get" + pxf[i]]();
        }
        return o;
    };
    $D.fromObject = function(config) {
        config.week = null;
        return Date.today().set(config);
    };
    var df = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getDay() == n;
            }
            if (this._nth !== null) {
                if (this._isSecond) {
                    this.addSeconds(this._orient * -1);
                }
                this._isSecond = false;
                var ntemp = this._nth;
                this._nth = null;
                var temp = this.clone().moveToLastDayOfMonth();
                this.moveToNthOccurrence(n, ntemp);
                if (this > temp) {
                    throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
                }
                return this;
            }
            return this.moveToDayOfWeek(n, this._orient);
        };
    };
    var sdf = function(n) {
        return function() {
            var t = $D.today(),
                shift = n - t.getDay();
            if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
                shift = shift + 7;
            }
            return t.addDays(shift);
        };
    };
    for (var i = 0; i < dx.length; i++) {
        $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;
        $D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);
        $P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
    }
    var mf = function(n) {
        return function() {
            if (this._is) {
                this._is = false;
                return this.getMonth() === n;
            }
            return this.moveToMonth(n, this._orient);
        };
    };
    var smf = function(n) {
        return function() {
            return $D.today().set({
                month: n,
                day: 1
            });
        };
    };
    for (var j = 0; j < mx.length; j++) {
        $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;
        $D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);
        $P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
    }
    var ef = function(j) {
        return function() {
            if (this._isSecond) {
                this._isSecond = false;
                return this;
            }
            if (this._same) {
                this._same = this._is = false;
                var o1 = this.toObject(),
                    o2 = (arguments[0] || new Date()).toObject(),
                    v = "",
                    k = j.toLowerCase();
                for (var m = (px.length - 1); m > -1; m--) {
                    v = px[m].toLowerCase();
                    if (o1[v] != o2[v]) {
                        return false;
                    }
                    if (k == v) {
                        break;
                    }
                }
                return true;
            }
            if (j.substring(j.length - 1) != "s") {
                j += "s";
            }
            return this["add" + j](this._orient);
        };
    };
    var nf = function(n) {
        return function() {
            this._dateElement = n;
            return this;
        };
    };
    for (var k = 0; k < px.length; k++) {
        de = px[k].toLowerCase();
        $P[de] = $P[de + "s"] = ef(px[k]);
        $N[de] = $N[de + "s"] = nf(de);
    }
    $P._ss = ef("Second");
    var nthfn = function(n) {
        return function(dayOfWeek) {
            if (this._same) {
                return this._ss(arguments[0]);
            }
            if (dayOfWeek || dayOfWeek === 0) {
                return this.moveToNthOccurrence(dayOfWeek, n);
            }
            this._nth = n;
            if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
                this._isSecond = true;
                return this.addSeconds(this._orient);
            }
            return this;
        };
    };
    for (var l = 0; l < nth.length; l++) {
        $P[nth[l]] = (l === 0) ? nthfn(-1) : nthfn(l);
    }
}());
(function() {
    Date.Parsing = {
        Exception: function(s) {
            this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
        }
    };
    var $P = Date.Parsing;
    var _ = $P.Operators = {
        rtoken: function(r) {
            return function(s) {
                var mx = s.match(r);
                if (mx) {
                    return ([mx[0], s.substring(mx[0].length)]);
                } else {
                    throw new $P.Exception(s);
                }
            };
        },
        token: function(s) {
            return function(s) {
                return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
            };
        },
        stoken: function(s) {
            return _.rtoken(new RegExp("^" + s));
        },
        until: function(p) {
            return function(s) {
                var qx = [],
                    rx = null;
                while (s.length) {
                    try {
                        rx = p.call(this, s);
                    } catch (e) {
                        qx.push(rx[0]);
                        s = rx[1];
                        continue;
                    }
                    break;
                }
                return [qx, s];
            };
        },
        many: function(p) {
            return function(s) {
                var rx = [],
                    r = null;
                while (s.length) {
                    try {
                        r = p.call(this, s);
                    } catch (e) {
                        return [rx, s];
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        optional: function(p) {
            return function(s) {
                var r = null;
                try {
                    r = p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                return [r[0], r[1]];
            };
        },
        not: function(p) {
            return function(s) {
                try {
                    p.call(this, s);
                } catch (e) {
                    return [null, s];
                }
                throw new $P.Exception(s);
            };
        },
        ignore: function(p) {
            return p ? function(s) {
                var r = null;
                r = p.call(this, s);
                return [null, r[1]];
            } : null;
        },
        product: function() {
            var px = arguments[0],
                qx = Array.prototype.slice.call(arguments, 1),
                rx = [];
            for (var i = 0; i < px.length; i++) {
                rx.push(_.each(px[i], qx));
            }
            return rx;
        },
        cache: function(rule) {
            var cache = {},
                r = null;
            return function(s) {
                try {
                    r = cache[s] = (cache[s] || rule.call(this, s));
                } catch (e) {
                    r = cache[s] = e;
                }
                if (r instanceof $P.Exception) {
                    throw r;
                } else {
                    return r;
                }
            };
        },
        any: function() {
            var px = arguments;
            return function(s) {
                var r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        r = null;
                    }
                    if (r) {
                        return r;
                    }
                }
                throw new $P.Exception(s);
            };
        },
        each: function() {
            var px = arguments;
            return function(s) {
                var rx = [],
                    r = null;
                for (var i = 0; i < px.length; i++) {
                    if (px[i] == null) {
                        continue;
                    }
                    try {
                        r = (px[i].call(this, s));
                    } catch (e) {
                        throw new $P.Exception(s);
                    }
                    rx.push(r[0]);
                    s = r[1];
                }
                return [rx, s];
            };
        },
        all: function() {
            var px = arguments,
                _ = _;
            return _.each(_.optional(px));
        },
        sequence: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            if (px.length == 1) {
                return px[0];
            }
            return function(s) {
                var r = null,
                    q = null;
                var rx = [];
                for (var i = 0; i < px.length; i++) {
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        break;
                    }
                    rx.push(r[0]);
                    try {
                        q = d.call(this, r[1]);
                    } catch (ex) {
                        q = null;
                        break;
                    }
                    s = q[1];
                }
                if (!r) {
                    throw new $P.Exception(s);
                }
                if (q) {
                    throw new $P.Exception(q[1]);
                }
                if (c) {
                    try {
                        r = c.call(this, r[1]);
                    } catch (ey) {
                        throw new $P.Exception(r[1]);
                    }
                }
                return [rx, (r ? r[1] : s)];
            };
        },
        between: function(d1, p, d2) {
            d2 = d2 || d1;
            var _fn = _.each(_.ignore(d1), p, _.ignore(d2));
            return function(s) {
                var rx = _fn.call(this, s);
                return [
                    [rx[0][0], r[0][2]], rx[1]
                ];
            };
        },
        list: function(p, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return (p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c)));
        },
        set: function(px, d, c) {
            d = d || _.rtoken(/^\s*/);
            c = c || null;
            return function(s) {
                var r = null,
                    p = null,
                    q = null,
                    rx = null,
                    best = [
                        [], s
                    ],
                    last = false;
                for (var i = 0; i < px.length; i++) {
                    q = null;
                    p = null;
                    r = null;
                    last = (px.length == 1);
                    try {
                        r = px[i].call(this, s);
                    } catch (e) {
                        continue;
                    }
                    rx = [
                        [r[0]], r[1]
                    ];
                    if (r[1].length > 0 && !last) {
                        try {
                            q = d.call(this, r[1]);
                        } catch (ex) {
                            last = true;
                        }
                    } else {
                        last = true;
                    }
                    if (!last && q[1].length === 0) {
                        last = true;
                    }
                    if (!last) {
                        var qx = [];
                        for (var j = 0; j < px.length; j++) {
                            if (i != j) {
                                qx.push(px[j]);
                            }
                        }
                        p = _.set(qx, d).call(this, q[1]);
                        if (p[0].length > 0) {
                            rx[0] = rx[0].concat(p[0]);
                            rx[1] = p[1];
                        }
                    }
                    if (rx[1].length < best[1].length) {
                        best = rx;
                    }
                    if (best[1].length === 0) {
                        break;
                    }
                }
                if (best[0].length === 0) {
                    return best;
                }
                if (c) {
                    try {
                        q = c.call(this, best[1]);
                    } catch (ey) {
                        throw new $P.Exception(best[1]);
                    }
                    best[1] = q[1];
                }
                return best;
            };
        },
        forward: function(gr, fname) {
            return function(s) {
                return gr[fname].call(this, s);
            };
        },
        replace: function(rule, repl) {
            return function(s) {
                var r = rule.call(this, s);
                return [repl, r[1]];
            };
        },
        process: function(rule, fn) {
            return function(s) {
                var r = rule.call(this, s);
                return [fn.call(this, r[0]), r[1]];
            };
        },
        min: function(min, rule) {
            return function(s) {
                var rx = rule.call(this, s);
                if (rx[0].length < min) {
                    throw new $P.Exception(s);
                }
                return rx;
            };
        }
    };
    var _generator = function(op) {
        return function() {
            var args = null,
                rx = [];
            if (arguments.length > 1) {
                args = Array.prototype.slice.call(arguments);
            } else if (arguments[0] instanceof Array) {
                args = arguments[0];
            }
            if (args) {
                for (var i = 0, px = args.shift(); i < px.length; i++) {
                    args.unshift(px[i]);
                    rx.push(op.apply(null, args));
                    args.shift();
                    return rx;
                }
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var gx = "optional not ignore cache".split(/\s/);
    for (var i = 0; i < gx.length; i++) {
        _[gx[i]] = _generator(_[gx[i]]);
    }
    var _vector = function(op) {
        return function() {
            if (arguments[0] instanceof Array) {
                return op.apply(null, arguments[0]);
            } else {
                return op.apply(null, arguments);
            }
        };
    };
    var vx = "each any all".split(/\s/);
    for (var j = 0; j < vx.length; j++) {
        _[vx[j]] = _vector(_[vx[j]]);
    }
}());
(function() {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo;
    var flattenAndCompact = function(ax) {
        var rx = [];
        for (var i = 0; i < ax.length; i++) {
            if (ax[i] instanceof Array) {
                rx = rx.concat(flattenAndCompact(ax[i]));
            } else {
                if (ax[i]) {
                    rx.push(ax[i]);
                }
            }
        }
        return rx;
    };
    $D.Grammar = {};
    $D.Translator = {
        hour: function(s) {
            return function() {
                this.hour = Number(s);
            };
        },
        minute: function(s) {
            return function() {
                this.minute = Number(s);
            };
        },
        second: function(s) {
            return function() {
                this.second = Number(s);
            };
        },
        meridian: function(s) {
            return function() {
                this.meridian = s.slice(0, 1).toLowerCase();
            };
        },
        timezone: function(s) {
            return function() {
                var n = s.replace(/[^\d\+\-]/g, "");
                if (n.length) {
                    this.timezoneOffset = Number(n);
                } else {
                    this.timezone = s.toLowerCase();
                }
            };
        },
        day: function(x) {
            var s = x[0];
            return function() {
                this.day = Number(s.match(/\d+/)[0]);
            };
        },
        month: function(s) {
            return function() {
                this.month = (s.length == 3) ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
            };
        },
        year: function(s) {
            return function() {
                var n = Number(s);
                this.year = ((s.length > 2) ? n : (n + (((n + 2000) < $C.twoDigitYearMax) ? 2000 : 1900)));
            };
        },
        rday: function(s) {
            return function() {
                switch (s) {
                    case "yesterday":
                        this.days = -1;
                        break;
                    case "tomorrow":
                        this.days = 1;
                        break;
                    case "today":
                        this.days = 0;
                        break;
                    case "now":
                        this.days = 0;
                        this.now = true;
                        break;
                }
            };
        },
        finishExact: function(x) {
            x = (x instanceof Array) ? x : [x];
            for (var i = 0; i < x.length; i++) {
                if (x[i]) {
                    x[i].call(this);
                }
            }
            var now = new Date();
            if ((this.hour || this.minute) && (!this.month && !this.year && !this.day)) {
                this.day = now.getDate();
            }
            if (!this.year) {
                this.year = now.getFullYear();
            }
            if (!this.month && this.month !== 0) {
                this.month = now.getMonth();
            }
            if (!this.day) {
                this.day = 1;
            }
            if (!this.hour) {
                this.hour = 0;
            }
            if (!this.minute) {
                this.minute = 0;
            }
            if (!this.second) {
                this.second = 0;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.day > $D.getDaysInMonth(this.year, this.month)) {
                throw new RangeError(this.day + " is not a valid value for days.");
            }
            var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
            if (this.timezone) {
                r.set({
                    timezone: this.timezone
                });
            } else if (this.timezoneOffset) {
                r.set({
                    timezoneOffset: this.timezoneOffset
                });
            }
            return r;
        },
        finish: function(x) {
            x = (x instanceof Array) ? flattenAndCompact(x) : [x];
            if (x.length === 0) {
                return null;
            }
            for (var i = 0; i < x.length; i++) {
                if (typeof x[i] == "function") {
                    x[i].call(this);
                }
            }
            var today = $D.today();
            if (this.now && !this.unit && !this.operator) {
                return new Date();
            } else if (this.now) {
                today = new Date();
            }
            var expression = !!(this.days && this.days !== null || this.orient || this.operator);
            var gap, mod, orient;
            orient = ((this.orient == "past" || this.operator == "subtract") ? -1 : 1);
            if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
                today.setTimeToNow();
            }
            if (this.month || this.month === 0) {
                if ("year day hour minute second".indexOf(this.unit) != -1) {
                    this.value = this.month + 1;
                    this.month = null;
                    expression = true;
                }
            }
            if (!expression && this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (!this.month) {
                    this.month = temp.getMonth();
                }
                this.year = temp.getFullYear();
            }
            if (expression && this.weekday && this.unit != "month") {
                this.unit = "day";
                gap = ($D.getDayNumberFromName(this.weekday) - today.getDay());
                mod = 7;
                this.days = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
            }
            if (this.month && this.unit == "day" && this.operator) {
                this.value = (this.month + 1);
                this.month = null;
            }
            if (this.value != null && this.month != null && this.year != null) {
                this.day = this.value * 1;
            }
            if (this.month && !this.day && this.value) {
                today.set({
                    day: this.value * 1
                });
                if (!expression) {
                    this.day = this.value * 1;
                }
            }
            if (!this.month && this.value && this.unit == "month" && !this.now) {
                this.month = this.value;
                expression = true;
            }
            if (expression && (this.month || this.month === 0) && this.unit != "year") {
                this.unit = "month";
                gap = (this.month - today.getMonth());
                mod = 12;
                this.months = gap ? ((gap + (orient * mod)) % mod) : (orient * mod);
                this.month = null;
            }
            if (!this.unit) {
                this.unit = "day";
            }
            if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
                this[this.unit + "s"] = this[this.unit + "s"] + ((this.operator == "add") ? 1 : -1) + (this.value || 0) * orient;
            } else if (this[this.unit + "s"] == null || this.operator != null) {
                if (!this.value) {
                    this.value = 1;
                }
                this[this.unit + "s"] = this.value * orient;
            }
            if (this.meridian && this.hour) {
                if (this.meridian == "p" && this.hour < 12) {
                    this.hour = this.hour + 12;
                } else if (this.meridian == "a" && this.hour == 12) {
                    this.hour = 0;
                }
            }
            if (this.weekday && !this.day && !this.days) {
                var temp = Date[this.weekday]();
                this.day = temp.getDate();
                if (temp.getMonth() !== today.getMonth()) {
                    this.month = temp.getMonth();
                }
            }
            if ((this.month || this.month === 0) && !this.day) {
                this.day = 1;
            }
            if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
                return Date.today().setWeek(this.value);
            }
            if (expression && this.timezone && this.day && this.days) {
                this.day = this.days;
            }
            return (expression) ? today.add(this) : today.set(this);
        }
    };
    var _ = $D.Parsing.Operators,
        g = $D.Grammar,
        t = $D.Translator,
        _fn;
    g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);
    g.timePartDelimiter = _.stoken(":");
    g.whiteSpace = _.rtoken(/^\s*/);
    g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);
    var _C = {};
    g.ctoken = function(keys) {
        var fn = _C[keys];
        if (!fn) {
            var c = $C.regexPatterns;
            var kx = keys.split(/\s+/),
                px = [];
            for (var i = 0; i < kx.length; i++) {
                px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
            }
            fn = _C[keys] = _.any.apply(null, px);
        }
        return fn;
    };
    g.ctoken2 = function(key) {
        return _.rtoken($C.regexPatterns[key]);
    };
    g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));
    g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));
    g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));
    g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));
    g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));
    g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));
    g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));
    g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));
    g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));
    g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));
    g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));
    g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));
    g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));
    g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));
    g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);
    g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));
    g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function(s) {
        return function() {
            this.weekday = s;
        };
    }));
    g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));
    g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));
    g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));
    g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));
    g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));
    g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));
    g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));
    _fn = function() {
        return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
    };
    g.day = _fn(g.d, g.dd);
    g.month = _fn(g.M, g.MMM);
    g.year = _fn(g.yyyy, g.yy);
    g.orientation = _.process(g.ctoken("past future"), function(s) {
        return function() {
            this.orient = s;
        };
    });
    g.operator = _.process(g.ctoken("add subtract"), function(s) {
        return function() {
            this.operator = s;
        };
    });
    g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);
    g.unit = _.process(g.ctoken("second minute hour day week month year"), function(s) {
        return function() {
            this.unit = s;
        };
    });
    g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function(s) {
        return function() {
            this.value = s.replace(/\D/g, "");
        };
    });
    g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);
    _fn = function() {
        return _.set(arguments, g.datePartDelimiter);
    };
    g.mdy = _fn(g.ddd, g.month, g.day, g.year);
    g.ymd = _fn(g.ddd, g.year, g.month, g.day);
    g.dmy = _fn(g.ddd, g.day, g.month, g.year);
    g.date = function(s) {
        return ((g[$C.dateElementOrder] || g.mdy).call(this, s));
    };
    g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function(fmt) {
        if (g[fmt]) {
            return g[fmt];
        } else {
            throw $D.Parsing.Exception(fmt);
        }
    }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function(s) {
        return _.ignore(_.stoken(s));
    }))), function(rules) {
        return _.process(_.each.apply(null, rules), t.finishExact);
    });
    var _F = {};
    var _get = function(f) {
        return _F[f] = (_F[f] || g.format(f)[0]);
    };
    g.formats = function(fx) {
        if (fx instanceof Array) {
            var rx = [];
            for (var i = 0; i < fx.length; i++) {
                rx.push(_get(fx[i]));
            }
            return _.any.apply(null, rx);
        } else {
            return _get(fx);
        }
    };
    g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);
    g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);
    g.start = function(s) {
        try {
            var r = g._formats.call({}, s);
            if (r[1].length === 0) {
                return r;
            }
        } catch (e) {}
        return g._start.call({}, s);
    };
    $D._parse = $D.parse;
    $D.parse = function(s) {
        var r = null;
        if (!s) {
            return null;
        }
        if (s instanceof Date) {
            return s;
        }
        try {
            r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
        } catch (e) {
            return null;
        }
        return ((r[1].length === 0) ? r[0] : null);
    };
    $D.getParseFunction = function(fx) {
        var fn = $D.Grammar.formats(fx);
        return function(s) {
            var r = null;
            try {
                r = fn.call({}, s);
            } catch (e) {
                return null;
            }
            return ((r[1].length === 0) ? r[0] : null);
        };
    };
    $D.parseExact = function(s, fx) {
        return $D.getParseFunction(fx)(s);
    };
}());
/**
 * --------------------------------------------------------------------
 * jQuery-Plugin "daterangepicker.jQuery.js"
 * by Scott Jehl, scott@filamentgroup.com
 * http://www.filamentgroup.com
 * reference article: http://www.filamentgroup.com/lab/update_date_range_picker_with_jquery_ui/
 * demo page: http://www.filamentgroup.com/examples/daterangepicker/
 *
 * Copyright (c) 2008 Filament Group, Inc
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * --------------------------------------------------------------------
 */
jQuery.fn.daterangepicker = function(e) {
        function c(e) {
            if (!e.getDate()) return "";
            var t = e.getDate(),
                n = e.getMonth(),
                i = e.getFullYear();
            n++;
            var s = r.dateFormat;
            return jQuery.datepicker.formatDate(s, e)
        }

        function h() {
            f.data("state") == "closed" && (f.data("state", "open"), f.fadeIn(300), r.onOpen())
        }

        function p() {
            f.data("state") == "open" && (f.data("state", "closed"), f.fadeOut(300), r.onClose())
        }

        function d() {
            f.data("state") == "open" ? p() : h()
        }
        var t = jQuery(this),
            n = document.getElementById("dp_calicon"),
            r = jQuery.extend({
                presetRanges: [{
                    text: "Today",
                    dateStart: "today",
                    dateEnd: "today"
                }, {
                    text: "Last 7 days",
                    dateStart: "today-7days",
                    dateEnd: "today"
                }, {
                    text: "Month to date",
                    dateStart: function() {
                        return Date.parse("today").moveToFirstDayOfMonth()
                    },
                    dateEnd: "today"
                }, {
                    text: "Year to date",
                    dateStart: function() {
                        var e = Date.parse("today");
                        return e.setMonth(0), e.setDate(1), e
                    },
                    dateEnd: "today"
                }, {
                    text: "The previous Month",
                    dateStart: function() {
                        return Date.parse("1 month ago").moveToFirstDayOfMonth()
                    },
                    dateEnd: function() {
                        return Date.parse("1 month ago").moveToLastDayOfMonth()
                    }
                }, {
                    text: "Last 30 Days",
                    dateStart: "Today-30",
                    dateEnd: "Today"
                }],
                presets: {
                    specificDate: "Specific Date",
                    allDatesBefore: "All Dates Before",
                    allDatesAfter: "All Dates After",
                    dateRange: "Date Range"
                },
                rangeStartTitle: "Start date",
                rangeEndTitle: "End date",
                nextLinkText: "Next",
                prevLinkText: "Prev",
                doneButtonText: "Done",
                earliestDate: Date.parse("-15years"),
                latestDate: Date.parse("+15years"),
                rangeSplitter: "-",
                dateFormat: "m/d/yy",
                closeOnSelect: !0,
                arrows: !1,
                posX: t.offset().left,
                posY: t.offset().top + t.outerHeight(),
                appendTo: "body",
                onClose: function() {},
                onOpen: function() {},
                onChange: function() {},
                datepickerOptions: null
            }, e),
            i = {
                onSelect: function() {
                    f.find(".ui-daterangepicker-specificDate").is(".ui-state-active") && f.find(".range-end").datepicker("setDate", f.find(".range-start").datepicker("getDate"));
                    var e = c(f.find(".range-start").datepicker("getDate")),
                        n = c(f.find(".range-end").datepicker("getDate"));
                    t.length == 2 ? (t.eq(0).val(e), t.eq(1).val(n)) : t.val(e != n ? e + " " + r.rangeSplitter + " " + n : e), r.closeOnSelect && !f.find("li.ui-state-active").is(".ui-daterangepicker-dateRange") && !f.is(":animated") && p(), r.onChange()
                },
                defaultDate: 0
            };
        t.change(r.onChange), r.datepickerOptions = e ? jQuery.extend(i, e.datepickerOptions) : i;
        var s, o = Date.parse("today"),
            u, a;
        t.size() == 2 ? (u = Date.parse(t.eq(0).val()), a = Date.parse(t.eq(1).val()), u == null && (u = a), a == null && (a = u)) : (u = Date.parse(t.val().split(r.rangeSplitter)[0]), a = Date.parse(t.val().split(r.rangeSplitter)[1]), a == null && (a = u)), u != null && (s = u), a != null && (o = a);
        var f = jQuery('<div class="ui-daterangepicker ui-widget ui-helper-clearfix ui-widget-content ui-corner-all"></div>'),
            l = function() {
                var e = jQuery('<ul class="ui-widget-content"></ul>').appendTo(f);
                jQuery.each(r.presetRanges, function() {
                    jQuery('<li class="ui-daterangepicker-' + this.text.replace(/ /g, "") + ' ui-corner-all"><a href="#">' + this.text + "</a></li>").data("dateStart", this.dateStart).data("dateEnd", this.dateEnd).appendTo(e)
                });
                var t = 0;
                return jQuery.each(r.presets, function(n, r) {
                    jQuery('<li class="ui-daterangepicker-' + n + " preset_" + t + ' ui-helper-clearfix ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a href="#">' + r + "</a></li>").appendTo(e), t++
                }), e.find("li").hover(function() {
                    jQuery(this).addClass("ui-state-hover")
                }, function() {
                    jQuery(this).removeClass("ui-state-hover")
                }).click(function() {
                    return f.find(".ui-state-active").removeClass("ui-state-active"), jQuery(this).addClass("ui-state-active").clickActions(f, v, m), !1
                }), e
            }();
        jQuery.fn.restoreDateFromData = function() {
            return jQuery(this).data("saveDate") && jQuery(this).datepicker("setDate", jQuery(this).data("saveDate")).removeData("saveDate"), this
        }, jQuery.fn.saveDateToData = function() {
            return jQuery(this).data("saveDate") || jQuery(this).data("saveDate", jQuery(this).datepicker("getDate")), this
        }, f.data("state", "closed"), jQuery.fn.clickActions = function(e, t, n) {
            if (jQuery(this).is(".ui-daterangepicker-specificDate")) n.hide(), t.show(), e.find(".title-start").text(r.presets.specificDate), e.find(".range-start").restoreDateFromData().show(400), e.find(".range-end").restoreDateFromData().hide(400), setTimeout(function() {
                n.fadeIn()
            }, 400);
            else if (jQuery(this).is(".ui-daterangepicker-allDatesBefore")) n.hide(), t.show(), e.find(".title-end").text(r.presets.allDatesBefore), e.find(".range-start").saveDateToData().datepicker("setDate", r.earliestDate).hide(400), e.find(".range-end").restoreDateFromData().show(400), setTimeout(function() {
                n.fadeIn()
            }, 400);
            else if (jQuery(this).is(".ui-daterangepicker-allDatesAfter")) n.hide(), t.show(), e.find(".title-start").text(r.presets.allDatesAfter), e.find(".range-start").restoreDateFromData().show(400), e.find(".range-end").saveDateToData().datepicker("setDate", r.latestDate).hide(400), setTimeout(function() {
                n.fadeIn()
            }, 400);
            else if (jQuery(this).is(".ui-daterangepicker-dateRange")) n.hide(), t.show(), e.find(".title-start").text(r.rangeStartTitle), e.find(".title-end").text(r.rangeEndTitle), e.find(".range-start").restoreDateFromData().show(400), e.find(".range-end").restoreDateFromData().show(400), setTimeout(function() {
                n.fadeIn()
            }, 400);
            else {
                n.hide(), e.find(".range-start, .range-end").hide(400, function() {
                    t.hide()
                });
                var i = typeof jQuery(this).data("dateStart") == "string" ? Date.parse(jQuery(this).data("dateStart")) : jQuery(this).data("dateStart")(),
                    s = typeof jQuery(this).data("dateEnd") == "string" ? Date.parse(jQuery(this).data("dateEnd")) : jQuery(this).data("dateEnd")();
                e.find(".range-start").datepicker("setDate", i).find(".ui-datepicker-current-day").trigger("click"), e.find(".range-end").datepicker("setDate", s).find(".ui-datepicker-current-day").trigger("click")
            }
            return !1
        };
        var v = jQuery('<div class="ranges ui-widget-header ui-corner-all ui-helper-clearfix"><div class="range-start"><span class="title-start">Start Date</span></div><div class="range-end"><span class="title-end">End Date</span></div></div>').appendTo(f);
        v.find(".range-start, .range-end").datepicker(r.datepickerOptions), v.find(".range-start").datepicker("setDate", s), v.find(".range-end").datepicker("setDate", o);
        var m = jQuery('<button class="btnDone ui-state-default ui-corner-all">' + r.doneButtonText + "</button>").click(function() {
            f.find(".ui-datepicker-current-day").trigger("click"), p()
        }).hover(function() {
            jQuery(this).addClass("ui-state-hover")
        }, function() {
            jQuery(this).removeClass("ui-state-hover")
        }).appendTo(v);
        jQuery(n).click(function() {
            return d(), !1
        }), v.css("display", "none").find(".range-start, .range-end, .btnDone").css("display", "none"), jQuery(r.appendTo).append(f), f.wrap('<div class="ui-daterangepickercontain"></div>'), r.posX && f.parent().css("left", r.posX), r.posY && f.parent().css("top", r.posY);
        if (r.arrows && t.size() == 1) {
            var g = jQuery('<a href="#" class="ui-daterangepicker-prev ui-corner-all" title="' + r.prevLinkText + '"><span class="ui-icon ui-icon-circle-triangle-w">' + r.prevLinkText + "</span></a>"),
                y = jQuery('<a href="#" class="ui-daterangepicker-next ui-corner-all" title="' + r.nextLinkText + '"><span class="ui-icon ui-icon-circle-triangle-e">' + r.nextLinkText + "</span></a>");
            jQuery(this).addClass("ui-rangepicker-input ui-widget-content").wrap('<div class="ui-daterangepicker-arrows ui-widget ui-widget-header ui-helper-clearfix ui-corner-all"></div>').before(g).before(y).parent().find("a").click(function() {
                var e = v.find(".range-start").datepicker("getDate"),
                    t = v.find(".range-end").datepicker("getDate"),
                    n = Math.abs((new TimeSpan(e - t)).getTotalMilliseconds()) + 864e5;
                return jQuery(this).is(".ui-daterangepicker-prev") && (n = -n), v.find(".range-start, .range-end ").each(function() {
                    var e = jQuery(this).datepicker("getDate");
                    if (e == null) return !1;
                    jQuery(this).datepicker("setDate", e.add({
                        milliseconds: n
                    })).find(".ui-datepicker-current-day").trigger("click")
                }), !1
            }).hover(function() {
                jQuery(this).addClass("ui-state-hover")
            }, function() {
                jQuery(this).removeClass("ui-state-hover")
            })
        }
        return jQuery(document).click(function() {
            f.is(":visible") && p()
        }), f.click(function() {
            return !1
        }).hide(), this
    }
    /*--------------------------------------------------------------------
     * jQuery pixel/em conversion plugins: toEm() and toPx()
     * by Scott Jehl (scott@filamentgroup.com), http://www.filamentgroup.com
     * Copyright (c) Filament Group
     * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) or GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
     * Article: http://www.filamentgroup.com/lab/update_jquery_plugin_for_retaining_scalable_interfaces_with_pixel_to_em_con/
     * Options: scope: string or jQuery selector for font-size scoping
     * Usage Example: $(myPixelValue).toEm(); or $(myEmValue).toPx();
    --------------------------------------------------------------------*/
$.fn.toEm = function(a) {
    a = jQuery.extend({
        scope: "body"
    }, a);
    var b = parseInt(this[0], 10),
        c = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(a.scope),
        d = c.height();
    return c.remove(), (b / d).toFixed(8) + "em"
}, $.fn.toPx = function(a) {
    a = jQuery.extend({
        scope: "body"
    }, a);
    var b = parseFloat(this[0]),
        c = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo(a.scope),
        d = c.height();
    return c.remove(), Math.round(b * d) + "px"
};
/*!
 * TableSorter 2.10.8 min - Client-side table sorting with ease!
 * Copyright (c) 2007 Christian Bach
 */
! function(f) {
    f.extend({
        tablesorter: new function() {
            function c(d) {
                "undefined" !== typeof console && "undefined" !== typeof console.log ? console.log(d) : alert(d)
            }

            function t(d, b) {
                c(d + " (" + ((new Date).getTime() - b.getTime()) + "ms)")
            }

            function r(d, b, a) {
                if (!b) return "";
                var e = d.config,
                    c = e.textExtraction,
                    l = "",
                    l = "simple" === c ? e.supportsTextContent ? b.textContent : f(b).text() : "function" === typeof c ? c(b, d, a) : "object" === typeof c && c.hasOwnProperty(a) ? c[a](b, d, a) : e.supportsTextContent ? b.textContent : f(b).text();
                return f.trim(l)
            }

            function j(d) {
                var b = d.config,
                    a = b.$tbodies = b.$table.children("tbody:not(." + b.cssInfoBlock + ")"),
                    e, u, l, p, n, k, h = "";
                if (0 === a.length) return b.debug ? c("*Empty table!* Not building a parser cache") : "";
                a = a[0].rows;
                if (a[0]) {
                    e = [];
                    u = a[0].cells.length;
                    for (l = 0; l < u; l++) {
                        p = b.$headers.filter(":not([colspan])");
                        p = p.add(b.$headers.filter('[colspan="1"]')).filter('[data-column="' + l + '"]:last');
                        n = b.headers[l];
                        k = g.getParserById(g.getData(p, n, "sorter"));
                        b.empties[l] = g.getData(p, n, "empty") || b.emptyTo || (b.emptyToBottom ? "bottom" : "top");
                        b.strings[l] = g.getData(p, n, "string") || b.stringTo || "max";
                        if (!k) a: {
                            p = d;
                            n = a;
                            k = -1;
                            for (var f = l, m = void 0, t = g.parsers.length, F = !1, D = "", m = !0;
                                "" === D && m;) k++, n[k] ? (F = n[k].cells[f], D = r(p, F, f), p.config.debug && c("Checking if value was empty on row " + k + ", column: " + f + ': "' + D + '"')) : m = !1;
                            for (; 0 <= --t;)
                                if ((m = g.parsers[t]) && "text" !== m.id && m.is && m.is(D, p, F)) {
                                    k = m;
                                    break a
                                }
                            k = g.getParserById("text")
                        }
                        b.debug && (h += "column:" + l + "; parser:" + k.id + "; string:" + b.strings[l] + "; empty: " + b.empties[l] + "\n");
                        e.push(k)
                    }
                }
                b.debug && c(h);
                b.parsers = e
            }

            function v(d) {
                var b = d.tBodies,
                    a = d.config,
                    e, u, l = a.parsers,
                    p, n, k, h, q, m, H, j = [];
                a.cache = {};
                if (!l) return a.debug ? c("*Empty table!* Not building a cache") : "";
                a.debug && (H = new Date);
                a.showProcessing && g.isProcessing(d, !0);
                for (h = 0; h < b.length; h++)
                    if (a.cache[h] = {
                            row: [],
                            normalized: []
                        }, !f(b[h]).hasClass(a.cssInfoBlock)) {
                        e = b[h] && b[h].rows.length || 0;
                        u = b[h].rows[0] && b[h].rows[0].cells.length || 0;
                        for (n = 0; n < e; ++n)
                            if (q = f(b[h].rows[n]), m = [], q.hasClass(a.cssChildRow)) a.cache[h].row[a.cache[h].row.length - 1] = a.cache[h].row[a.cache[h].row.length - 1].add(q);
                            else {
                                a.cache[h].row.push(q);
                                for (k = 0; k < u; ++k)
                                    if (p = r(d, q[0].cells[k], k), p = l[k].format(p, d, q[0].cells[k], k), m.push(p), "numeric" === (l[k].type || "").toLowerCase()) j[k] = Math.max(Math.abs(p) || 0, j[k] || 0);
                                m.push(a.cache[h].normalized.length);
                                a.cache[h].normalized.push(m)
                            }
                        a.cache[h].colMax = j
                    }
                a.showProcessing && g.isProcessing(d);
                a.debug && t("Building cache for " + e + " rows", H)
            }

            function x(d, b) {
                var a = d.config,
                    e = d.tBodies,
                    c = [],
                    l = a.cache,
                    p, n, k, h, q, m, r, j, D, s, v;
                if (l[0]) {
                    a.debug && (v = new Date);
                    for (j = 0; j < e.length; j++)
                        if (p = f(e[j]), p.length && !p.hasClass(a.cssInfoBlock)) {
                            q = g.processTbody(d, p, !0);
                            p = l[j].row;
                            n = l[j].normalized;
                            h = (k = n.length) ? n[0].length - 1 : 0;
                            for (m = 0; m < k; m++)
                                if (s = n[m][h], c.push(p[s]), !a.appender || !a.removeRows) {
                                    D = p[s].length;
                                    for (r = 0; r < D; r++) q.append(p[s][r])
                                }
                            g.processTbody(d, q, !1)
                        }
                    a.appender && a.appender(d, c);
                    a.debug && t("Rebuilt table", v);
                    b || g.applyWidget(d);
                    f(d).trigger("sortEnd", d)
                }
            }

            function A(d) {
                var b = [],
                    a = {},
                    e = 0,
                    u = f(d).find("thead:eq(0), tfoot").children("tr"),
                    l, p, n, k, h, q, m, j, r, s;
                for (l = 0; l < u.length; l++) {
                    h = u[l].cells;
                    for (p = 0; p < h.length; p++) {
                        k = h[p];
                        q = k.parentNode.rowIndex;
                        m = q + "-" + k.cellIndex;
                        j = k.rowSpan || 1;
                        r = k.colSpan || 1;
                        "undefined" === typeof b[q] && (b[q] = []);
                        for (n = 0; n < b[q].length + 1; n++)
                            if ("undefined" === typeof b[q][n]) {
                                s = n;
                                break
                            }
                        a[m] = s;
                        e = Math.max(s, e);
                        f(k).attr({
                            "data-column": s
                        });
                        for (n = q; n < q + j; n++) {
                            "undefined" === typeof b[n] && (b[n] = []);
                            m = b[n];
                            for (k = s; k < s + r; k++) m[k] = "x"
                        }
                    }
                }
                d.config.columns = e;
                var v, B, x, A, z, y, C, w = d.config;
                w.headerList = [];
                w.headerContent = [];
                w.debug && (C = new Date);
                A = w.cssIcon ? '<i class="' + w.cssIcon + '"></i>' : "";
                w.$headers = f(d).find(w.selectorHeaders).each(function(d) {
                    B = f(this);
                    v = w.headers[d];
                    w.headerContent[d] = this.innerHTML;
                    z = w.headerTemplate.replace(/\{content\}/g, this.innerHTML).replace(/\{icon\}/g, A);
                    w.onRenderTemplate && (x = w.onRenderTemplate.apply(B, [d, z])) && "string" === typeof x && (z = x);
                    this.innerHTML = '<div class="tablesorter-header-inner">' + z + "</div>";
                    w.onRenderHeader && w.onRenderHeader.apply(B, [d]);
                    this.column = a[this.parentNode.rowIndex + "-" + this.cellIndex];
                    var b = g.getData(B, v, "sortInitialOrder") || w.sortInitialOrder;
                    this.order = /^d/i.test(b) || 1 === b ? [1, 0, 2] : [0, 1, 2];
                    this.count = -1;
                    this.lockedOrder = !1;
                    y = g.getData(B, v, "lockedOrder") || !1;
                    "undefined" !== typeof y && !1 !== y && (this.order = this.lockedOrder = /^d/i.test(y) || 1 === y ? [1, 1, 1] : [0, 0, 0]);
                    B.addClass(w.cssHeader);
                    w.headerList[d] = this;
                    B.parent().addClass(w.cssHeaderRow);
                    B.attr("tabindex", 0)
                });
                E(d);
                w.debug && (t("Built headers:", C), c(w.$headers))
            }

            function y(d, b, a) {
                var e = d.config;
                e.$table.find(e.selectorRemove).remove();
                j(d);
                v(d);
                G(e.$table, b, a)
            }

            function E(d) {
                var b, a = d.config;
                a.$headers.each(function(d, c) {
                    b = "false" === g.getData(c, a.headers[d], "sorter");
                    c.sortDisabled = b;
                    f(c)[b ? "addClass" : "removeClass"]("sorter-false")
                })
            }

            function C(d) {
                var b, a, e, c = d.config,
                    l = c.sortList,
                    p = [c.cssAsc, c.cssDesc],
                    g = f(d).find("tfoot tr").children().removeClass(p.join(" "));
                c.$headers.removeClass(p.join(" "));
                e = l.length;
                for (b = 0; b < e; b++)
                    if (2 !== l[b][1] && (d = c.$headers.not(".sorter-false").filter('[data-column="' + l[b][0] + '"]' + (1 === e ? ":last" : "")), d.length))
                        for (a = 0; a < d.length; a++) d[a].sortDisabled || (d.eq(a).addClass(p[l[b][1]]), g.length && g.filter('[data-column="' + l[b][0] + '"]').eq(a).addClass(p[l[b][1]]))
            }

            function z(d) {
                var b = 0,
                    a = d.config,
                    e = a.sortList,
                    c = e.length,
                    l = d.tBodies.length,
                    p, g, k, h, q, m, j, r, s;
                if (!a.serverSideSorting && a.cache[0]) {
                    a.debug && (p = new Date);
                    for (k = 0; k < l; k++) q = a.cache[k].colMax, s = (m = a.cache[k].normalized) && m[0] ? m[0].length - 1 : 0, m.sort(function(l, p) {
                        for (g = 0; g < c; g++) {
                            h = e[g][0];
                            r = e[g][1];
                            j = /n/i.test(a.parsers && a.parsers[h] ? a.parsers[h].type || "" : "") ? "Numeric" : "Text";
                            j += 0 === r ? "" : "Desc";
                            /Numeric/.test(j) && a.strings[h] && (b = "boolean" === typeof a.string[a.strings[h]] ? (0 === r ? 1 : -1) * (a.string[a.strings[h]] ? -1 : 1) : a.strings[h] ? a.string[a.strings[h]] || 0 : 0);
                            var k = f.tablesorter["sort" + j](d, l[h], p[h], h, q[h], b);
                            if (k) return k
                        }
                        return l[s] - p[s]
                    });
                    a.debug && t("Sorting on " + e.toString() + " and dir " + r + " time", p)
                }
            }

            function I(d, b) {
                d.trigger("updateComplete");
                "function" === typeof b && b(d[0])
            }

            function G(d, b, a) {
                !1 !== b && !d[0].isProcessing ? d.trigger("sorton", [d[0].config.sortList, function() {
                    I(d, a)
                }]) : I(d, a)
            }

            function J(d) {
                var b = d.config,
                    a = b.$table,
                    e, c;
                b.$headers.find(b.selectorSort).add(b.$headers.filter(b.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter", function(a, e) {
                    if (1 !== (a.which || a.button) && !/sort|keypress/.test(a.type) || "keypress" === a.type && 13 !== a.which || "mouseup" === a.type && !0 !== e && 250 < (new Date).getTime() - c) return !1;
                    if ("mousedown" === a.type) return c = (new Date).getTime(), "INPUT" === a.target.tagName ? "" : !b.cancelSelection;
                    b.delayInit && !b.cache && v(d);
                    var n = (/TH|TD/.test(this.tagName) ? f(this) : f(this).parents("th, td").filter(":first"))[0];
                    if (!n.sortDisabled) {
                        var k, h, q, m = d.config,
                            j = !a[m.sortMultiSortKey],
                            r = f(d);
                        r.trigger("sortStart", d);
                        n.count = a[m.sortResetKey] ? 2 : (n.count + 1) % (m.sortReset ? 3 : 2);
                        m.sortRestart && (h = n, m.$headers.each(function() {
                            if (this !== h && (j || !f(this).is("." + m.cssDesc + ",." + m.cssAsc))) this.count = -1
                        }));
                        h = n.column;
                        if (j) {
                            m.sortList = [];
                            if (null !== m.sortForce) {
                                k = m.sortForce;
                                for (q = 0; q < k.length; q++) k[q][0] !== h && m.sortList.push(k[q])
                            }
                            k = n.order[n.count];
                            if (2 > k && (m.sortList.push([h, k]), 1 < n.colSpan))
                                for (q = 1; q < n.colSpan; q++) m.sortList.push([h + q, k])
                        } else if (m.sortAppend && 1 < m.sortList.length && g.isValueInArray(m.sortAppend[0][0], m.sortList) && m.sortList.pop(), g.isValueInArray(h, m.sortList))
                            for (q = 0; q < m.sortList.length; q++) n = m.sortList[q], k = m.headerList[n[0]], n[0] === h && (n[1] = k.order[k.count], 2 === n[1] && (m.sortList.splice(q, 1), k.count = -1));
                        else if (k = n.order[n.count], 2 > k && (m.sortList.push([h, k]), 1 < n.colSpan))
                            for (q = 1; q < n.colSpan; q++) m.sortList.push([h + q, k]);
                        if (null !== m.sortAppend) {
                            k = m.sortAppend;
                            for (q = 0; q < k.length; q++) k[q][0] !== h && m.sortList.push(k[q])
                        }
                        r.trigger("sortBegin", d);
                        setTimeout(function() {
                            C(d);
                            z(d);
                            x(d)
                        }, 1)
                    }
                });
                b.cancelSelection && b.$headers.attr("unselectable", "on").bind("selectstart", !1).css({
                    "user-select": "none",
                    MozUserSelect: "none"
                });
                a.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter", function(a) {
                    a.stopPropagation();
                    b.sortList = [];
                    C(d);
                    z(d);
                    x(d)
                }).bind("updateAll.tablesorter", function(a, b, e) {
                    a.stopPropagation();
                    g.refreshWidgets(d, !0, !0);
                    g.restoreHeaders(d);
                    A(d);
                    J(d);
                    y(d, b, e)
                }).bind("update.tablesorter updateRows.tablesorter", function(a, b, e) {
                    a.stopPropagation();
                    E(d);
                    y(d, b, e)
                }).bind("updateCell.tablesorter", function(e, c, g, k) {
                    e.stopPropagation();
                    a.find(b.selectorRemove).remove();
                    var h, q, m;
                    h = a.find("tbody");
                    e = h.index(f(c).parents("tbody").filter(":first"));
                    var u = f(c).parents("tr").filter(":first");
                    c = f(c)[0];
                    h.length && 0 <= e && (q = h.eq(e).find("tr").index(u), m = c.cellIndex, h = b.cache[e].normalized[q].length - 1, b.cache[e].row[d.config.cache[e].normalized[q][h]] = u, b.cache[e].normalized[q][m] = b.parsers[m].format(r(d, c, m), d, c, m), G(a, g, k))
                }).bind("addRows.tablesorter", function(c, g, f, k) {
                    c.stopPropagation();
                    var h = g.filter("tr").length,
                        u = [],
                        m = g[0].cells.length,
                        t = a.find("tbody").index(g.parents("tbody").filter(":first"));
                    b.parsers || j(d);
                    for (c = 0; c < h; c++) {
                        for (e = 0; e < m; e++) u[e] = b.parsers[e].format(r(d, g[c].cells[e], e), d, g[c].cells[e], e);
                        u.push(b.cache[t].row.length);
                        b.cache[t].row.push([g[c]]);
                        b.cache[t].normalized.push(u);
                        u = []
                    }
                    G(a, f, k)
                }).bind("sorton.tablesorter", function(b, e, c, g) {
                    b.stopPropagation();
                    a.trigger("sortStart", this);
                    var h, u, m, j = d.config;
                    b = e || j.sortList;
                    j.sortList = [];
                    f.each(b, function(a, b) {
                        h = [parseInt(b[0], 10), parseInt(b[1], 10)];
                        if (m = j.headerList[h[0]]) j.sortList.push(h), u = f.inArray(h[1], m.order), m.count = 0 <= u ? u : h[1] % (j.sortReset ? 3 : 2)
                    });
                    C(d);
                    a.trigger("sortBegin", this);
                    z(d);
                    x(d, g);
                    "function" === typeof c && c(d)
                }).bind("appendCache.tablesorter", function(a, b, e) {
                    a.stopPropagation();
                    x(d, e);
                    "function" === typeof b && b(d)
                }).bind("applyWidgetId.tablesorter", function(a, e) {
                    a.stopPropagation();
                    g.getWidgetById(e).format(d, b, b.widgetOptions)
                }).bind("applyWidgets.tablesorter", function(a, b) {
                    a.stopPropagation();
                    g.applyWidget(d, b)
                }).bind("refreshWidgets.tablesorter", function(a, b, e) {
                    a.stopPropagation();
                    g.refreshWidgets(d, b, e)
                }).bind("destroy.tablesorter", function(a, b, e) {
                    a.stopPropagation();
                    g.destroy(d, b, e)
                })
            }
            var g = this;
            g.version = "2.10.8";
            g.parsers = [];
            g.widgets = [];
            g.defaults = {
                theme: "default",
                widthFixed: !1,
                showProcessing: !1,
                headerTemplate: "{content}",
                onRenderTemplate: null,
                onRenderHeader: null,
                cancelSelection: !0,
                dateFormat: "mmddyyyy",
                sortMultiSortKey: "shiftKey",
                sortResetKey: "ctrlKey",
                usNumberFormat: !0,
                delayInit: !1,
                serverSideSorting: !1,
                headers: {},
                ignoreCase: !0,
                sortForce: null,
                sortList: [],
                sortAppend: null,
                sortInitialOrder: "asc",
                sortLocaleCompare: !1,
                sortReset: !1,
                sortRestart: !1,
                emptyTo: "bottom",
                stringTo: "max",
                textExtraction: "simple",
                textSorter: null,
                widgets: [],
                widgetOptions: {
                    zebra: ["even", "odd"]
                },
                initWidgets: !0,
                initialized: null,
                tableClass: "tablesorter",
                cssAsc: "tablesorter-headerAsc",
                cssChildRow: "tablesorter-childRow",
                cssDesc: "tablesorter-headerDesc",
                cssHeader: "tablesorter-header",
                cssHeaderRow: "tablesorter-headerRow",
                cssIcon: "tablesorter-icon",
                cssInfoBlock: "tablesorter-infoOnly",
                cssProcessing: "tablesorter-processing",
                selectorHeaders: "> thead th, > thead td",
                selectorSort: "th, td",
                selectorRemove: ".remove-me",
                debug: !1,
                headerList: [],
                empties: {},
                strings: {},
                parsers: []
            };
            g.log = c;
            g.benchmark = t;
            g.construct = function(d) {
                return this.each(function() {
                    if (!this.tHead || 0 === this.tBodies.length || !0 === this.hasInitialized) return this.config && this.config.debug ? c("stopping initialization! No thead, tbody or tablesorter has already been initialized") : "";
                    var b = f(this),
                        a = this,
                        e, u = "",
                        l = f.metadata;
                    a.hasInitialized = !1;
                    a.isProcessing = !0;
                    a.config = {};
                    e = f.extend(!0, a.config, g.defaults, d);
                    f.data(a, "tablesorter", e);
                    e.debug && f.data(a, "startoveralltimer", new Date);
                    e.supportsTextContent = "x" === f("<span>x</span>")[0].textContent;
                    e.supportsDataObject = 1.4 <= parseFloat(f.fn.jquery);
                    e.string = {
                        max: 1,
                        min: -1,
                        "max+": 1,
                        "max-": -1,
                        zero: 0,
                        none: 0,
                        "null": 0,
                        top: !0,
                        bottom: !1
                    };
                    /tablesorter\-/.test(b.attr("class")) || (u = "" !== e.theme ? " tablesorter-" + e.theme : "");
                    e.$table = b.addClass(e.tableClass + u);
                    e.$tbodies = b.children("tbody:not(." + e.cssInfoBlock + ")");
                    A(a);
                    if (a.config.widthFixed && 0 === f(a).find("colgroup").length) {
                        var p = f("<colgroup>"),
                            n = f(a).width();
                        f(a.tBodies[0]).find("tr:first").children("td").each(function() {
                            p.append(f("<col>").css("width", parseInt(1E3 * (f(this).width() / n), 10) / 10 + "%"))
                        });
                        f(a).prepend(p)
                    }
                    j(a);
                    e.delayInit || v(a);
                    J(a);
                    e.supportsDataObject && "undefined" !== typeof b.data().sortlist ? e.sortList = b.data().sortlist : l && (b.metadata() && b.metadata().sortlist) && (e.sortList = b.metadata().sortlist);
                    g.applyWidget(a, !0);
                    0 < e.sortList.length ? b.trigger("sorton", [e.sortList, {}, !e.initWidgets]) : e.initWidgets && g.applyWidget(a);
                    e.showProcessing && b.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b) {
                        g.isProcessing(a, "sortBegin" === b.type)
                    });
                    a.hasInitialized = !0;
                    a.isProcessing = !1;
                    e.debug && g.benchmark("Overall initialization time", f.data(a, "startoveralltimer"));
                    b.trigger("tablesorter-initialized", a);
                    "function" === typeof e.initialized && e.initialized(a)
                })
            };
            g.isProcessing = function(d, b, a) {
                d = f(d);
                var e = d[0].config;
                d = a || d.find("." + e.cssHeader);
                b ? (0 < e.sortList.length && (d = d.filter(function() {
                    return this.sortDisabled ? !1 : g.isValueInArray(parseFloat(f(this).attr("data-column")), e.sortList)
                })), d.addClass(e.cssProcessing)) : d.removeClass(e.cssProcessing)
            };
            g.processTbody = function(d, b, a) {
                if (a) return d.isProcessing = !0, b.before('<span class="tablesorter-savemyplace"/>'), a = f.fn.detach ? b.detach() : b.remove();
                a = f(d).find("span.tablesorter-savemyplace");
                b.insertAfter(a);
                a.remove();
                d.isProcessing = !1
            };
            g.clearTableBody = function(d) {
                f(d)[0].config.$tbodies.empty()
            };
            g.restoreHeaders = function(d) {
                var b = d.config;
                b.$table.find(b.selectorHeaders).each(function(a) {
                    f(this).find(".tablesorter-header-inner").length && f(this).html(b.headerContent[a])
                })
            };
            g.destroy = function(d, b, a) {
                d = f(d)[0];
                if (d.hasInitialized) {
                    g.refreshWidgets(d, !0, !0);
                    var e = f(d),
                        c = d.config,
                        l = e.find("thead:first"),
                        p = l.find("tr." + c.cssHeaderRow).removeClass(c.cssHeaderRow),
                        n = e.find("tfoot:first > tr").children("th, td");
                    l.find("tr").not(p).remove();
                    e.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter "));
                    c.$headers.add(n).removeClass(c.cssHeader + " " + c.cssAsc + " " + c.cssDesc).removeAttr("data-column");
                    p.find(c.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter");
                    g.restoreHeaders(d);
                    !1 !== b && e.removeClass(c.tableClass + " tablesorter-" + c.theme);
                    d.hasInitialized = !1;
                    "function" === typeof a && a(d)
                }
            };
            g.regex = [/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, /^0x[0-9a-f]+$/i];
            g.sortText = function(d, b, a, e) {
                if (b === a) return 0;
                var c = d.config,
                    l = c.string[c.empties[e] || c.emptyTo],
                    f = g.regex;
                if ("" === b && 0 !== l) return "boolean" === typeof l ? l ? -1 : 1 : -l || -1;
                if ("" === a && 0 !== l) return "boolean" === typeof l ? l ? 1 : -1 : l || 1;
                if ("function" === typeof c.textSorter) return c.textSorter(b, a, d, e);
                d = b.replace(f[0], "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
                e = a.replace(f[0], "\\0$1\\0").replace(/\\0$/, "").replace(/^\\0/, "").split("\\0");
                b = parseInt(b.match(f[2]), 16) || 1 !== d.length && b.match(f[1]) && Date.parse(b);
                if (a = parseInt(a.match(f[2]), 16) || b && a.match(f[1]) && Date.parse(a) || null) {
                    if (b < a) return -1;
                    if (b > a) return 1
                }
                c = Math.max(d.length, e.length);
                for (b = 0; b < c; b++) {
                    a = isNaN(d[b]) ? d[b] || 0 : parseFloat(d[b]) || 0;
                    f = isNaN(e[b]) ? e[b] || 0 : parseFloat(e[b]) || 0;
                    if (isNaN(a) !== isNaN(f)) return isNaN(a) ? 1 : -1;
                    typeof a !== typeof f && (a += "", f += "");
                    if (a < f) return -1;
                    if (a > f) return 1
                }
                return 0
            };
            g.sortTextDesc = function(d, b, a, e) {
                if (b === a) return 0;
                var c = d.config,
                    f = c.string[c.empties[e] || c.emptyTo];
                return "" === b && 0 !== f ? "boolean" === typeof f ? f ? -1 : 1 : f || 1 : "" === a && 0 !== f ? "boolean" === typeof f ? f ? 1 : -1 : -f || -1 : "function" === typeof c.textSorter ? c.textSorter(a, b, d, e) : g.sortText(d, a, b)
            };
            g.getTextValue = function(d, b, a) {
                if (b) {
                    var c = d ? d.length : 0,
                        g = b + a;
                    for (b = 0; b < c; b++) g += d.charCodeAt(b);
                    return a * g
                }
                return 0
            };
            g.sortNumeric = function(d, b, a, c, f, l) {
                if (b === a) return 0;
                d = d.config;
                c = d.string[d.empties[c] || d.emptyTo];
                if ("" === b && 0 !== c) return "boolean" === typeof c ? c ? -1 : 1 : -c || -1;
                if ("" === a && 0 !== c) return "boolean" === typeof c ? c ? 1 : -1 : c || 1;
                isNaN(b) && (b = g.getTextValue(b, f, l));
                isNaN(a) && (a = g.getTextValue(a, f, l));
                return b - a
            };
            g.sortNumericDesc = function(d, b, a, c, f, l) {
                if (b === a) return 0;
                d = d.config;
                c = d.string[d.empties[c] || d.emptyTo];
                if ("" === b && 0 !== c) return "boolean" === typeof c ? c ? -1 : 1 : c || 1;
                if ("" === a && 0 !== c) return "boolean" === typeof c ? c ? 1 : -1 : -c || -1;
                isNaN(b) && (b = g.getTextValue(b, f, l));
                isNaN(a) && (a = g.getTextValue(a, f, l));
                return a - b
            };
            g.characterEquivalents = {
                a: "\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",
                A: "\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",
                c: "\u00e7\u0107\u010d",
                C: "\u00c7\u0106\u010c",
                e: "\u00e9\u00e8\u00ea\u00eb\u011b\u0119",
                E: "\u00c9\u00c8\u00ca\u00cb\u011a\u0118",
                i: "\u00ed\u00ec\u0130\u00ee\u00ef\u0131",
                I: "\u00cd\u00cc\u0130\u00ce\u00cf",
                o: "\u00f3\u00f2\u00f4\u00f5\u00f6",
                O: "\u00d3\u00d2\u00d4\u00d5\u00d6",
                ss: "\u00df",
                SS: "\u1e9e",
                u: "\u00fa\u00f9\u00fb\u00fc\u016f",
                U: "\u00da\u00d9\u00db\u00dc\u016e"
            };
            g.replaceAccents = function(d) {
                var b, a = "[",
                    c = g.characterEquivalents;
                if (!g.characterRegex) {
                    g.characterRegexArray = {};
                    for (b in c) "string" === typeof b && (a += c[b], g.characterRegexArray[b] = RegExp("[" + c[b] + "]", "g"));
                    g.characterRegex = RegExp(a + "]")
                }
                if (g.characterRegex.test(d))
                    for (b in c) "string" === typeof b && (d = d.replace(g.characterRegexArray[b], b));
                return d
            };
            g.isValueInArray = function(d, b) {
                var a, c = b.length;
                for (a = 0; a < c; a++)
                    if (b[a][0] === d) return !0;
                return !1
            };
            g.addParser = function(d) {
                var b, a = g.parsers.length,
                    c = !0;
                for (b = 0; b < a; b++) g.parsers[b].id.toLowerCase() === d.id.toLowerCase() && (c = !1);
                c && g.parsers.push(d)
            };
            g.getParserById = function(d) {
                var b, a = g.parsers.length;
                for (b = 0; b < a; b++)
                    if (g.parsers[b].id.toLowerCase() === d.toString().toLowerCase()) return g.parsers[b];
                return !1
            };
            g.addWidget = function(d) {
                g.widgets.push(d)
            };
            g.getWidgetById = function(d) {
                var b, a, c = g.widgets.length;
                for (b = 0; b < c; b++)
                    if ((a = g.widgets[b]) && a.hasOwnProperty("id") && a.id.toLowerCase() === d.toLowerCase()) return a
            };
            g.applyWidget = function(d, b) {
                d = f(d)[0];
                var a = d.config,
                    c = a.widgetOptions,
                    j = [],
                    l, p, n;
                a.debug && (l = new Date);
                a.widgets.length && (a.widgets = f.grep(a.widgets, function(b, d) {
                    return f.inArray(b, a.widgets) === d
                }), f.each(a.widgets || [], function(a, b) {
                    if ((n = g.getWidgetById(b)) && n.id) n.priority || (n.priority = 10), j[a] = n
                }), j.sort(function(a, b) {
                    return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1
                }), f.each(j, function(g, h) {
                    h && (b ? (h.hasOwnProperty("options") && (c = d.config.widgetOptions = f.extend(!0, {}, h.options, c)), h.hasOwnProperty("init") && h.init(d, h, a, c)) : !b && h.hasOwnProperty("format") && h.format(d, a, c, !1))
                }));
                a.debug && (p = a.widgets.length, t("Completed " + (!0 === b ? "initializing " : "applying ") + p + " widget" + (1 !== p ? "s" : ""), l))
            };
            g.refreshWidgets = function(d, b, a) {
                d = f(d)[0];
                var e, j = d.config,
                    l = j.widgets,
                    p = g.widgets,
                    n = p.length;
                for (e = 0; e < n; e++)
                    if (p[e] && p[e].id && (b || 0 > f.inArray(p[e].id, l))) j.debug && c("Refeshing widgets: Removing " + p[e].id), p[e].hasOwnProperty("remove") && p[e].remove(d, j, j.widgetOptions);
                    !0 !== a && g.applyWidget(d, b)
            };
            g.getData = function(d, b, a) {
                var c = "";
                d = f(d);
                var g, l;
                if (!d.length) return "";
                g = f.metadata ? d.metadata() : !1;
                l = " " + (d.attr("class") || "");
                "undefined" !== typeof d.data(a) || "undefined" !== typeof d.data(a.toLowerCase()) ? c += d.data(a) || d.data(a.toLowerCase()) : g && "undefined" !== typeof g[a] ? c += g[a] : b && "undefined" !== typeof b[a] ? c += b[a] : " " !== l && l.match(" " + a + "-") && (c = l.match(RegExp("\\s" + a + "-([\\w-]+)"))[1] || "");
                return f.trim(c)
            };
            g.formatFloat = function(c, b) {
                if ("string" !== typeof c || "" === c) return c;
                var a;
                c = (b && b.config ? !1 !== b.config.usNumberFormat : "undefined" !== typeof b ? b : 1) ? c.replace(/,/g, "") : c.replace(/[\s|\.]/g, "").replace(/,/g, ".");
                /^\s*\([.\d]+\)/.test(c) && (c = c.replace(/^\s*\(/, "-").replace(/\)/, ""));
                a = parseFloat(c);
                return isNaN(a) ? f.trim(c) : a
            };
            g.isDigit = function(c) {
                return isNaN(c) ? /^[\-+(]?\d+[)]?$/.test(c.toString().replace(/[,.'"\s]/g, "")) : !0
            }
        }
    });
    var j = f.tablesorter;
    f.fn.extend({
        tablesorter: j.construct
    });
    j.addParser({
        id: "text",
        is: function() {
            return !0
        },
        format: function(c, t) {
            var r = t.config;
            c && (c = f.trim(r.ignoreCase ? c.toLocaleLowerCase() : c), c = r.sortLocaleCompare ? j.replaceAccents(c) : c);
            return c
        },
        type: "text"
    });
    j.addParser({
        id: "digit",
        is: function(c) {
            return j.isDigit(c)
        },
        format: function(c, t) {
            var r = j.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), t);
            return c && "number" === typeof r ? r : c ? f.trim(c && t.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "currency",
        is: function(c) {
            return /^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((c || "").replace(/[,. ]/g, ""))
        },
        format: function(c, t) {
            var r = j.formatFloat((c || "").replace(/[^\w,. \-()]/g, ""), t);
            return c && "number" === typeof r ? r : c ? f.trim(c && t.config.ignoreCase ? c.toLocaleLowerCase() : c) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "ipAddress",
        is: function(c) {
            return /^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(c)
        },
        format: function(c, f) {
            var r, s = c ? c.split(".") : "",
                v = "",
                x = s.length;
            for (r = 0; r < x; r++) v += ("00" + s[r]).slice(-3);
            return c ? j.formatFloat(v, f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "url",
        is: function(c) {
            return /^(https?|ftp|file):\/\//.test(c)
        },
        format: function(c) {
            return c ? f.trim(c.replace(/(https?|ftp|file):\/\//, "")) : c
        },
        type: "text"
    });
    j.addParser({
        id: "isoDate",
        is: function(c) {
            return /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(c)
        },
        format: function(c, f) {
            return c ? j.formatFloat("" !== c ? (new Date(c.replace(/-/g, "/"))).getTime() || "" : "", f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "percent",
        is: function(c) {
            return /(\d\s*?%|%\s*?\d)/.test(c) && 15 > c.length
        },
        format: function(c, f) {
            return c ? j.formatFloat(c.replace(/%/g, ""), f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "usLongDate",
        is: function(c) {
            return /^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(c) || /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(c)
        },
        format: function(c, f) {
            return c ? j.formatFloat((new Date(c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "shortDate",
        is: function(c) {
            return /(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((c || "").replace(/\s+/g, " ").replace(/[\-.,]/g, "/"))
        },
        format: function(c, f, r, s) {
            if (c) {
                r = f.config;
                var v = r.headerList[s];
                s = v.dateFormat || j.getData(v, r.headers[s], "dateFormat") || r.dateFormat;
                c = c.replace(/\s+/g, " ").replace(/[\-.,]/g, "/");
                "mmddyyyy" === s ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$1/$2") : "ddmmyyyy" === s ? c = c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1") : "yyyymmdd" === s && (c = c.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/, "$1/$2/$3"))
            }
            return c ? j.formatFloat((new Date(c)).getTime() || "", f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "time",
        is: function(c) {
            return /^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(c)
        },
        format: function(c, f) {
            return c ? j.formatFloat((new Date("2000/01/01 " + c.replace(/(\S)([AP]M)$/i, "$1 $2"))).getTime() || "", f) : c
        },
        type: "numeric"
    });
    j.addParser({
        id: "metadata",
        is: function() {
            return !1
        },
        format: function(c, j, r) {
            c = j.config;
            c = !c.parserMetadataName ? "sortValue" : c.parserMetadataName;
            return f(r).metadata()[c]
        },
        type: "numeric"
    });
    j.addWidget({
        id: "zebra",
        priority: 90,
        format: function(c, t, r) {
            var s, v, x, A, y, E, C = RegExp(t.cssChildRow, "i"),
                z = t.$tbodies;
            t.debug && (y = new Date);
            for (c = 0; c < z.length; c++) s = z.eq(c), E = s.children("tr").length, 1 < E && (x = 0, s = s.children("tr:visible"), s.each(function() {
                v = f(this);
                C.test(this.className) || x++;
                A = 0 === x % 2;
                v.removeClass(r.zebra[A ? 1 : 0]).addClass(r.zebra[A ? 0 : 1])
            }));
            t.debug && j.benchmark("Applying Zebra widget", y)
        },
        remove: function(c, j, r) {
            var s;
            j = j.$tbodies;
            var v = (r.zebra || ["even", "odd"]).join(" ");
            for (r = 0; r < j.length; r++) s = f.tablesorter.processTbody(c, j.eq(r), !0), s.children().removeClass(v), f.tablesorter.processTbody(c, s, !1)
        }
    })
}(jQuery);
/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 */
(function() {
    function m() {
        var e = !1;
        if ("localStorage" in window) try {
            window.localStorage.setItem("_tmptest", "tmpval"), e = !0, window.localStorage.removeItem("_tmptest")
        } catch (t) {}
        if (e) try {
                window.localStorage && (i = window.localStorage, u = "localStorage", l = i.jStorage_update)
            } catch (n) {} else if ("globalStorage" in window) try {
                window.globalStorage && (i = window.globalStorage[window.location.hostname], u = "globalStorage", l = i.jStorage_update)
            } catch (r) {} else {
                s = document.createElement("link");
                if (!s.addBehavior) {
                    s = null;
                    return
                }
                s.style.behavior = "url(#default#userData)", document.getElementsByTagName("head")[0].appendChild(s), s.load("jStorage");
                var o = "{}";
                try {
                    o = s.getAttribute("jStorage")
                } catch (a) {}
                try {
                    l = s.getAttribute("jStorage_update")
                } catch (f) {}
                i.jStorage = o, u = "userDataBehavior"
            }
            x(), C(), y(), k(), "addEventListener" in window && window.addEventListener("pageshow", function(e) {
            e.persisted && b()
        }, !1)
    }

    function g() {
        var e = "{}";
        if (u == "userDataBehavior") {
            s.load("jStorage");
            try {
                e = s.getAttribute("jStorage")
            } catch (t) {}
            try {
                l = s.getAttribute("jStorage_update")
            } catch (n) {}
            i.jStorage = e
        }
        x(), C(), k()
    }

    function y() {
        u == "localStorage" || u == "globalStorage" ? "addEventListener" in window ? window.addEventListener("storage", b, !1) : document.attachEvent("onstorage", b) : u == "userDataBehavior" && setInterval(b, 1e3)
    }

    function b() {
        var e;
        clearTimeout(f), f = setTimeout(function() {
            if (u == "localStorage" || u == "globalStorage") e = i.jStorage_update;
            else if (u == "userDataBehavior") {
                s.load("jStorage");
                try {
                    e = s.getAttribute("jStorage_update")
                } catch (t) {}
            }
            e && e != l && (l = e, w())
        }, 25)
    }

    function w() {
        var e = n.parse(n.stringify(r.__jstorage_meta.CRC32)),
            t;
        g(), t = n.parse(n.stringify(r.__jstorage_meta.CRC32));
        var i, s = [],
            o = [];
        for (i in e)
            if (e.hasOwnProperty(i)) {
                if (!t[i]) {
                    o.push(i);
                    continue
                }
                e[i] != t[i] && s.push(i)
            }
        for (i in t) t.hasOwnProperty(i) && (e[i] || s.push(i));
        E(s, "updated"), E(o, "deleted")
    }

    function E(e, t) {
        e = [].concat(e || []);
        if (t == "flushed") {
            e = [];
            for (var n in a) a.hasOwnProperty(n) && e.push(n);
            t = "deleted"
        }
        for (var r = 0, i = e.length; r < i; r++)
            if (a[e[r]])
                for (var s = 0, o = a[e[r]].length; s < o; s++) a[e[r]][s](e[r], t)
    }

    function S() {
        var e = (+(new Date)).toString();
        u == "localStorage" || u == "globalStorage" ? i.jStorage_update = e : u == "userDataBehavior" && (s.setAttribute("jStorage_update", e), s.save("jStorage")), b()
    }

    function x() {
        if (i.jStorage) try {
            r = n.parse(String(i.jStorage))
        } catch (e) {
            i.jStorage = "{}"
        } else i.jStorage = "{}";
        o = i.jStorage ? String(i.jStorage).length : 0, r.__jstorage_meta || (r.__jstorage_meta = {}), r.__jstorage_meta.CRC32 || (r.__jstorage_meta.CRC32 = {})
    }

    function T() {
        A();
        try {
            i.jStorage = n.stringify(r), s && (s.setAttribute("jStorage", i.jStorage), s.save("jStorage")), o = i.jStorage ? String(i.jStorage).length : 0
        } catch (e) {}
    }

    function N(e) {
        if (!e || typeof e != "string" && typeof e != "number") throw new TypeError("Key name must be string or numeric");
        if (e == "__jstorage_meta") throw new TypeError("Reserved key name");
        return !0
    }

    function C() {
        var e, t, n, i, s = Infinity,
            o = !1,
            u = [];
        clearTimeout(p);
        if (!r.__jstorage_meta || typeof r.__jstorage_meta.TTL != "object") return;
        e = +(new Date), n = r.__jstorage_meta.TTL, i = r.__jstorage_meta.CRC32;
        for (t in n) n.hasOwnProperty(t) && (n[t] <= e ? (delete n[t], delete i[t], delete r[t], o = !0, u.push(t)) : n[t] < s && (s = n[t]));
        s != Infinity && (p = setTimeout(C, s - e)), o && (T(), S(), E(u, "deleted"))
    }

    function k() {
        if (!r.__jstorage_meta.PubSub) return;
        var e, t = h;
        for (var n = len = r.__jstorage_meta.PubSub.length - 1; n >= 0; n--) e = r.__jstorage_meta.PubSub[n], e[0] > h && (t = e[0], L(e[1], e[2]));
        h = t
    }

    function L(e, t) {
        if (c[e])
            for (var r = 0, i = c[e].length; r < i; r++) c[e][r](e, n.parse(n.stringify(t)))
    }

    function A() {
        if (!r.__jstorage_meta.PubSub) return;
        var e = +(new Date) - 2e3;
        for (var t = 0, n = r.__jstorage_meta.PubSub.length; t < n; t++)
            if (r.__jstorage_meta.PubSub[t][0] <= e) {
                r.__jstorage_meta.PubSub.splice(t, r.__jstorage_meta.PubSub.length - t);
                break
            }
        r.__jstorage_meta.PubSub.length || delete r.__jstorage_meta.PubSub
    }

    function O(e, t) {
        r.__jstorage_meta || (r.__jstorage_meta = {}), r.__jstorage_meta.PubSub || (r.__jstorage_meta.PubSub = []), r.__jstorage_meta.PubSub.unshift([+(new Date), e, t]), T(), S()
    }

    function M(e, t) {
        t = t || 0;
        var n = 0,
            r = 0;
        t ^= -1;
        for (var i = 0, s = e.length; i < s; i++) n = (t ^ e.charCodeAt(i)) & 255, r = "0x" + d.substr(n * 9, 8), t = t >>> 8 ^ r;
        return t ^ -1
    }
    var e = "0.2.5",
        t = window.jQuery || window.$ || (window.$ = {}),
        n = {
            parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(e) {
                return String(e).evalJSON()
            } || t.parseJSON || t.evalJSON,
            stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || t.toJSON
        };
    if (!n.parse || !n.stringify) throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var r = {},
        i = {
            jStorage: "{}"
        },
        s = null,
        o = 0,
        u = !1,
        a = {},
        f = !1,
        l = 0,
        c = {},
        h = +(new Date),
        p, d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",
        v = {
            isXML: function(e) {
                var t = (e ? e.ownerDocument || e : 0).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            },
            encode: function(e) {
                if (!this.isXML(e)) return !1;
                try {
                    return (new XMLSerializer).serializeToString(e)
                } catch (t) {
                    try {
                        return e.xml
                    } catch (n) {}
                }
                return !1
            },
            decode: function(e) {
                var t = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function(e) {
                        var t = new ActiveXObject("Microsoft.XMLDOM");
                        return t.async = "false", t.loadXML(e), t
                    },
                    n;
                return t ? (n = t.call("DOMParser" in window && new DOMParser || window, e, "text/xml"), this.isXML(n) ? n : !1) : !1
            }
        };
    t.jStorage = {
        version: e,
        set: function(e, t, i) {
            N(e), i = i || {};
            if (typeof t == "undefined") return this.deleteKey(e), t;
            if (v.isXML(t)) t = {
                _is_xml: !0,
                xml: v.encode(t)
            };
            else {
                if (typeof t == "function") return undefined;
                t && typeof t == "object" && (t = n.parse(n.stringify(t)))
            }
            return r[e] = t, r.__jstorage_meta.CRC32[e] = M(n.stringify(t)), this.setTTL(e, i.TTL || 0), E(e, "updated"), t
        },
        get: function(e, t) {
            return N(e), e in r ? r[e] && typeof r[e] == "object" && r[e]._is_xml && r[e]._is_xml ? v.decode(r[e].xml) : r[e] : typeof t == "undefined" ? null : t
        },
        deleteKey: function(e) {
            return N(e), e in r ? (delete r[e], typeof r.__jstorage_meta.TTL == "object" && e in r.__jstorage_meta.TTL && delete r.__jstorage_meta.TTL[e], delete r.__jstorage_meta.CRC32[e], T(), S(), E(e, "deleted"), !0) : !1
        },
        setTTL: function(e, t) {
            var n = +(new Date);
            return N(e), t = Number(t) || 0, e in r ? (r.__jstorage_meta.TTL || (r.__jstorage_meta.TTL = {}), t > 0 ? r.__jstorage_meta.TTL[e] = n + t : delete r.__jstorage_meta.TTL[e], T(), C(), S(), !0) : !1
        },
        getTTL: function(e) {
            var t = +(new Date),
                n;
            return N(e), e in r && r.__jstorage_meta.TTL && r.__jstorage_meta.TTL[e] ? (n = r.__jstorage_meta.TTL[e] - t, n || 0) : 0
        },
        flush: function() {
            return r = {
                __jstorage_meta: {
                    CRC32: {}
                }
            }, T(), S(), E(null, "flushed"), !0
        },
        storageObj: function() {
            function e() {}
            return e.prototype = r, new e
        },
        index: function() {
            var e = [],
                t;
            for (t in r) r.hasOwnProperty(t) && t != "__jstorage_meta" && e.push(t);
            return e
        },
        storageSize: function() {
            return o
        },
        currentBackend: function() {
            return u
        },
        storageAvailable: function() {
            return !!u
        },
        listenKeyChange: function(e, t) {
            N(e), a[e] || (a[e] = []), a[e].push(t)
        },
        stopListening: function(e, t) {
            N(e);
            if (!a[e]) return;
            if (!t) {
                delete a[e];
                return
            }
            for (var n = a[e].length - 1; n >= 0; n--) a[e][n] == t && a[e].splice(n, 1)
        },
        subscribe: function(e, t) {
            e = (e || "").toString();
            if (!e) throw new TypeError("Channel not defined");
            c[e] || (c[e] = []), c[e].push(t)
        },
        publish: function(e, t) {
            e = (e || "").toString();
            if (!e) throw new TypeError("Channel not defined");
            O(e, t)
        },
        reInit: function() {
            g()
        }
    }, m()
})();
/**
 *  printArea
 *  Version 2.4.0 Copyright (C) 2013
 *  Tested in IE 11, FF 28.0 and Chrome 33.0.1750.154
 *  No official support for other browsers, but will TRY to accommodate challenges in other browsers.
 */
! function(a) {
    var b = 0,
        c = {
            iframe: "iframe",
            popup: "popup"
        },
        d = {
            strict: "strict",
            loose: "loose",
            html5: "html5"
        },
        e = {
            mode: c.iframe,
            standard: d.html5,
            popHt: 500,
            popWd: 400,
            popX: 200,
            popY: 200,
            popTitle: "",
            popClose: !1,
            extraCss: "",
            extraHead: "",
            retainAttr: ["id", "class", "style"]
        },
        f = {};
    a.fn.printArea = function(c) {
        a.extend(f, e, c), b++;
        var d = "printArea_";
        a("[id^=" + d + "]").remove(), f.id = d + b;
        var h = a(this),
            i = g.getPrintWindow();
        g.write(i.doc, h), setTimeout(function() {
            g.print(i)
        }, 1e3)
    };
    var g = {
        print: function(b) {
            var d = b.win;
            a(b.doc).ready(function() {
                d.focus(), d.print(), f.mode == c.popup && f.popClose && setTimeout(function() {
                    d.close()
                }, 2e3)
            })
        },
        write: function(a, b) {
            a.open(), a.write(g.docType() + "<html>" + g.getHead() + g.getBody(b) + "</html>"), a.close()
        },
        docType: function() {
            if (f.mode == c.iframe) return "";
            if (f.standard == d.html5) return "<!DOCTYPE html>";
            var a = f.standard == d.loose ? " Transitional" : "",
                b = f.standard == d.loose ? "loose" : "strict";
            return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + a + '//EN" "http://www.w3.org/TR/html4/' + b + '.dtd">'
        },
        getHead: function() {
            var b = "",
                c = "";
            return f.extraHead && f.extraHead.replace(/([^,]+)/g, function(a) {
                b += a
            }), a(document).find("link").filter(function() {
                var b = a(this).attr("rel");
                return 0 == ("undefined" === a.type(b)) && "stylesheet" == b.toLowerCase()
            }).filter(function() {
                var b = a(this).attr("media");
                return "undefined" === a.type(b) || "" == b || "print" == b.toLowerCase() || "all" == b.toLowerCase()
            }).each(function() {
                c += '<link type="text/css" rel="stylesheet" href="' + a(this).attr("href") + '" >'
            }), f.extraCss && f.extraCss.replace(/([^,\s]+)/g, function(a) {
                c += '<link type="text/css" rel="stylesheet" href="' + a + '">'
            }), "<head><title>" + f.popTitle + "</title>" + b + c + "</head>"
        },
        getBody: function(b) {
            var c = "",
                d = f.retainAttr;
            return b.each(function() {
                for (var b = g.getFormData(a(this)), e = "", f = 0; f < d.length; f++) {
                    var h = a(b).attr(d[f]);
                    h && (e += (e.length > 0 ? " " : "") + d[f] + "='" + h + "'")
                }
                c += "<div " + e + ">" + a(b).html() + "</div>"
            }), "<body>" + c + "</body>"
        },
        getFormData: function(b) {
            var c = b.clone(),
                d = a("input,select,textarea", c);
            return a("input,select,textarea", b).each(function(b) {
                var c = a(this).attr("type");
                "undefined" === a.type(c) && (c = a(this).is("select") ? "select" : a(this).is("textarea") ? "textarea" : "");
                var e = d.eq(b);
                "radio" == c || "checkbox" == c ? e.attr("checked", a(this).is(":checked")) : "text" == c ? e.attr("value", a(this).val()) : "select" == c ? a(this).find("option").each(function(b) {
                    a(this).is(":selected") && a("option", e).eq(b).attr("selected", !0)
                }) : "textarea" == c && e.text(a(this).val())
            }), c
        },
        getPrintWindow: function() {
            switch (f.mode) {
                case c.iframe:
                    var a = new g.Iframe;
                    return {
                        win: a.contentWindow || a,
                        doc: a.doc
                    };
                case c.popup:
                    var b = new g.Popup;
                    return {
                        win: b,
                        doc: b.doc
                    }
            }
        },
        Iframe: function() {
            var d, b = f.id,
                c = "border:0;position:absolute;width:0px;height:0px;right:0px;top:0px;";
            try {
                d = document.createElement("iframe"), document.body.appendChild(d), a(d).attr({
                    style: c,
                    id: b,
                    src: "#" + (new Date).getTime()
                }), d.doc = null, d.doc = d.contentDocument ? d.contentDocument : d.contentWindow ? d.contentWindow.document : d.document
            } catch (e) {
                throw e + ". iframes may not be supported in this browser."
            }
            if (null == d.doc) throw "Cannot find document.";
            return d
        },
        Popup: function() {
            var a = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no";
            a += ",width=" + f.popWd + ",height=" + f.popHt, a += ",resizable=yes,screenX=" + f.popX + ",screenY=" + f.popY + ",personalbar=no,scrollbars=yes";
            var b = window.open("", "_blank", a);
            return b.doc = b.document, b
        }
    }
}(jQuery);