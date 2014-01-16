if (!Module['preRun']) {
	Module['preRun'] = [];
}
Module['preRun'].push(function() {
	FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
});

if (Module['docbook4'])
{
	Module.arguments = ["--noout", "--dtdvalid", "schemas/docbook45.dtd", "topic.xml"];
}
else if (Module['docbook5'])
{
	Module.arguments = ["--noout", "--relaxng", "schemas/docbook50.rng", "topic.xml"];
}

Module['return'] = '';
Module['print'] = Module['printErr'] = function(text) {
	Module['return'] += text + '\n';
};
