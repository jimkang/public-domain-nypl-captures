OFFSETSCMD = ./node_modules/.bin/get-file-line-offsets-in-json

test:
	node tests/random-item-tests.js

pushall:
	git push origin master && npm publish

template-offsets:
	$(OFFSETSCMD) data/pd_items.ndjson > data/pd_items.ndjson.offsets
