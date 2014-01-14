if (!Module['preRun']) {
	Module['preRun'] = [];
}
Module['preRun'].push(function() {
    FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
    FS.createDataFile('/', 'docbook45.dtd', Module['intArrayFromString'](Module['schema']), true, true);
});
Module.arguments = ["--noout", "--dtdvalid", "docbook45.dtd", "topic.xml"];
Module['return'] = '';
Module['print'] = function(text) {
	Module['return'] += text + '\n';
};
