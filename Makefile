BIN = ./node_modules/.bin

clean:
	@rm -rf .tmp

lint:
	@$(BIN)/eslint .

release-major: build lint
	@npm version major

release-minor: build lint
	@npm version minor

release-patch: build lint
	@npm version patch

publish: build lint
	git push --tags origin HEAD:master
