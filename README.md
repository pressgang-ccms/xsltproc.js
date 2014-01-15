This is xsltproc compiled to JavaScript using emscripten.

USAGE
=====

To see the library in action, download xsltproc.html and xsltproc.js. Note that Chrome has a bug with Web Workers - https://code.google.com/p/chromium/issues/detail?id=252492.

SETTING UP EMSCRIPTEN
=====================
https://gist.github.com/mcasperson/8274405 notes some of the configuration required under Fedora to get Emscripten working.

COMPILING
=========

To compile xsltproc yourself, thete are some manual steps required.

Add the following line to the nanohttp.c in the xmllib2 distribution:

    #define __LINUX_ERRNO_EXTENSIONS__

Configure and make xmllib2 and xmllint with the following commands:

    ~/emscripten/emconfigure ./configure --without-python --without-threads --without-ftp --without-http
    ~/emscripten/emmake make
    ~/emscripten/emcc SAX.o entities.o encoding.o error.o parserInternals.o parser.o tree.o hash.o list.o xmlIO.o xmlmemory.o uri.o valid.o xlink.o HTMLparser.o HTMLtree.o debugXML.o xpath.o xpointer.o xinclude.o nanohttp.o nanoftp.o catalog.o globals.o threads.o c14n.o xmlstring.o buf.o xmlregexp.o xmlschemas.o xmlschemastypes.o xmlunicode.o xmlreader.o relaxng.o dict.o SAX2.o xmlwriter.o legacy.o chvalid.o pattern.o xmlsave.o xmlmodule.o schematron.o xzlib.o xmllint.o ~/git/emscripten/tests/zlib/libz.a -O2 -o ../xmllint.raw.js -s ASM_JS=0 --pre-js ../xmllint-pre.js

Configure and make the zlib library (included in emscripten/tests/zlib/) with the following commands:

    ~/emscripten/emconfigure ./configure
    ~/emscripten/emmake make

Configure and make xsltproc with the following commands:

    chmod +x ../libxml2-2.9.1/xml2-config
    ~/emscripten/emconfigure ./configure --with-libxml-src=../libxml2-2.9.1 --without-python
    ~/emscripten/emmake make
	export JAVA_HEAP_SIZE=4096m
	cd docbook-xsl-1.78.1
	~/emscripten/emcc -s TOTAL_STACK=10485760 -s TOTAL_MEMORY=33554432 -O2 --llvm-opts 3 --llvm-lto 1 -s ASM_JS=0 --pre-js ../pre.js ../libxslt-1.1.28/xsltproc/xsltproc.o /home/matthew/emscripten/tests/zlib/adler32.o /home/matthew/emscripten/tests/zlib/compress.o /home/matthew/emscripten/tests/zlib/crc32.o /home/matthew/emscripten/tests/zlib/deflate.o /home/matthew/emscripten/tests/zlib/gzclose.o /home/matthew/emscripten/tests/zlib/gzlib.o /home/matthew/emscripten/tests/zlib/gzread.o /home/matthew/emscripten/tests/zlib/gzwrite.o /home/matthew/emscripten/tests/zlib/infback.o /home/matthew/emscripten/tests/zlib/inffast.o /home/matthew/emscripten/tests/zlib/inflate.o /home/matthew/emscripten/tests/zlib/inftrees.o /home/matthew/emscripten/tests/zlib/trees.o /home/matthew/emscripten/tests/zlib/uncompr.o /home/matthew/emscripten/tests/zlib/zutil.o ../libxslt-1.1.28/libexslt/common.o ../libxslt-1.1.28/libexslt/crypto.o ../libxslt-1.1.28/libexslt/date.o ../libxslt-1.1.28/libexslt/dynamic.o ../libxslt-1.1.28/libexslt/exslt.o ../libxslt-1.1.28/libexslt/functions.o ../libxslt-1.1.28/libexslt/math.o ../libxslt-1.1.28/libexslt/saxon.o ../libxslt-1.1.28/libexslt/sets.o ../libxslt-1.1.28/libexslt/strings.o ../libxslt-1.1.28/libxslt/attributes.o ../libxslt-1.1.28/libxslt/attrvt.o ../libxslt-1.1.28/libxslt/documents.o ../libxslt-1.1.28/libxslt/extensions.o ../libxslt-1.1.28/libxslt/extra.o ../libxslt-1.1.28/libxslt/functions.o ../libxslt-1.1.28/libxslt/imports.o ../libxslt-1.1.28/libxslt/keys.o ../libxslt-1.1.28/libxslt/namespaces.o ../libxslt-1.1.28/libxslt/numbers.o ../libxslt-1.1.28/libxslt/pattern.o ../libxslt-1.1.28/libxslt/preproc.o ../libxslt-1.1.28/libxslt/security.o ../libxslt-1.1.28/libxslt/templates.o ../libxslt-1.1.28/libxslt/transform.o ../libxslt-1.1.28/libxslt/variables.o ../libxslt-1.1.28/libxslt/xsltlocale.o ../libxslt-1.1.28/libxslt/xslt.o ../libxslt-1.1.28/libxslt/xsltutils.o ../libxml2-2.9.1/.libs/libxml2.a -o ../xsltproc.raw.js --embed-file VERSION.xsl --embed-file lib/lib.xsl --embed-file common/af.xml --embed-file common/am.xml --embed-file common/ar.xml --embed-file common/ast.xml --embed-file common/as.xml --embed-file common/autoidx-kimber.xsl --embed-file common/autoidx-kosek.xsl --embed-file common/az.xml --embed-file common/bg.xml --embed-file common/bn_in.xml --embed-file common/bn.xml --embed-file common/bs.xml --embed-file common/ca.xml --embed-file common/charmap.xml --embed-file common/charmap.xsl --embed-file common/common.xml --embed-file common/common.xsl --embed-file common/cs.xml --embed-file common/cy.xml --embed-file common/da.xml --embed-file common/de.xml --embed-file common/el.xml --embed-file common/entities.ent --embed-file common/en.xml --embed-file common/eo.xml --embed-file common/es.xml --embed-file common/et.xml --embed-file common/eu.xml --embed-file common/fa.xml --embed-file common/fi.xml --embed-file common/fr.xml --embed-file common/ga.xml --embed-file common/gentext.xsl --embed-file common/gl.xml --embed-file common/gu.xml --embed-file common/he.xml --embed-file common/hi.xml --embed-file common/hr.xml --embed-file common/hu.xml --embed-file common/id.xml --embed-file common/insertfile.xsl --embed-file common/is.xml --embed-file common/it.xml --embed-file common/ja.xml --embed-file common/ka.xml --embed-file common/kn.xml --embed-file common/ko.xml --embed-file common/ky.xml --embed-file common/l10n.dtd --embed-file common/l10n.xml --embed-file common/l10n.xsl --embed-file common/labels.xsl --embed-file common/la.xml --embed-file common/lt.xml --embed-file common/lv.xml --embed-file common/ml.xml --embed-file common/mn.xml --embed-file common/mr.xml --embed-file common/nb.xml --embed-file common/nds.xml --embed-file common/nl.xml --embed-file common/nn.xml --embed-file common/olink.xsl --embed-file common/or.xml --embed-file common/pa.xml --embed-file common/pi.xml --embed-file common/pi.xsl --embed-file common/pl.xml --embed-file common/pt_br.xml --embed-file common/pt.xml --embed-file common/refentry.xml --embed-file common/refentry.xsl --embed-file common/ro.xml --embed-file common/ru.xml --embed-file common/sk.xml --embed-file common/sl.xml --embed-file common/sq.xml --embed-file common/sr_Latn.xml --embed-file common/sr.xml --embed-file common/stripns.xsl --embed-file common/subtitles.xsl --embed-file common/sv.xml --embed-file common/table.xsl --embed-file common/targetdatabase.dtd --embed-file common/targets.xsl --embed-file common/ta.xml --embed-file common/te.xml --embed-file common/th.xml --embed-file common/titles.xsl --embed-file common/tl.xml --embed-file common/tr.xml --embed-file common/uk.xml --embed-file common/utility.xml --embed-file common/utility.xsl --embed-file common/vi.xml --embed-file common/xh.xml --embed-file common/zh_cn.xml --embed-file common/zh_tw.xml --embed-file common/zh.xml --embed-file html/admon.xsl --embed-file html/annotations.xsl --embed-file html/autoidx-kimber.xsl --embed-file html/autoidx-kosek.xsl --embed-file html/autoidx-ng.xsl --embed-file html/autoidx.xsl --embed-file html/autotoc.xsl --embed-file html/biblio-iso690.xsl --embed-file html/biblio.xsl --embed-file html/block.xsl --embed-file html/callout.xsl --embed-file html/changebars.xsl --embed-file html/chunk-changebars.xsl --embed-file html/chunk-code.xsl --embed-file html/chunk-common.xsl --embed-file html/chunker.xsl --embed-file html/chunkfast.xsl --embed-file html/chunktoc.xsl --embed-file html/chunk.xsl --embed-file html/component.xsl --embed-file html/division.xsl --embed-file html/docbook.css.xml --embed-file html/docbook.xsl --embed-file html/ebnf.xsl --embed-file html/footnote.xsl --embed-file html/formal.xsl --embed-file html/glossary.xsl --embed-file html/graphics.xsl --embed-file html/highlight.xsl --embed-file html/html-rtf.xsl --embed-file html/htmltbl.xsl --embed-file html/html.xsl --embed-file html/index.xsl --embed-file html/info.xsl --embed-file html/inline.xsl --embed-file html/keywords.xsl --embed-file html/lists.xsl --embed-file html/maketoc.xsl --embed-file html/manifest.xsl --embed-file html/math.xsl --embed-file html/oldchunker.xsl --embed-file html/onechunk.xsl --embed-file html/param.xml --embed-file html/param.xsl --embed-file html/pi.xml --embed-file html/pi.xsl --embed-file html/profile-chunk-code.xsl --embed-file html/profile-chunk.xsl --embed-file html/profile-docbook.xsl --embed-file html/profile-onechunk.xsl --embed-file html/qandaset.xsl --embed-file html/refentry.xsl --embed-file html/sections.xsl --embed-file html/synop.xsl --embed-file html/table.xsl --embed-file html/task.xsl --embed-file html/titlepage.templates.xml --embed-file html/titlepage.templates.xsl --embed-file html/titlepage.xsl --embed-file html/toc.xsl --embed-file html/verbatim.xsl --embed-file html/xref.xsl
	cd ..
	./final.sh
	
A manual change to the generated code is required to fix a bug where Emscripten overwrites Module['print']. In xmllint.js, change

	else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
	  Module['read'] = function read(url) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, false);
	    xhr.send(null);
	    return xhr.responseText;
	  };
	  if (typeof arguments != 'undefined') {
	    Module['arguments'] = arguments;
	  }
	  if (typeof console !== 'undefined') {
	    Module['print'] = function print(x) {
	      console.log(x);
	    };
	    Module['printErr'] = function printErr(x) {
	      console.log(x);
	    };
	  }
	  
to

	else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
	  Module['read'] = function read(url) {
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, false);
	    xhr.send(null);
	    return xhr.responseText;
	  };
	  if (typeof arguments != 'undefined') {
	    Module['arguments'] = arguments;
	  }
	  if (typeof console !== 'undefined') {
	    Module['print'] = Module['print'] || function print(x) {
	      console.log(x);
	    };
	    Module['printErr'] = function printErr(x) {
	      console.log(x);
	    };
	  }
