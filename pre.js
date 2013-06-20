Module['preRun'] = function() {
    FS.createDataFile('/', 'topic.xml', Module['intArrayFromString'](Module['xml']), true, false);
};
Module.arguments = ['html/docbook.xsl', 'topic.xml'];
Module['return'] = '';
Module['print'] = function(text) {
  Module['return'] += text + '\n';
};