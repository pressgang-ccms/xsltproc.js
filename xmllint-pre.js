if (!Module['preRun']) {
	Module['preRun'] = [];
}
Module['preRun'].push(function() {
    FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
    if (Module['schema'])
		{
			FS.createDataFile('/', 'docbook45.dtd', Module['intArrayFromString'](Module['schema']), true, true);
		}
		else if (Module['rng'])
		{
			FS.createDataFile('/', 'docbook5.rng', Module['intArrayFromString'](Module['rng']), true, true);
		}
});

if (Module['schema'])
{
	Module.arguments = ["--noout", "--dtdvalid", "docbook45.dtd", "topic.xml"];
}
else if (Module['rng'])
{
	Module.arguments = ["--noout", "--relaxng", "docbook5.rng", "topic.xml"];
}

Module['return'] = '';
Module['print'] = function(text) {
	Module['return'] += text + '\n';
};
