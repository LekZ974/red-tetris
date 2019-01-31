# Red Tetris

This web-based project is a recreation of the game Tetris in solo and multiplayer modes. 

### Install

You must have node installed. Then run: 

```
npm install
```

### Development Mode

#### Server

To launch the development server, run: 

```
npm run srv-dev
```

#### Client

To launch the client, run:

```
npm run client-dev
```

#### Test

Test are done using Jest; to run: 

```
npm run test
```

To see the test coverage, run:

```
npm run coverage
```

### Production Mode

In production mode, the server serves `index.html` and `bundle.js` via http.

To run in production: 
```
npm run srv-dist
npm run client-dist
DEBUG=tetris:* node dist/server/main.js
```
