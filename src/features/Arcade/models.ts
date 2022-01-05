export const initialState = {
  startGame: false,
  cautch: false,
  capture: '',
  prompt: 0,
  typeScene: '',
  ratio: { x: 2.25, y: 3 },
  round: 1,
  gameWin: false,
  activeHand: {
    right: false,
    left: false,
  },
  colorFlower: ['blue', 'red', 'green', 'violet', 'yellow'],
  posXFlower: [100, 300, 500, 700, 900],
  isActive: [false, false, false, false, false],
  firework: {
    image: '',
    x: 0,
    y: 660,
    ready: false,
    playFirework: false,
    fireworkOpacity: 1,
    delay: 0,
  },
  points: 0,
  prevCoords: {
    hla: {
      xMax: 0,
      xMin: 0,
      yMin: 0,
      yMax: 0,
    },
    hra: {
      xMax: 0,
      xMin: 0,
      yMin: 0,
      yMax: 0,
    },
  },
  coords: {
    event: 'arcade',
    result: [
      [
        [0, 0],
        [0, 0],
      ],
      [
        [0, 0],
        [0, 0],
      ],
    ],
    image: '',
  },
};
type HandCoords = number[];

type Hand = HandCoords[];

export interface PrevCoords {
  hla: {
    xMax: number;
    xMin: number;
    yMin: number;
    yMax: number;
  };
  hra: {
    xMax: number;
    xMin: number;
    yMin: number;
    yMax: number;
  };
}

export interface Coords {
  event: string;
  result: Hand[];
  image: string;
}

export interface Firework {
  image: string;
  x: number;
  y: number;
  ready: boolean;
  playFirework: boolean;
  fireworkOpacity: number;
  delay: number;
}

// export const initialState = {
//   points: 0,
//   coords: {
//     event: 'arcade',
//     x: 0,
//     y: 0,
//     w: 200,
//     h: 200,
//   },
// };

// export interface Coords {
//   event: string;
//   result:
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }
