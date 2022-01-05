import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'features';

import { Box, styled, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { sendMessageAction } from 'features/Websocket/reducer';
// import { useHistory } from 'react-router';

const SB = styled('div')({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '10',
  width: `100%`,
  height: '150px',
  '& .timer': {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '10px 30px',
    borderRadius: '40px',
    border: '10px solid #000',
    fontSize: '50px',
    '& .timerIcon': {
      fontSize: '65px',
      verticalAlign: 'bottom',
      marginLeft: '20px',
      color: '#fff',
    },
  },
  '& .points': {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    backgroundColor: 'rgb(2,0,36)',
    background:
      'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    '& .textPoints': {
      color: '#fff',
      fontSize: '60px',
      textAlign: 'center',
      lineHeight: '130px',
    },
  },
});

const StatusBar = (props) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const time = 40
  const { points, startGame } = useSelector((state: RootState) => state.arcade);
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (seconds > 0 && startGame) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {

      dispatch(
        sendMessageAction({
          to: 'pose',
          message: {
            cmd: 'hands_detect_stop',
          },
        })
      )
      props.endRound(true)

      // props.endRound(round);
    }
  }, [seconds]);
  useEffect(() => {
    if (startGame) setSeconds(() => seconds - 1);
    // if (startGame && round < 3) setSeconds(() => 3 - 1);
    // if (round < 3) setSeconds(() => 3);
    // if (startGame && round === 3) setSeconds(() => 29);
  }, [startGame])
  return (
    <div>
      <SB>
        <Box
          className="timer"
          sx={{
            animation: `${startGame ? `timerColor ${time}s linear` : ''}`,
            background: '#2dd141',
          }}
        >
          00:{seconds.toString().length > 1 ? seconds : `0${seconds}`}
          <AccessTimeIcon className="timerIcon" />
        </Box>
        <Box className="points">
          <Typography className="textPoints">{points}</Typography>
        </Box>
      </SB>
    </div>
  );
};
export default StatusBar;


