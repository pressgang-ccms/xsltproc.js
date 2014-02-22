echo "self.addEventListener('message', function (e) {" > xsltproc.js
echo "	postMessage(convertDocbookToHTML(e.data));" >> xsltproc.js
echo "});" >> xsltproc.js

echo "function convertDocbookToHTML(xml) {" >> xsltproc.js
echo "  var Module = {" >> xsltproc.js
echo "    xml: xml," >> xsltproc.js
echo "  };" >> xsltproc.js
cat xsltproc.raw.js >> xsltproc.js
echo "  return Module.return;" >> xsltproc.js
echo "}  " >> xsltproc.js

echo "self.addEventListener('message', function (e) {" > xmllint.js
echo "	postMessage(validateXML(e.data.xml, e.data.docbook4, e.data.docbook5));" >> xmllint.js
echo "});" >> xmllint.js

echo "function validateXML(xml, docbook4, docbook5) {" >> xmllint.js
echo "  var Module = {" >> xmllint.js
echo "    xml: xml," >> xmllint.js
echo "    docbook4: docbook4," >> xmllint.js
echo "    docbook5: docbook5" >> xmllint.js
echo "  };" >> xmllint.js
cat xmllint.raw.js >> xmllint.js
echo "  var errors = Module.return;" >> xmllint.js
echo "  FS.nameTable.length = 0;" >> xmllint.js
echo "  FS.nameTable = null;" >> xmllint.js
echo "  FS.root = null;" >> xmllint.js
echo "  SOCKFS.root = null;" >> xmllint.js
echo "  FS = null;" >> xmllint.js
echo "  Module = null;" >> xmllint.js
echo "  buffer = null;" >> xmllint.js
echo "  HEAP8 = null;" >> xmllint.js
echo "  HEAP16 = null;" >> xmllint.js
echo "  HEAP32 = null;" >> xmllint.js
echo "  HEAPU8 = null;" >> xmllint.js
echo "  HEAPU16 = null;" >> xmllint.js
echo "  HEAPU32 = null;" >> xmllint.js
echo "  HEAPF32 = null;" >> xmllint.js
echo "  HEAPF64 = null;" >> xmllint.js
echo "  return errors;" >> xmllint.js
echo "}  " >> xmllint.js
