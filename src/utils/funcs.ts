export const randomVector = (yMax) => {
  const newVector = {
    x: Math.floor(Math.random() * 100 - 50),
    y: Math.floor(Math.random() * yMax),
  };
  return newVector;
};

export const startPosition = (yMax) => {
  const xRnd = Math.floor(Math.random() * 50);
  const xList = [-50, 50, xRnd];
  const x = xList[Math.round(Math.random() * 2)];
  let y;
  if (x === -50 || x === 50) y = Math.floor(Math.random() * yMax);
  else y = yMax;
  const pos = { x, y };
  return pos;
};

export const catchDetect = (hra, hla, bx, by, activeHand) => {
  const collision = {
    hand: null,
    active: null,
  };
  if (bx && by) {
    const points = {
      left: {
        w: 100,
        h: 100,
        x: hla.xMin - 50,
        y: hla.yMin - 50,
      },
      right: {
        w: 100,
        h: 100,
        x: hra.xMin - 50,
        y: hra.yMin - 50,
      },
    };
    if (
      !(
        points.right.y + points.right.h < by ||
        points.right.y > by + 100 ||
        points.right.x + points.right.w < bx ||
        points.right.x > bx + 100
      )
    ) {
      if (activeHand.right === false) {
        // console.log('activeHand-right', activeHand)
        collision.hand = 'right';
        collision.active = 'hand';
      }
    } else if (
      !(
        points.left.y + points.left.h < by ||
        points.left.y > by + 100 ||
        points.left.x + points.left.w < bx ||
        points.left.x > bx + 100
      )
    ) {
      if (activeHand.left === false) {
        // console.log('activeHand-left', activeHand)
        collision.hand = 'left';
        collision.active = 'hand';
      }
    }
  }
  return collision;
};

const shuffle = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};


export const getNewIndexList = (activeList) => {
  // console.log('activeList--------------', activeList)
  let indexArr = []
  let fixedIndex = []
  for (let i = 0; i < activeList.length; i++) {
    if (!activeList[i]) {
      indexArr.push(i)
    } else {
      fixedIndex.push(i)
    }
  }
  let newArr = shuffle(indexArr)
  for (let i = 0; i < fixedIndex.length; i++) {
    newArr.splice(fixedIndex[i], 0, fixedIndex[i])
  }
  // console.log('newArr', newArr);

  return newArr
}