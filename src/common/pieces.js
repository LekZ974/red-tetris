const PIECES_NUM = {
  empty: 0,
  _1:1,
  _2:2,
  _3:3,
  _4:4,
  _5:5,
  _6:6,
  _7:7,
  preview:8,
};

const PIECES_INFO = [
  [
    {
      info: {width: 4},
      piece: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 1},
      piece: [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ]
    },
    {
      info: {width: 4},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 1},
      piece: [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
      ]
    },
  ],
  [
    {
      info: {width: 2},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
      ]
    },
  ],
];

export {
  PIECES_NUM,
  PIECES_INFO,
}
