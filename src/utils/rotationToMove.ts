/* eslint-disable no-console */
// eslint-disable-next-line import/prefer-default-export
export const fireRotation = (
  currentPos: { xMax: number; xMin: number; yMin: number; yMax: number },
  nextPos: { xMin: number; xMax: number; yMin: number; yMax: number }
) => {
  // console.log(currentPos,nextPos)
  const curCX = currentPos.xMin + (currentPos.xMax - currentPos.xMin) / 2;
  const curCY = currentPos.yMin + (currentPos.yMax - currentPos.yMin) / 2;

  const nextCX = nextPos.xMin + (nextPos.xMax - nextPos.xMin) / 2;
  const nextCY = nextPos.yMin + (nextPos.yMax - nextPos.yMin) / 2;

  const x = nextCX - curCX;
  const y = nextCY - curCY;

  let deg = (180 / Math.PI) * Math.atan2(y, x);
  if (deg < 0) deg += 360;
  console.log(deg);
  return deg;
};
