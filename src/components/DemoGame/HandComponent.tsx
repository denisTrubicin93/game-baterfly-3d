import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'features';
import { Box, Typography } from '@mui/material';
// import BaterflyDemo from './baterfly/BaterflyDemo';
// import baterflyImg from './assets/baterfly-blue.gif'
import promptVideo_1 from './assets/video/prompt1-v2.mp4'
import promptVideo_Ground_1 from './assets/video/prompt-1-g.mp4'
import promptVideo_2 from './assets/video/prompt-2-b.mp4'
import promptVideo_Ground_2 from './assets/video/prompt-2-g.mp4'
import promptVideo_3 from './assets/video/prompt-3-b.mp4'
import promptVideo_Ground_3 from './assets/video/prompt-3-g.mp4'
// import promptVideo-3 from './assets/prompt1-v2.mp4'
// import promptVideo_Ground-3 from './assets/prompt-1-g.mp4'
// import { setPrompt } from 'features/Arcade/reducer';
// import { fireRotation } from '../../containers/Demo/fireRotation';
// import baterflyImg from './assets/baterfly-1.gif';

import handImg from './assets/hand.png';

const HandComponent = () => {
  // const dispatch = useDispatch();
  const { coords, startGame, prompt, round, ratio, typeScene } = useSelector(
    (state: RootState) => state.arcade
  );
  // const [rotations, setRotations] = useState({ leftRot: 0, rightRot: 0 });
  const [hideCircle, setHideCircle] = useState(false);
  const [video, setVideo] = useState(null)
  // const color = 'blue'
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

  useEffect(() => {
    // console.log('prompt', prompt, round)
    if (prompt === 1) {
      setTimeout(() => {
        setHideCircle(true)
      }, 1000);
    }
    if (prompt === 3) {
      setTimeout(() => {
        switch (round) {
          case 1:
            setVideo(() => typeScene === 'adult' ? promptVideo_Ground_2 : promptVideo_2)
            break;
          case 2:
            setVideo(() => typeScene === 'adult' ? promptVideo_Ground_3 : promptVideo_3)
            break;
          default:
            break;
        }
      }, 1000);

    }
  }, [prompt])

  useEffect(() => {
    if (typeScene === 'adult') {
      setVideo(promptVideo_Ground_1)
    } else {
      setVideo(promptVideo_1)
    }
  }, [])
  // const hlaCenter = {
  //   x: 1080 - hla.xMin,
  //   y: hla.yMin,
  // };
  // const hraCenter = {
  //   x: 1080 - hra.xMin,
  //   y: hra.yMin,
  // };
  // useEffect(() => {
  //   // dispatch(setPrevCoords({ hla, hra }));
  //   // setRotations(() => {
  //   //   return {
  //   //     leftRot: fireRotation(prevCoords.hla, hla),
  //   //     rightRot: fireRotation(prevCoords.hra, hra),
  //   //   };
  //   // });
  //   console.log(hla)
  // }, [coords]);
  // const { x, y } = firework;
  //     // const y = firework;
  //     const fa = {
  //       xMin: x,
  //       xMax: x - 50,
  //       yMin: y,
  //       yMax: y - 50,
  //       centerX: x + 25,
  //       centerY: y + 25,
  //     };
  // const points = {
  //   leftMin: [(1080 - hla.xMin) + (hla.xMax - hla.xMin)/2, hla.yMin - (hla.yMax - hla.yMin)/2],
  //   leftMax: [(1080 - hla.xMax) + (hla.xMax - hla.xMin)/2, hla.yMax - (hla.yMax - hla.yMin)/2],
  //   rightMin: [1080 - hra.xMin, hra.yMin - (hla.yMax - hla.yMin)/2],
  //   rightMax: [1080 - hra.xMax, hra.yMax - (hla.yMax - hla.yMin)/2],
  // }
  // useEffect(() => {
  //   console.log(isActive);
  // }, [isActive]);
  return (
    <>
      <Box
        sx={{
          display: `${prompt > 0 || round > 1 ? 'block' : 'block'}`,
          width: '700px',
          position: 'absolute',
          top: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'orange',
          background: prompt === 0 ? '#000000a3' : 'none',
          borderRadius: '50px',
          padding: '20px',
          textAlign: 'center',
          transition: '0.5s',
        }}
      >
        <video src={video} loop autoPlay={true} style={{
          display: 'block',
          width: prompt === 2 ? '100%' : '0',
          position: 'absolute',
          top: '14vh',
          border: prompt === 2 ? '10px solid #000' : '0',
          borderRadius: '15%',
          transition: '0.5s'
        }}></video>
        <Typography
          sx={{
            display: prompt === 0 ? 'block' : 'none',
            fontWeight: '800',
            fontSize: '60px',
          }}
        >
          両手をここにかざして、ゲーム開始!
          {/* 空中に飛んでいる蝶々を手で捕まえて、お花さんにゆうどうしてね! */}
        </Typography>
      </Box>


      <Box
        sx={{
          position: 'absolute',
          width: `${startGame || round > 1 ? (hla.xMax - hla.xMin) * 2 : 300}px`,
          height: `${startGame || round > 1 ? (hla.yMax - hla.yMin) * 2 : 300}px`,
          top: `${startGame || round > 1 ? hla.yMin : 900}px`,
          left: `${startGame || round > 1 ? 1080 - hla.xMin : 600}px`,
          transform: 'translateY(-50%)',
          // border: `${!startGame && round === 1
          //   ? prompt === 1
          //     ? '5px solid #ff00ff'
          //     : '5px solid #fff'
          //   : 'none'
          //   }`,
          borderRadius: '50%',
          transition: '1s',
        }}
      >
        <Box className="circle-big" style={{ display: !hideCircle && round === 1 ? 'block' : 'none' }}>
          <svg>
            <circle className="bg" cx="150" cy="150" r="145"></circle>
            <circle className="progress" cx="150" cy="150" r="145" style={{ strokeDashoffset: prompt === 1 ? '0' : '1000' }}></circle>
          </svg>
          <img className="right" src={handImg} alt="" style={{ display: prompt === 1 ? 'none' : 'block' }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          width: `${startGame || round > 1 ? (hra.xMax - hra.xMin) * 2 : 300}px`,
          height: `${startGame || round > 1 ? (hra.yMax - hra.yMin) * 2 : 300}px`,
          top: `${startGame || round > 1 ? hra.yMin : 900}px`,
          left: `${startGame || round > 1 ? hra.xMin : 200}px`,
          transform: 'translateY(-50%)',
          // border: `${!startGame && round === 1
          //   ? prompt === 1
          //     ? '5px solid #ff00ff'
          //     : '5px solid #fff'
          //   : 'none'
          //   }`,
          borderRadius: '50%',
          transition: '.5s',
        }}
      >
        <Box className="circle-big" style={{ display: !hideCircle && round === 1 ? 'block' : 'none' }}>
          <svg>
            <circle className="bg" cx="150" cy="150" r="145"></circle>
            <circle className="progress" cx="150" cy="150" r="145" style={{ strokeDashoffset: prompt === 1 ? '0' : '1000' }}></circle>
          </svg>
          <img className="left" src={handImg} alt="" style={{ display: prompt === 1 ? 'none' : 'block' }} />
        </Box>
      </Box>
      {/* {prompt === 2 ? <BaterflyDemo {...{ color, baterflyImg }} /> : null} */}
    </>
  );
};

export default HandComponent;
