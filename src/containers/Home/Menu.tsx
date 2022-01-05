import React, { useState, } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Grid, styled, Typography } from '@mui/material';
import { setTypeScene } from 'features/Arcade/reducer';
// import { sendMessageAction } from '../../features/Websocket/reducer';
// import useFootControl from '../../components/common/hook/useFootControl';
import BorderBg from './assets/border_bg.png';
import BorderBgActive from './assets/border_bg_active.png';
import child from './assets/child.png';
import adult from './assets/adult.png';
import { sendMessageAction } from 'features/Websocket/reducer';

// import { useMediapipe } from '../../components/common/useMediapipe';
const Styles = styled('div')({
  width: 1080,
  height: 1920,
  top: 0,
  left: 0,
  boxSizing: 'border-box',
  '& .music_header': {
    fontFamily: 'Yomogi',
    position: 'absolute',
    height: 175,
    width: '100%',
    background: 'transparent',
    top: 0,
    zIndex: 100,
    color: '#000000',
    fontSize: 80,
    letterSpacing: '0.025em',
    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
    fontWeight: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 400,
    boxSizing: 'border-box',
  },
  '& .background': {
    width: 1080,
    height: 1920,
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& .top_title': {
      fontSize: 80,
      fontWeight: 900,
      position: 'relative',
      top: 335,
      color: '#000000',
    },
    '& .btn_box': {
      position: 'relative',
      width: '100%',
      top: 400,
    },
    '& .border_btn': {
      width: 320,
      height: 320,
      background: `url(${BorderBg}) no-repeat center`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.25)',
      borderRadius: 80,
      marginBottom: 10,
    },
    '& .border_btn_active': {
      background: `url(${BorderBgActive}) no-repeat center`,
    },
    '& .btn_title': {
      color: '#613BFF',
      fontWeight: 800,
      fontSize: 48,
      textAlign: 'center',
      width: 320,
    },
    '& .guide_box': {
      width: 920,
      borderRadius: 24,
      position: 'absolute',
      top: 1000,
      gap: 20,
    },
  },
},
);

const Menu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0)
  // const [second, setSecond] = useState(3);
  // useEffect(() => {
  //   if (second === 0) {
  //     dispatch(
  //       sendMessageAction({
  //         to: 'pose',
  //         message: {
  //           cmd: 'foot_stop',
  //         },
  //       })
  //     )
  //     dispatch(sendMessageAction({
  //       to: 'pose',
  //       message: {
  //         cmd: 'change_mode',
  //         mode: 'hands_detect',
  //       }
  //     }));
  //     dispatch(
  //       sendMessageAction({
  //         to: 'pose',
  //         message: {
  //           cmd: 'hands_detect_start',
  //         },
  //       })
  //     )
  //     history.push('./round1');
  //   }
  //   setTimeout(() => {
  //     setSecond(() => second - 1);
  //   }, 1000);
  // }, [history, second]);
  const onTap = (type) => {
    dispatch(setTypeScene(type))
    dispatch(
      sendMessageAction({
        to: 'pose',
        message: {
          cmd: 'foot_stop',
        },
      })
    )
    dispatch(sendMessageAction({
      to: 'pose',
      message: {
        cmd: 'change_mode',
        mode: 'hands_detect',
      }
    }));
    dispatch(
      sendMessageAction({
        to: 'pose',
        message: {
          cmd: 'hands_detect_start',
        },
      })
    )
    history.push('round1');
  }
  const onHover = (index) => {
    setCurrentIndex(index)
  }
  const buttons: any[] = [
    {
      title: 'こども',
      type: 'child',
      // onTap: () => {
      //   history.push('menu');
      // },
      icon: child,
    },
    {
      title: '大人',
      type: 'adult',
      // onTap: () => {
      //   history.push('menu');
      // },
      icon: adult,
    },
  ];

  // const { currentIndex, onTap, onHover } = useFootControl({
  //   intitialIndex: 0,
  //   actions: buttons.map((x: any) => x.onTap as Function),
  //   goBack: () => {
  //     dispatch(
  //       sendMessageAction({
  //         to: 'pose',
  //         message: {
  //           cmd: 'neutral'
  //         },
  //       })
  //     );
  //     history.push('/');
  //   },
  // });

  const buttonClasses = (index: number) => {
    return index === currentIndex
      ? 'border_btn border_btn_active'
      : 'border_btn';
  };
  return (
    <>
      <Box
        sx={{
          // width: window.innerWidth,
          // height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          background: '#fbdc9d',
        }}
      >
        <Styles>
          <Box className="background">
            {/* <Typography className="top_title">モードを選んでね！</Typography> */}
            <Grid
              // container
              // direction="row"
              // justify="space-around"
              style={{ display: 'flex', justifyContent: 'space-around' }}
              className="btn_box"
            >
              {buttons.map((x, index) => (
                <Grid
                  // item
                  // direction="column"
                  // justify="center"
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  key={index}
                  onClick={() => onTap(x.type)}
                  onMouseOver={() => onHover(index)}
                >
                  <Box className={buttonClasses(index)}>
                    <img src={x.icon} />
                  </Box>
                  <Typography className="btn_title">{x.title}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Styles>

      </Box>
    </>

  );
};

export default Menu;
