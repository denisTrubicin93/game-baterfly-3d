/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'features';
import { Box, Typography } from '@mui/material';

// import styles from './Flower.module.scss';

const FlowerComponent = () => {
  // const { image, x } = props;
  // const { image, x } = flower;

  const { prompt, round } = useSelector((state: RootState) => state.arcade);

  // const factorWidth = 1.6875;
  // const [leftHand, rightHand] = coords.result;
  // const [[xl1, yl1], [xl2, yl2]] = leftHand;
  // const [[xr1, yr1], [xr2, yr2]] = rightHand;

  // const hla = {
  //   xMin: xl1 * factorWidth,
  //   xMax: xl2 * factorWidth,
  //   yMin: yl1 * factorWidth,
  //   yMax: yl2 * factorWidth,
  // };
  // const hra = {
  //   xMin: xr1 * factorWidth,
  //   xMax: xr2 * factorWidth,
  //   yMin: yr1 * factorWidth,
  //   yMax: yr2 * factorWidth,
  // };
  // const points = {
  //   left: {
  //     x1: 1080 - hla.xMin - 50,
  //     y1: hla.yMin - 50,
  //     // x2: (1080 - hla.xMin) - 300,
  //     x2: 1080 - hla.xMin - 50,
  //     y2: hla.yMin - 50,
  //   },
  //   right: {
  //     x1: 1080 - hra.xMin - 50,
  //     y1: hra.yMin - 50,
  //     // x2: (1080 - hra.xMin) - 300,
  //     x2: 1080 - hra.xMin + 50,
  //     y2: hra.yMin + 50,
  //   },
  // };

  return (
    <Box>
      <Box
        sx={{
          // display: `${prompt === 2 ? 'block' : 'none'}`,
          // position: 'absolute',
          // top: '100px',
          // left: '50%',
          // transform: 'translateX(-50%)',
          // color: 'orange',
          // background: '#000000a3',
          // borderRadius: '50px',
          // padding: '20px',
          // textAlign: 'center',
          // transition: '0.5s',

          display: `${prompt === 2 && round === 1 ? 'block' : 'none'}`,
          width: '700px',
          position: 'absolute',
          top: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'orange',
          background: prompt === 2 ? '#000000a3' : 'none',
          borderRadius: '50px',
          padding: '20px',
          textAlign: 'center',
          transition: '0.5s',

        }}
      >

        <Typography
          sx={{
            fontWeight: '800',
            fontSize: '32px',
          }}
        >
          空中に飛んでいる蝶々を手で捕まえて、お花さんにゆうどうしてね!
        </Typography>
      </Box>
      {/* <Box className={styles.wrapper} style={{ left: `${x}px` }}>
        <img src={image} alt="" />
      </Box> */}
    </Box>
  );
};

export default React.memo(FlowerComponent);
