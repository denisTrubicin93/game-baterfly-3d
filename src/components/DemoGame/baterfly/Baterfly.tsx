/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { RootState } from 'features';
import { startPosition, randomVector, catchDetect } from 'utils/funcs';
import {
  setCapture,
  setActiveHand,
  setPrompt,
  setActiveFlower,

  setPoints,
} from '../../../features/Arcade/reducer';
import { detectCollision } from '../../../utils/DetectCollision';
// import baterflyImgBlue from '../assets/baterfly-blue.gif';
// import baterflyImgRed from '../assets/baterfly-red.gif';
// import baterflyImgGreen from '../assets/baterfly-green.gif';
// import baterflyImgViolet from '../assets/baterfly-violet.gif';
// import baterflyImgYellow from '../assets/baterfly-yellow.gif';
import successAudio from '../assets/audio/success.mp3';
import catchAudio from '../assets/audio/catch.mp3';
import styles from './Baterfly.module.scss';

const Baterfly = (props) => {
  const dispatch = useDispatch();
  const { color, img } = props;
  // const baterflyRandomImage = baterflyList[Math.round(Math.random() * 2)];
  const flowerList = [
    {
      id: 0,
      x: 100,
    },
    {
      id: 1,
      x: 300,
    },
    {
      id: 2,
      x: 500,
    },
    {
      id: 3,
      x: 700,
    },
    {
      id: 4,
      x: 900,
    },
  ];
  const { coords, startGame, isActive, activeHand, points, round, colorFlower, ratio } = useSelector(
    (state: RootState) => state.arcade
  );
  // const [rotations, setRotations] = useState({ leftRot: 0, rightRot: 0 });
  // const [baterflyList, setBaterflyList] = useState([
  //   baterflyImgBlue,
  //   baterflyImgRed,
  //   baterflyImgGreen,
  //   baterflyImgViolet,
  //   baterflyImgYellow,
  // ]);
  const [posBaterfly, setPosBaterfly] = useState<any>();
  const [batId, setBatId] = useState(null);
  const [initBaterfly, setInitBaterfly] = useState(false);
  const [anchorBaterfly, setAnchorBaterfly] = useState('');
  const [activeFlower, setActivedFlower] = useState<number>();
  const [caught, setCaught] = useState(false);
  const [stopCaught, setStopCaught] = useState(false);
  const [sound, setSound] = useState<any>();
  // const [baterflyRandomImage, setBaterflyColor] = useState<string>();
  const xFlowerList = [175, 375, 575, 775, 975];

  const audioList = {
    success: useSound(successAudio),
    catch: useSound(catchAudio),
  };

  const factorWidth = 1.6875;
  const [leftHand, rightHand] = coords.result;
  const [[xl1, yl1], [xl2, yl2]] = leftHand;
  const [[xr1, yr1], [xr2, yr2]] = rightHand;

  const hla = {
    xMin: xl1 * factorWidth,
    xMax: xl2 * factorWidth,
    yMin: yl1 * factorWidth,
    yMax: yl2 * factorWidth,
  };
  const hra = {
    xMin: xr1 * factorWidth,
    xMax: xr2 * factorWidth,
    yMin: yr1 * factorWidth,
    yMax: yr2 * factorWidth,
  };

  useEffect(() => {
    // console.log('position', posBaterfly);
    if (anchorBaterfly === 'free') {
      setTimeout(
        () => {
          setInitBaterfly(true);
          setPosBaterfly(() => randomVector(40));
        },
        initBaterfly ? 5000 : 500
      );
    }
  }, [posBaterfly]);

  useEffect(() => {
    if (anchorBaterfly !== 'free') return;
    if (posBaterfly && startGame) {
      const { x, y } = posBaterfly;
      const hit = catchDetect(hra, hla, x, y, activeHand);
      if (hit.hand) {
        setSound(() => audioList.catch);
        dispatch(setActiveHand({ hand: hit.hand, value: true }));
        setAnchorBaterfly(() => hit.hand);
        // console.log('HIT', hit);
        dispatch(setCapture(hit.hand));
      }
    }
  }, [coords]);

  useEffect(() => {
    if (startGame) {
      setPosBaterfly(() => startPosition(40));
      setAnchorBaterfly(() => 'free');
      // console.log(hla, hra, isActive);
    }
  }, [startGame]);

  // useEffect(() => {
  //   for (let i = 0; i < isActive.length; i++) {
  //     if (isActive[i]) {
  //       setActivedFlower(i);
  //       // setFixedBat(true);
  //     }
  //   }
  // }, [isActive]);
  // useEffect(() => {
  //   if (randomColorBaterfly) {
  //     const rnd = baterflyList[Math.round(Math.random() * 2)];
  //     setBaterflyColor(() => rnd);
  //   } else {
  //     setBaterflyColor(() => baterflyImgBlue);
  //   }

  // }, []);

  useEffect(() => {
    if (anchorBaterfly === 'free' || anchorBaterfly === 'flower') return;
    const hit = detectCollision(
      flowerList,
      coords,
      startGame,
      isActive,
      anchorBaterfly,
      round,
      color,
      colorFlower,
      ratio
    );
    if (hit.id !== null) {
      setSound(() => audioList.success);
      if (anchorBaterfly === 'right')
        dispatch(setActiveHand({ hand: 'right', value: false }));
      if (anchorBaterfly === 'left')
        dispatch(setActiveHand({ hand: 'left', value: false }));
      setAnchorBaterfly(() => 'flower');
      dispatch(setPoints(points + 1));
      setBatId(() => hit.id);
      setActivedFlower(() => hit.id);
      dispatch(setActiveFlower(hit.id));
      setCaught(hit?.id);
    } else if (hit.start !== null) {
      console.log('START')
      dispatch(setPrompt(1));
      setTimeout(() => {
        dispatch(setPrompt(2));
        // dispatch(setStartGame(hit?.start));
      }, 1000);
    }
  }, [coords]);

  useEffect(() => {
    if (caught && !stopCaught) {
      setStopCaught(true);
      // console.log('CAUTCH', activeFlower, batId);
    }
  }, [caught]);

  const playAudio = () => {
    const [play] = sound;
    if (play) play();
  };

  useEffect(() => {
    if (sound) {
      playAudio();
    }
  }, [sound]);

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          display: `${startGame ? 'block' : 'none'}`,
          transition: `${anchorBaterfly === 'free' ? '5s' : '1s'}`,
          top: `${activeFlower === batId && anchorBaterfly === 'flower'
            ? 580
            : anchorBaterfly === 'right'
              ? hra.yMin
              : anchorBaterfly === 'left'
                ? hla.yMin
                : posBaterfly?.y
            }px`,
          left: `${activeFlower === batId && anchorBaterfly === 'flower'
            ? xFlowerList[activeFlower]
            : anchorBaterfly === 'right'
              ? 1080 - hra.xMin
              : anchorBaterfly === 'left'
                ? 1080 - hla.xMin
                : posBaterfly?.x
            }px`,
          width: `${activeFlower === batId && anchorBaterfly === 'flower'
            ? 150
            : 151
            }px`,
          height: `${activeFlower === batId && anchorBaterfly === 'flower'
            ? 100
            : 101
            }px`,
        }}
      >
        <img src={img} alt="" />
      </div>
    </>
  );
};

export default React.memo(Baterfly);
