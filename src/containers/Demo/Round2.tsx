/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import DetectCollision from './detectCollision'
// import TotalArcade from './totalArcade';
import { Box } from '@mui/material';
import { RootState } from 'features';
import {
  setRound,
  setDefaultState,
  setPrompt,
  setStartGame,
} from 'features/Arcade/reducer';
import HandComponent from 'components/DemoGame/HandComponent';
import FlowerComponent from 'components/DemoGame/flower/FlowerComponent';
import Baterfly from 'components/DemoGame/baterfly/Baterfly';
import StatusBar from 'components/DemoGame/StatusBar';
import VideoBG from 'components/DemoGame/VideoBG';
import audioBG from 'components/DemoGame/assets/audio/forest.mp3';
import baterflyImgBlue from './assets/baterfly-blue.gif';
import baterflyImgRed from './assets/baterfly-red.gif';
import baterflyImgGreen from './assets/baterfly-green.gif';
import baterflyImgViolet from './assets/baterfly-violet.gif';
import baterflyImgYellow from './assets/baterfly-yellow.gif';

import flowerImgBlue from './assets/flower-blue.png';
import flowerImgRed from './assets/flower-red.png';
import flowerImgGreen from './assets/flower-green.png';
import flowerImgViolet from './assets/flower-violet.png';
import flowerImgYellow from './assets/flower-yellow.png';
import roundImg2 from './assets/round2.png';
import roundImg3 from './assets/round3.png';

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

const Round2 = () => {
  // const imgRef: any = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const baterflyImageList = [
    {
      color: 'blue',
      img: baterflyImgBlue,
    },
    {
      color: 'red',
      img: baterflyImgRed,
    },
    {
      color: 'green',
      img: baterflyImgGreen,
    },
    {
      color: 'violet',
      img: baterflyImgViolet,
    },
    {
      color: 'yellow',
      img: baterflyImgYellow,
    },
  ];
  const flowerImageList = [
    flowerImgBlue,
    flowerImgRed,
    flowerImgGreen,
    flowerImgViolet,
    flowerImgYellow,
  ];
  // const newFlowerImageList = shuffle(flowerImageList);
  const [baterflyRandomImageList, setBaterflyRandomImageList] = useState([]);
  const [numBaterfly, setNumBaterfly] = useState(2);
  const [switchRound, setSwitchRound] = useState(true);
  const [roundActiveImg, setRoundActiveImg] = useState(roundImg2);
  // const randomColorBaterfly = false;
  const { isActive, prompt, round } = useSelector((state: RootState) => state.arcade);
  const flowersList = [
    {
      id: 0,
      x: 100,
      image: flowerImageList[0],
    },
    {
      id: 1,
      x: 300,
      image: flowerImageList[1],
    },
    {
      id: 2,
      x: 500,
      image: flowerImageList[2],
    },
    {
      id: 3,
      x: 700,
      image: flowerImageList[3],
    },
    {
      id: 4,
      x: 900,
      image: flowerImageList[4],
    },
  ];
  const [baterflyList, setBaterflyList] = useState([]);

  useEffect(() => {
    const newArray = shuffle(baterflyImageList);
    setBaterflyRandomImageList(() => newArray);
    setTimeout(() => {
      setSwitchRound(false);
      setTimeout(() => {
        dispatch(setPrompt(3));
      }, 1000);
      setTimeout(() => {
        dispatch(setPrompt(0));
        dispatch(setStartGame(true));
      }, 5000);
    }, 1000);
  }, []);

  useEffect(() => {
    setBaterflyList(() => [
      baterflyRandomImageList[0],
      baterflyRandomImageList[1],
    ]);
  }, [baterflyRandomImageList]);
  // const caught = DetectCollision()
  useEffect(() => {
    let numActiveFlower = 0;
    for (let i = 0; i < isActive.length; i++) {
      if (isActive[i]) {
        numActiveFlower++;
      }
    }
    // console.log('numActiveFlower', numActiveFlower, numBaterfly);
    if (numActiveFlower === numBaterfly - 1 && numActiveFlower < 4) {
      setNumBaterfly(() => numBaterfly + 1);
      setBaterflyList(() =>
        baterflyList.concat(baterflyRandomImageList[baterflyList.length])
      );
    } else if (numActiveFlower === 5) {
      setTimeout(() => {
        endRound(round)
      }, 1000);
    }
  }, [isActive]);

  const endRound = (round) => {
    setRoundActiveImg(() => roundImg3)
    setSwitchRound(true)
    setTimeout(() => {
      dispatch(setDefaultState());
      dispatch(setRound(round + 1))
      dispatch(setPrompt(4))
      history.push(`/round${round + 1}`);
    }, 2000);
  }
  // useEffect(() => {
  //   console.log(imgRef.current.naturalWidth, imgRef.current.naturalHeight)
  // }, [imgRef]);

  return (
    <>
      <Box
        sx={{
          width: `${document.body.clientWidth}px`,
          height: `100vh`,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: '100',
            background: '#000',
            transition: '2s',
            opacity: `${switchRound ? '1' : '0'}`,
          }}
        >
          <img
            src={roundActiveImg}
            alt=""
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '1000px',
              height: '650px'
            }}
          />
        </Box>
        <Box
          className="promptRound2"
          style={{ opacity: `${prompt === 3 ? '1' : '0'}`, transition: '1s' }}
        >
          <p>Color</p>
          <img
            className="baterfly"
            src={baterflyImgViolet}
            alt=""
            style={{ width: '100px', top: '20%' }}
          />
          <img src={flowerImgViolet} alt="" style={{ bottom: '0' }} />
        </Box>
        <audio src={audioBG} autoPlay loop />
        <StatusBar
        //  endRound={endRound}
        />
        <Box
          sx={{
            position: 'relative',
            width: `${640 * 1.6875}px`,
            height: `${480 * 1.6875}px`,
            bgcolor: '#000',
            overflow: 'hidden',
          }}
        >
          <VideoBG />
          <HandComponent />
          <Box>
            {baterflyList.map((baterfly, i) => {
              const color = baterfly?.color;
              const img = baterfly?.img;
              const key = i;
              return <Baterfly {...{ color, img, key }} />;
            })}
          </Box>
          <Box>
            {flowersList.map((flower, i) => {
              const key = i;
              const { image, x } = flower;
              return <FlowerComponent {...{ image, x, key }} />;
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Round2;
