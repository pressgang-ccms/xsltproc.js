if (!Module['preRun']) {
    Module['preRun'] = [];
}

function loadFile(url) {
    if (this.cache[url]) {
        return this.cache[url];
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);

        // Some hints to the browser that we want binary data.
        if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
        }

        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);

        var retValue;
        if (xhr.response !== undefined) {
            retValue = new Uint8Array(xhr.response || []);
        } else {
            retValue = intArrayFromString(xhr.responseText || '', true);
        }

        this.cache[url] = retValue;
        return retValue;
    }
}

function initFS() {
    FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
    FS.createPath('/','schemas', true, true);

    var path = Module["docbook5"] ? "/schemas/docbook50.dtd" : "/schemas/docbook45.dtd";
    var filename = Module["docbook5"] ? "docbook50.cache.dtd" : "docbook45.cache.dtd";
    var data = loadFile(filename);
    FS.writeFile(path, data, {encoding: 'binary'});
}

Module['preRun'].push(initFS);

if (Module['docbook4']) {
    Module.arguments = ["--noout", "--dtdvalid", "schemas/docbook45.dtd", "topic.xml"];
} else if (Module['docbook5']) {
    Module.arguments = ["--noout", "--dtdvalid", "schemas/docbook50.dtd", "topic.xml"];
}

Module['return'] = '';
Module['print'] = Module['printErr'] = function(text) {
    Module['return'] += text + '\n';
}