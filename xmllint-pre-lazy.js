if (!Module['preRun']) {
	Module['preRun'] = [];
}
Module['preRun'].push(function() {
	FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
	FS.createPath('/','schemas', true, true);
        FS.createLazyFile('/schemas','docbook45.dtd','docbook45.dtd', true, true);
	FS.createLazyFile('/schemas','docbook50.dtd','docbook50.dtd', true, true);
});

if (Module['docbook4'])
{
	Module.arguments = ["--noout", "--dtdvalid", "schemas/docbook45.dtd", "topic.xml"];
}
else if (Module['docbook5'])
{
	Module.arguments = ["--noout", "--dtdvalid", "schemas/docbook50.dtd", "topic.xml"];
}

Module['return'] = '';
Module['print'] = Module['printErr'] = function(text) {
	Module['return'] += text + '\n';
};
