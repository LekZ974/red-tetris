build:
	@docker build -f Dockerfile -t red-tetris-run .

install:
	@docker run --name red-tetris --rm -it -v ${PWD}:/app red-tetris-run yarn install

srv-dev:
	@docker run --name red-tetris --init --rm -p 3004:3004 -p 8080:8080 -v ${PWD}:/app red-tetris-run yarn srv-dev

client-dev:
	@docker exec -ti red-tetris yarn client-dev

srv-dist:
	@docker run --name red-tetris --init --rm -p 3004:3004 -p 8080:8080 -v ${PWD}:/app red-tetris-run yarn srv-dist

client-dist:
	@docker run --name red-tetris --init --rm -p 3004:3004 -p 8080:8080 -v ${PWD}:/app red-tetris-run yarn client-dist

start-prod: srv-dist client-dist
	@docker run --name red-tetris --init --rm -p 3004:3004 -p 8080:8080 -v ${PWD}:/app red-tetris-run node dist/server/main.js

test:
	@docker exec -ti red-tetris yarn test

test-coverage:
	@docker exec -ti red-tetris yarn test --coverage

test-server:
	@docker exec -ti red-tetris yarn test -- tests/server

.PHONY: build install srv-dev client-dev srv-dist client-dist start-prod test test-coverage
