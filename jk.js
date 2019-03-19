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

// TODO: .addClass
// TODO: .append
// TODO: .attr
// TODO: .css
// TODO: .empty
// TODO: .hasClass
// TODO: .hasAttr
// TODO: .html
// TODO: .on
// TODO: .parent
// TODO: .qs
// TODO: .qsa
// TODO: .remove
// TODO: .removeClass
// TODO: .removeAttr
// TODO: .text
// TODO: .toggleClass

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