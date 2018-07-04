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

var bold = function(message) {
    return build(names.bold, message);
}

var italic = function(message) {
    return build(names.italic, message);
}

var underline = function(message) {
    return build(names.underline, message);
}

var client = function(clid, uid, name) {
    var _url = "client://" + clid + "/" + uid;
    return url(_url, name);
}

var color = function(hex, message) {
    return "[COLOR=#" + hex + "]" + message + "[/COLOR]";
}

var url = function(url, title) {
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