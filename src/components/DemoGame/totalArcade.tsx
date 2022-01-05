import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
// import violetSphereImg from './assets/violet-sphere.png';
// import fireworkImg from './assets/firework.gif';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { RootState } from '../../features';
// import { useHistory } from 'react-router';
// import { sendMessageAction } from '../../features/Websocket/reducer';

const TotalBox = styled('div')({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '300px',
  height: '200px',
  borderRadius: '50%',
  backgroundColor: 'rgb(63,94,251)',
  background:
    'radial-gradient(circle, rgb(29 225 35 / 75%) 0%, rgb(255 255 255 / 35%) 100%)',
  '& .total-point': {
    fontSize: '100px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
  },
  // '& .fireWork': {
  //   position: 'absolute',
  //   left: '50%',
  //   bottom: '-100px',
  //   transform: 'translateX(-50%)',
  //   width: '100%',
  // },
  // '& .fireWork img': {
  //   width: '200px',
  //   height: '200px',
  //   position: 'absolute',
  //   left: '50%',
  //   transform: 'translateX(-50%)',
  //   zIndex: '2',
  //   '&:first-child': {
  //     width: '50px',
  //     height: '50px',
  //     top: '160px',
  //     left: '49%'
  //   },
  //   '&:last-child': {
  //     zIndex: '1',
  //   },
  // },
});
const TotalArcade = ({ gameFinish, clearScene }) => {
  // const history = useHistory()
  // const dispatch = useDispatch()
  const { points } = useSelector((state: RootState) => state.arcade);
  const [showTotal, setShowTotal] = useState(false)
  useEffect(() => {
    if (gameFinish)
      setTimeout(() => {
        setShowTotal(true)
        clearScene()
      }, 5000);

    // dispatch(
    //   sendMessageAction({
    //     to: 'pose',
    //     message: {
    //       cmd: 'hands_detect_stop',
    //     },
    //   })
    // )
    // setTimeout(() => {
    //   history.push('/')
    // }, 5000);
  }, [gameFinish])
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          transform: showTotal ? 'scale(1)' : 'scale(0)',
          animation: gameFinish ? 'scalingTotal 2s 5s' : ''
          // background: '#fbdc9d',
        }}
      >
        <Box>
          <TotalBox>
            <Typography className="total-point">{points}</Typography>
            {/* <Box className="fireWork">
              <img src={violetSphereImg} alt="" />
              <img src={fireworkImg} alt="" />
            </Box> */}
          </TotalBox>
        </Box>
      </Box>
    </>
  );
};

export default TotalArcade;
