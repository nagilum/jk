/**
 * jk JavaScript library
 * Extends DOM, gives tools and app-like features.
 * 
 * @author
 * Stian Hanger <pdnagilum@gmail.com>
 * 
 * @repo
 * https://github.com/nagilum/jk
 */

"use strict";

// #region Extend Element with jQuery-like functions.

/**
 * Add a CSS class.
 * @param {String} name
 * @returns {Element}
 */
Element.prototype.addClass = function (name) {
    this.classList.add(name);
    return this;
};

/**
 * Append a DOM element as a child to another.
 * @param {Element} element
 * @returns {Element}
 */
Element.prototype.append = function (element) {
    this.appendChild(element);
    return this;
};

/**
 * Get or set an attribute.
 * @param {String} name
 * @param {String} value
 * @returns {Element | String}
 */
Element.prototype.attr = function (name, value) {
    if (typeof(value) !== 'undefined') {
        this.setAttribute(name, value);
        return this;
    }
    else {
        return this.getAttribute(name);
    }
};

/**
 * Get or set CSS on element.
 * @param {String | Object} obj
 * @returns {Element | String}
 */
Element.prototype.css = function (obj) {
    let type = typeof(obj);

    if (type === 'string') {
        return window.getComputedStyle(this).getPropertyValue(obj);
    }

    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        this.style[key] = obj[key];
    }

    return this;
};

/**
 * Remove all child nodes from an element.
 * @returns {Element}
 */
Element.prototype.empty = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }

    return this;
};

/**
 * Check if an element has a CSS class.
 * @param {String} name
 * @returns {Boolean}
 */
Element.prototype.hasClass = function (name) {
    return this.classList.contains(name);
};

/**
 * Check if an element has a specific attribute.
 * @param {String} name
 * @returns {Boolean}
 */
Element.prototype.hasAttr = function (name) {
    return this.hasAttribute(name);
};

/**
 * Add HTML to the element.
 * @param {String} html
 * @returns {Element}
 */
Element.prototype.html = function (html) {
    this.innerHTML = html;
    return this;
};

/**
 * Add event listener.
 * @param {String} eventName
 * @param {Function} callback
 * @returns {Element}
 */
Element.prototype.on = function (eventName, callback) {
    this.addEventListener(eventName, callback);
    return this;
};

/**
 * Get the parent element.
 * @returns {Element}
 */
Element.prototype.parent = function () {
    return this.parentElement;
};

/**
 * Query DOM for element among children of this element.
 * @param {String} selector
 * @returns {Element}
 */
Element.prototype.qs = function (selector) {
    return this.querySelector(selector);
};

/**
 * Query DOM for elements among children of this element.
 * @param {String} selector
 * @returns {Array}
 */
Element.prototype.qsa = function (selector) {
    return this.querySelectorAll(selector);
};

/**
 * Remove self from parent.
 * @returns {Element}
 */
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
    return this;
};

/**
 * Remove CSS class.
 * @param {String} name
 * @returns {Element}
 */
Element.prototype.removeClass = function (name) {
    this.classList.remove(name);
    return this;
};

/**
 * Remove attribute.
 * @param {String} name
 * @returns {Element}
 */
Element.prototype.removeAttr = function (name) {
    this.removeAttribute(name);
    return this;
};

/**
 * Add text to the element.
 * @param {String} text
 * @returns {Element}
 */
Element.prototype.text = function (text) {
    this.innerText = text;
    return this;
};

/**
 * Toggle the CSS class.
 * @param {String} name
 * @returns {Element}
 */
Element.prototype.toggleClass = function (name) {
    this.classList.toggle(name);
    return this;
};

/**
 * Toggle attribute.
 * @param {String} name
 * @returns {Element}
 */
Element.prototype.toggleAttr = function (name) {
    if (this.hasAttribute(name)) {
        this.removeAttribute(name);
    }
    else {
        this.setAttribute(name, '');
    }

    return this;
};

// #endregion

// #region Extend Array with LINQ-like functions.

/**
 * Determine if all elements in the array satisfy a condition.
 * @param {Function} predicate
 * @returns {Boolean}
 */
Array.prototype.all = function (predicate) {
    return this.where(predicate).length === this.length;
};

/**
 * Determine if any elements in the array satisfy a condition.
 * @param {Function} predicate
 * @returns {Boolean}
 */
Array.prototype.any = function (predicate) {
    if (predicate) {
        return this.where(predicate).length > 0;
    }
    else {
        return this.length > 0;
    }
};

/**
 * Make a copy of an array.
 * @returns {Array}
 */
Array.prototype.copy = function () {
    let list = [];

    this.forEach((item) => {
        list.push(item);
    });

    return list;
};

/**
 * Returns distinct elements from an array.
 * @returns {Array}
 */
Array.prototype.distinct = function () {
    let list = [];

    this.forEach((item) => {
        let found = false;

        list.forEach((it) => {
            if (found) {
                return;
            }

            if (JSON.stringify(it) === JSON.stringify(item)) {
                found = true;
            }
        })

        if (!found) {
            list.push(item);
        }
    });

    return list;
};

/**
 * Return the first element of an array that satisfy the a condition.
 * @param {Function} predicate
 * @returns {Object}
 */
Array.prototype.first = function (predicate) {
    if (this.length === 0) {
        return null;
    }

    if (predicate) {
        let list = this.where(predicate);

        return list.length > 0
            ? list[0]
            : null;
    }
    else {
        return this[0];
    }
};

/**
 * Sort the elements in the array ascending based on key.
 * @param {String} key
 * @returns {Array}
 */
Array.prototype.orderBy = function (key) {
    if (this.length < 2) {
        return this;
    }

    let list = [];

    this.forEach((item) => {
        list.push(item);
    });

    let type = typeof(this[0]);

    list.sort((a, b) => {
        switch (type) {
            case 'boolean':
                return (a[key] === b[key])
                    ? 0
                    : a[key]
                        ? -1
                        : 1;

            case 'number':
                return a[key] - b[key];

            case 'string':
                let au = a[key].toUpperCase(),
                    bu = b[key].toUpperCase();

                if (au < bu) {
                    return -1;
                }

                if (au > bu) {
                    return 1;
                }

                return 0;
        }
    });

    return list;
};

/**
 * Sort the elements in the array descending based on key.
 * @param {String} key
 * @returns {Array}
 */
Array.prototype.orderByDescending = function (key) {
    return this
        .orderBy(key)
        .copy()
        .reverse();
};

/**
 * Project each element in array into new form.
 * @param {Any} map
 * @returns {Array}
 */
Array.prototype.select = function (map) {
    let list = [];

    this.forEach((item) => {
        let obj = {};

        for (let key in map) {
            obj[key] = map[key](item);
        }

        list.push(obj);
    });

    return list;
};

/**
 * Bypass a specific number of elements in the array.
 * @param {Number} number
 * @returns {Array}
 */
Array.prototype.skip = function (number) {
    return this.slice(number);
};

/**
 * Return a specific number of elements in the array.
 * @param {Number} number
 * @returns {Array}
 */
Array.prototype.take = function (number) {
    return this.slice(0, number);
};

/**
 * Filter an array of values based on a predicate.
 * @param {Function} predicate
 * @returns {Array}
 */
Array.prototype.where = function (predicate) {
    return this.filter((item) => predicate(item));
};

// #endregion

// #region Extend jk with AJAX functions.

/**
 * Perform a DELETE call.
 * @param {String} url
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.delete = function (url, headers) {
    let settings = {
        method: 'DELETE'
    };

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

/**
 * Perform a GET call.
 * @param {String} url
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.get = function (url, headers) {
    let settings = {
        method: 'GET'
    };

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

/**
 * Perform a HEAD call.
 * @param {String} url
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.head = function (url, headers) {
    let settings = {
        method: 'HEAD'
    };

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

/**
 * Perform a PATCH call.
 * @param {String} url
 * @param {Object} payload
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.patch = function (url, payload, headers) {
    let settings = {
        method: 'PATCH'
    };

    if (payload) {
        if (typeof(payload) === 'string') {
            settings.body = payload;
        }
        else {
            settings.body = JSON.stringify(payload);

            if (!headers) {
                headers = {};
            }

            let hasCT = false;

            for (let key in headers) {
                if (key.toLowerCase() === 'content-type') {
                    hasCT = true;
                    break;
                }
            }

            if (!hasCT) {
                headers['Content-Type'] = 'application/json';
            }
        }
    }

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

/**
 * Perform a POST call.
 * @param {String} url
 * @param {Object} payload
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.post = function (url, payload, headers) {
    let settings = {
        method: 'POST'
    };

    if (payload) {
        if (typeof(payload) === 'string') {
            settings.body = payload;
        }
        else {
            settings.body = JSON.stringify(payload);

            if (!headers) {
                headers = {};
            }

            let hasCT = false;

            for (let key in headers) {
                if (key.toLowerCase() === 'content-type') {
                    hasCT = true;
                    break;
                }
            }

            if (!hasCT) {
                headers['Content-Type'] = 'application/json';
            }
        }
    }

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

/**
 * Perform a PUT call.
 * @param {String} url
 * @param {Object} payload
 * @param {Object} headers
 * @returns {Promise}
 */
window.jk.put = function (url, payload, headers) {
    let settings = {
        method: 'PUT'
    };

    if (payload) {
        if (typeof(payload) === 'string') {
            settings.body = payload;
        }
        else {
            settings.body = JSON.stringify(payload);

            if (!headers) {
                headers = {};
            }

            let hasCT = false;

            for (let key in headers) {
                if (key.toLowerCase() === 'content-type') {
                    hasCT = true;
                    break;
                }
            }

            if (!hasCT) {
                headers['Content-Type'] = 'application/json';
            }
        }
    }

    if (headers) {
        settings.headers = headers;
    }

    return fetch(url, settings);
};

// #endregion

// #region Extend jk with document functions.

/**
 * Shorthand for document.querySelector.
 * @param {String} selector
 * @returns {Element}
 */
window.jk.qs = function (selector) {
    return document.querySelector(selector);
};

/**
 * Shorthand for document.querySelectorAll.
 * @param {String} selector
 * @returns {Array}
 */
window.jk.qsa = function (selector) {
    return document.querySelectorAll(selector);
};

/**
 * Shorthand for document.createElement.
 * @param {String} tag
 * @returns {Element}
 */
window.jk.ce = function (tag) {
    return document.createElement(tag);
};

// #endregion

// #region Extend jk with tool functions.

// TODO: .keybind
// TODO: .live
// TODO: .route

// #endregion

// #region jk functions.

/**
 * Cycle through all elements and check for attribute bindings.
 */
var bindAttributeFunctions = function () {
    jk.qsa('*').forEach((el) => {
        console.log('el', el);
    });
};

// #endregion

// #region Initiator.

/**
 * Init all the things..
 */
(() => {
    // Cycle through all elements and check for attribute bindings.
    bindAttributeFunctions();
})();

// #endregion