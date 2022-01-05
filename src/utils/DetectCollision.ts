/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
export const detectStart = (coords: { event?: string; result: any; image?: string }, ratio: { x: number, y: number }) => {

  const [leftHand, rightHand] = coords.result;
  const [[xl1, yl1], [xl2, yl2]] = leftHand;
  const [[xr1, yr1], [xr2, yr2]] = rightHand;

  const hla = {
    xMin: xl2 * ratio.x,
    xMax: xl1 * ratio.x,
    yMin: yl1 * ratio.y,
    yMax: yl2 * ratio.y,
  };
  const hra = {
    xMin: xr2 * ratio.x,
    xMax: xr1 * ratio.x,
    yMin: yr1 * ratio.y,
    yMax: yr2 * ratio.y,
  };
  const hlaCenter = {
    x: hla.xMin + (hla.xMax - hla.xMin) / 2,
    y: hla.yMin + (hla.yMax - hla.yMin) / 2,
  };
  const hraCenter = {
    x: hra.xMin + (hra.xMax - hra.xMin) / 2,
    y: hra.yMin + (hra.yMax - hra.yMin) / 2,
  };
  if (
    hraCenter.x < 500 &&
    hraCenter.x > 200 &&
    hlaCenter.x < 900 &&
    hlaCenter.x > 600 &&
    hraCenter.y < 1200 &&
    hraCenter.y > 900 &&
    hlaCenter.y < 1200 &&
    hlaCenter.y > 900
  ) {
    return true
  }
}

export const detectCollision = (
  flowers: any,
  coords: { event?: string; result: any; image?: string },
  startGame: boolean,
  isActive: boolean[],
  anchor: string,
  round: number,
  color: string,
  colorFlower: string[],
  ratio: { x: number, y: number }
) => {
  const caught = {
    id: null,
    start: null,
  };
  const [leftHand, rightHand] = coords.result;
  const [[xl1, yl1], [xl2, yl2]] = leftHand;
  const [[xr1, yr1], [xr2, yr2]] = rightHand;

  const hla = {
    xMin: xl2 * ratio.x,
    xMax: xl1 * ratio.x,
    yMin: yl1 * ratio.y,
    yMax: yl2 * ratio.y,
  };
  const hra = {
    xMin: xr2 * ratio.x,
    xMax: xr1 * ratio.x,
    yMin: yr1 * ratio.y,
    yMax: yr2 * ratio.y,
  };
  const points = {
    left: {
      w: 100,
      h: 100,
      x: 1080 - hla.xMin - 50,
      y: hla.yMin - 50,
    },
    right: {
      w: 100,
      h: 100,
      x: 1080 - hra.xMin - 50,
      y: hra.yMin - 50,
    },
  };

  const hlaCenter = {
    x: hla.xMin + (hla.xMax - hla.xMin) / 2,
    y: hla.yMin + (hla.yMax - hla.yMin) / 2,
  };
  const hraCenter = {
    x: hra.xMin + (hra.xMax - hra.xMin) / 2,
    y: hra.yMin + (hra.yMax - hra.yMin) / 2,
  };
  const detect = (fx, id, active, round) => {
    if (active) return;
    const fa = {
      x: fx,
      w: 100,
      y: 1450,
      h: 100,
      centerX: fx + 50,
      centerY: 700,
    };
    if (
      !(
        points.right.y + points.right.h < fa.y ||
        points.right.y > fa.y + fa.h ||
        points.right.x + points.right.w < fa.x ||
        points.right.x > fa.x + fa.w
      )
    ) {
      if (anchor === 'right') {
        if (round === 1) caught.id = id;
        else if (round > 1 && color === colorFlower[id]) caught.id = id;
      }
    } else if (
      !(
        points.left.y + points.left.h < fa.y ||
        points.left.y > fa.y + fa.h ||
        points.left.x + points.left.w < fa.x ||
        points.left.x > fa.x + fa.w
      )
    ) {
      if (anchor === 'left') {
        if (round === 1) caught.id = id;
        else if (round > 1 && color === colorFlower[id]) caught.id = id;
      }
    }
  };

  if (startGame && flowers) {
    detect(100, 0, isActive[0], round);
    detect(300, 1, isActive[1], round);
    detect(500, 2, isActive[2], round);
    detect(700, 3, isActive[3], round);
    detect(900, 4, isActive[4], round);
  } else if (
    hraCenter.x < 450 &&
    hraCenter.x > 250 &&
    hlaCenter.x < 800 &&
    hlaCenter.x > 600 &&
    hraCenter.y < 500 &&
    hraCenter.y > 300 &&
    hlaCenter.y < 500 &&
    hlaCenter.y > 300 &&
    !startGame
  ) {
    caught.start = true;
  }
  if (!startGame) {
    detect(500, 2, isActive[2], round);
  }
  return caught;
};
