const names = {
    bold: "B",
    italic: "I",
    underline: "U",
};

function prefix(name) {
    return "[" + name + "]";
}

function suffix(name) {
    return "[/" + name + "]";
}

/**
 * Bold the message
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} message the message which will get bold on it.
 */
let bold = function(message) {
    return build(names.bold, message);
}

/**
 * Italic message format
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} message the message which will get italic on it.
 */
let italic = function(message) {
    return build(names.italic, message);
}

/**
 * Underline message format
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} message the message which will get underline on it.
 */
let underline = function(message) {
    return build(names.underline, message);
}

/**
 * Underline message format
 * 
 * @author      iHDeveloper
 * 
 * @param       {any} clid the id of the client.
 * @param       {any} uid the uid of the client.
 * @param       {String} name the name that will display.
 */
let client = function(clid, uid, name) {
    let _url = "client://" + clid + "/" + uid;
    return url(_url, name);
}

/**
 * Color message format
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} message The message to color it.
 */
let color = function(hex, message) {
    return "[COLOR=#" + hex + "]" + message + "[/COLOR]";
}

/**
 * URL message formt
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} url The link that will open in the browser.
 * @param       {String} title The title that the link is behind it.
 */
let url = function(url, title) {
    return "[URL=" + url + "]" + title + "[/URL]";
}

function build(name, message) {
    return prefix(name) + message + suffix(name);
}

module.exports = {
    italic,
    underline,
    bold,
    client,
    url,
    color
};
