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

let bold = function(message) {
    return build(names.bold, message);
}

let italic = function(message) {
    return build(names.italic, message);
}

let underline = function(message) {
    return build(names.underline, message);
}

let client = function(clid, uid, name) {
    let _url = "client://" + clid + "/" + uid;
    return url(_url, name);
}

let color = function(hex, message) {
    return "[COLOR=#" + hex + "]" + message + "[/COLOR]";
}

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
