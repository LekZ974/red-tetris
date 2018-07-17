build:
	@docker build -f Dockerfile -t red-tetris-run .

install:
	@docker run --name red-tetris --rm -it -v ${PWD}:/app red-tetris-run yarn install

start:
	@docker run --name red-tetris --init --rm -p 3004:3004 -p 8080:8080 -v ${PWD}:/app red-tetris-run

start-client:
	@docker exec -ti red-tetris yarn client-dev

test:
	@docker exec -ti red-tetris yarn test

test-coverage:
	@docker exec -ti red-tetris yarn test --coverage

.PHONY: build install start start-client test test-coverage
