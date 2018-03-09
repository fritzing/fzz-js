include node_modules/fritzing-js/setup.mk

test-load:
	node test/_examples.js
test-load-data:
	git clone git@github.com:fritzing/creatorkit-code.git test/fixtures/creatorkit-code
