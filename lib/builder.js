'use strict';

const names = {
    bold: "B",
    italic: "I",
    underline: "U",
};

function prefix(name) {
    if (name == null) return "";
    return "[" + name + "]";
}

function suffix(name) {
    if (name == null) return "";
    return "[/" + name + "]";
}

class Builder {

    constructor(message) {
        this.message = message;
        return this;
    }

    build(_prefix, _suffix, message) {
        let msg = prefix(_prefix) + message + suffix(_suffix);
        if (this.message == null) this.message = "";
        this.message += msg;
        return this;
    }

    /**
     * Normal text without format
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} message
     * @return      {String} message in format
     */
    text(message) {
        return this.build(null, null, message);
    }

    /**
     * Bold the message
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} message the message which will get bold on it.
     * @return      {String} message with bold format
     */
    bold(message) {
        return this.build(names.bold, names.bold, message);
    }

    /**
     * Italic message format
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} message the message which will get italic on it.
     * @return      {String} message with italic format
     */
    italic(message) {
        return this.italic(names.italic, names.italic, message);
    }

    /**
     * Underline message format
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} message the message which will get underline on it.
     * @return      {String} message with underline format
     */
    underline(message) {
        return this.build(names.underline, names.underline, message);
    }

    /**
     * URL message formt
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} url The link that will open in the browser.
     * @param       {String} title The title that the link is behind it.
     * @return      {String} message with url format
     */
    url(_url, title) {
        return this.build("URL=" + _url, "URL", title);
    }

    /**
     * Client message
     * 
     * @author      iHDeveloper
     * 
     * @param       {any} clid the id of the client.
     * @param       {any} uid the uid of the client.
     * @param       {String} name the name that will display.
     * @return      {String} client information as message format
     */
    client(clid, uid, name) {
        let _url = "client://" + clid + "/" + uid;
        return this.url(_url, name);
    }

    /**
     * Color message format
     * 
     * @author      iHDeveloper
     * 
     * @param       {String} hex the hex color for the format.
     * @param       {String} message The message to color it.
     * @return      {String} message with color format
     */
    color(hex, message) {
        if (!hex.includes("#")) hex = "#" + hex;
        return this.build("COLOR=" + hex, "COLOR", message);
    }

    /**
     * Empty Space message
     * 
     * @author      iHDeveloper
     * 
     * @return      {String} empty space
     */
    empty() {
        return this.text(" ");
    }

}

Builder.prototype.toString = function() {
    return this.message;
};

module.exports = Builder;

/**
 * Bold the message
 * 
 * @author      iHDeveloper
 * 
 * @param       {String} message the message which will get bold on it.
 * @return      {String} message with bold format
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
 * @return      {String} message with italic format
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
 * @return      {String} message with underline format
 */
let underline = function(message) {
    return build(names.underline, message);
}

/**
 * Client message
 * 
 * @author      iHDeveloper
 * 
 * @param       {any} clid the id of the client.
 * @param       {any} uid the uid of the client.
 * @param       {String} name the name that will display.
 * @return      {String} client information as message format
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
 * @param       {String} hex the hex color for the format.
 * @param       {String} message The message to color it.
 * @return      {String} message with color format
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
 * @return      {String} message with url format
 */
let url = function(url, title) {
    return "[URL=" + url + "]" + title + "[/URL]";
}

function build(name, message) {
    return prefix(name) + message + suffix(name);
}
module.exports.bold = bold;
module.exports.italic = italic;
module.exports.client = client;
module.exports.url = url;
module.exports.color = color;
module.exports.underline = underline;
