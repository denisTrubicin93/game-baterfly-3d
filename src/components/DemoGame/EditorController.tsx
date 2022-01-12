import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
// import { useHistory } from 'react-router-dom';
// import DetectCollision from './detectCollision'
// import TotalArcade from './totalArcade';
import { Box } from '@mui/material';
import { RootState } from 'features';
import { setPrompt, setPoints, setStartGame } from 'features/Arcade/reducer';
import { GmContext } from "./Editor";
import HandComponent from 'components/DemoGame/HandComponent';
import FlowerComponent from 'components/DemoGame/flower/FlowerComponent';
import { detectStart } from 'utils/DetectCollision';
// import GameManager from 'components/DemoGame/SceneManager';
// import Baterfly from 'components/DemoGame/baterfly/Baterfly';
import StatusBar from 'components/DemoGame/StatusBar';
import VideoBG from 'components/DemoGame/VideoBG';
import TotalArcade from 'components/DemoGame/totalArcade'
import TimeOver from 'components/DemoGame/TimeOver'
// import audioBG from 'components/DemoGame/assets/audio/forest.mp3';
import baterflyImgBlue from './assets/baterfly-blue.gif';
import roundImg from './assets/round2.png'
import successAudio from './assets/audio/success.mp3';
import catchAudio from './assets/audio/catch.mp3';

const EditorController = (props) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const [numBaterfly, setNumBaterfly] = useState(2);
  const [handsInCircle, setHandsInCircle] = useState(false)
  const switchRound = false
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState<any>();
  const [gameFinish, setGameFinish] = useState(false)
  const [isEndRound, setIsEndRound] = useState(false)
  // const randomColorBaterfly = false;
  const { isActive, round, coords, startGame, points, ratio, typeScene } = useSelector((state: RootState) => state.arcade);

  const [baterflyList, setBaterflyList] = useState([
    baterflyImgBlue,
    baterflyImgBlue,
  ]);

  const audioList = [
    { name: 'success', sound: useSound(successAudio) },
    { name: 'catch', sound: useSound(catchAudio) },
  ];

  const { gm: gameManager, setHandler } = useContext(GmContext);

  const studioSceneHandlers = useMemo(() => {
    return {
      onLoad: () => {
        setIsLoading(false);
      },
      hello: () => {
        setIsLoading(false);
      },
    };
  }, []);

  useEffect(() => {
    if (!gameManager) return;
    setHandler(studioSceneHandlers);
    //load
    if (!handsInCircle) {
      const start = detectStart(coords, ratio);
      if (start) {
        setHandsInCircle(true)
        dispatch(setPrompt(1));
        setTimeout(() => {
          dispatch(setPrompt(2));
        }, 1000);
        setTimeout(() => {
          dispatch(setStartGame(true))
          dispatch(setPrompt(3))
        }, 5000);
      }
    }


    // const onFinish = () => {
    //   setIsLoading(false);
    // };
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
    if (isLoading && gameManager && startGame)
      gameManager.studioSceneManager.handlerCoord(hla, hra)

    const onCheckPoints = (result) => {
      if (result !== points) dispatch(setPoints(result))
    }
    const onCheckSound = (result) => {
      const audioItem = audioList.find((el) => el.name === result)
      if (result) setSound(() => audioItem.sound)
    }
    gameManager.studioSceneManager.handlePoints(onCheckPoints)
    gameManager.studioSceneManager.handleSound(onCheckSound)
    // gameManager.studioSceneManager.loadAllCharcterData(
    //   appData.item_equipped,
    //   onFinish
    // );
  }, [gameManager, coords]);


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
      setBaterflyList(() => baterflyList.concat(baterflyImgBlue));
    } else if (numActiveFlower === 5) {
      setTimeout(() => {
        endRound(round)
      }, 1000);
    }
  }, [isActive]);

  const clearScene = () => {
    gameManager.studioSceneManager.endGame()
    // setTimeout(() => {
    //   history.push('/')
    // }, 3000);
  }
  const endRound = (end) => {
    gameManager.studioSceneManager.endRound()
    setIsEndRound(end)
    // setSwitchRound(true)
    // setTimeout(() => {
    //   dispatch(setDefaultState());
    //   dispatch(setRound(round + 1))
    //   dispatch(setPrompt(0))
    //   // history.push(`/round${round + 1}`);
    // }, 3000);
  }
  const endGame = () => {
    setGameFinish(true)
  }
  // useEffect(() => {
  //   console.log(imgRef.current.naturalWidth, imgRef.current.naturalHeight)
  // }, [imgRef]);
  useEffect(() => {
    if (startGame) {
      gameManager.studioSceneManager.startGame(typeScene, round)
    }
  }, [startGame])

  useEffect(() => {
    if (round > 1) {
      setIsEndRound(false)
      gameManager.studioSceneManager.startGame(typeScene, round)
    }
  }, [round])

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
      <Box
        sx={{
          display: isLoading ? 'flex' : 'none',
          width: `${document.body.clientWidth}px`,
          height: `100vh`,
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
            src={roundImg}
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
        {/* <audio src={audioBG} autoPlay loop /> */}
        <StatusBar
          endRound={endRound}
        />
        <Box
          sx={{
            position: 'relative',
            width: `100%`,
            height: `100%`,
            bgcolor: '#000',
            overflow: 'hidden',
          }}
        >
          <VideoBG />
          <HandComponent />
          <Box>
            {/* {baterflyList.map((img, i) => {
              const key = i;
              const color = 'blue';
              return <Baterfly {...{ img, color, key }} />;
            })} */}
            {props.renderTabs}
          </Box>
          <Box>
            <FlowerComponent />;
          </Box>

          <TotalArcade {...{ gameFinish, clearScene }} />
          <TimeOver {...{ isEndRound, endGame }} />
        </Box>
      </Box>

    </>
  );
};

export default EditorController;
