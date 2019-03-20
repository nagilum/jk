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

// #region Extend Element with functions.

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

// #region Extend Array with functions.

// TODO: .all
// TODO: .any
// TODO: .copy
// TODO: .distinct
// TODO: .first
// TODO: .orderBy
// TODO: .orderByDescending
// TODO: .select
// TODO: .skip
// TODO: .take
// TODO: .where

// #endregion

// #region Extend jk with functions.

// TODO: .delete
// TODO: .get
// TODO: .head
// TODO: .patch
// TODO: .post
// TODO: .put

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