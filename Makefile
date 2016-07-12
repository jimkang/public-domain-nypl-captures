OFFSETSCMD = ./node_modules/.bin/get-file-line-offsets-in-json

test:
	node tests/random-item-tests.js
	node tests/random-capture-tests.js

pushall:
	git push origin master && npm publish

assemble-aggregate-file:
	cat data/pd_items_1.ndjson data/pd_items_2.ndjson data/pd_items_3.ndjson data/pd_items_4.ndjson > data/pd_items.ndjson

template-offsets: assemble-aggregate-file
	$(OFFSETSCMD) data/pd_items.ndjson > data/pd_items.ndjson.offsets
