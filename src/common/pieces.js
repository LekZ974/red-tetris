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
const LINE = [0,0,0,0,0,0,0,0,0,0]
const PIECES_INFO = [
  [
    {
      info: {width: 2},
      piece: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]
    },
  ],
  [
    {
      info: {width: 4},
      piece: [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 2, 0],
      ]
    },
    {
      info: {width: 4},
      piece: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 3, 0],
        [0, 3, 3],
        [0, 3, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [3, 3, 3],
        [0, 3, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 3, 0],
        [3, 3, 0],
        [0, 3, 0],
      ]
    },
  ],
  [
    {
      info: {width: 4},
      piece: [
        [0, 0, 4],
        [4, 4, 4],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4],
      ]
    },
    {
      info: {width: 4},
      piece: [
        [0, 0, 0],
        [4, 4, 4],
        [4, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [4, 4, 0],
        [0, 4, 0],
        [0, 4, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [5, 0, 0],
        [5, 5, 5],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 5},
      piece: [
        [0, 5, 5],
        [0, 5, 0],
        [0, 5, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [5, 5, 5],
        [0, 0, 5],
      ]
    },
    {
      info: {width: 5},
      piece: [
        [0, 5, 0],
        [0, 5, 0],
        [5, 5, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 0, 6],
        [0, 6, 6],
        [0, 6, 0],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [6, 6, 0],
        [0, 6, 6],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 6, 0],
        [6, 6, 0],
        [6, 0, 0],
      ]
    },
  ],
  [
    {
      info: {width: 3},
      piece: [
        [0, 7, 7],
        [7, 7, 0],
        [0, 0, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [0, 7, 0],
        [0, 7, 7],
        [0, 0, 7],
      ]
    },
    {
      info: {width: 3},
      piece: [
        [0, 0, 0],
        [0, 7, 7],
        [7, 7, 0],
      ]
    },
    {
      info: {width: 2},
      piece: [
        [7, 0, 0],
        [7, 7, 0],
        [0, 7, 0],
      ]
    },
  ],
];

const PIECES_ACTION = {
  ROTATE_LEFT: "rotate_left",
  ROTATE_RIGHT: "rotate_right",
  MOVE_LEFT: "move_left",
  MOVE_RIGHT: "move_right",
  MOVE_DOWN: "move_down",
  MOVE_DROP: "move_drop",
};

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  LIMIT_DOWN: "collision_limit_down",
  LIMIT_TOP: "collision_limit_top",
  LIMIT_LEFT: "collision_limit_left",
  LIMIT_RIGHT: "collision_limit_right",
};

const PRIO_COLLISION = [
  COLLISION_TYPE.PIECE,
  COLLISION_TYPE.LIMIT_DOWN,
  COLLISION_TYPE.LIMIT_TOP,
  COLLISION_TYPE.LIMIT_LEFT,
  COLLISION_TYPE.LIMIT_RIGHT,
];

export {
  PIECES_NUM,
  PIECES_INFO,
  PIECES_ACTION,
  COLLISION_TYPE,
  PRIO_COLLISION,
}
