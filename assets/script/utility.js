'use strict';

// Add event listener
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
// Get HTML element by id
function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}
  
// Select HTML element
function select(selector, parent = document) {
    return parent.querySelector(selector);
}
  
// Get a (node) list of HTML elements
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}
  
// Print
function print(arg) {
    console.log(arg);
}

export { onEvent, select, selectById, selectAll, print }