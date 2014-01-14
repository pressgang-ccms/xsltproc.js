if (!Module['preRun']) {
	Module['preRun'] = [];
}
Module['preRun'].push(function() {
    	FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, true);
    	if (Module['schema'])
	{
		FS.createDataFile('/', 'docbook45.dtd', Module['intArrayFromString'](Module['schema']), true, true);
	}
	else if (Module['nrg'])
	{
		FS.createDataFile('/', 'docbook5.nrg', Module['intArrayFromString'](Module['nrg']), true, true);
	}
});

if (Module['schema'])
{
	Module.arguments = ["--noout", "--dtdvalid", "docbook45.dtd", "topic.xml"];
}
else if (Module['nrg'])
{
	Module.arguments = ["--noout", "--relaxng", "docbook5.nrg", "topic.xml"];
}

Module['return'] = '';
Module['print'] = function(text) {
	Module['return'] += text + '\n';
};
