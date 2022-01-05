// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DetectCollision from '../../utils/DetectCollision'
// import { RootState } from 'features';
// import { Box } from '@mui/material';
// // import { setFireworkCoords } from '../../features/Arcade/reducer';
// // import violetSphereImg from './assets/violet-sphere.png';
// import { setFirework } from 'features/Arcade/reducer';
// import fireworkImg from './assets/firework-no-loop.gif';
// import redSphereImg from './assets/ball-red.png';
// import violetSphere from './assets/violet-sphere.png';
// // import { FireworkCoords } from './../../features/Arcade/models';

// const FireworkComponent = () => {
//   const dispatch = useDispatch();
//   const { firework, startGame } = useSelector(
//     (state: RootState) => state.arcade
//   );
//   const [stopCaught, setStopCaught] = useState(false)
//   const [playFirework, setPlayFirework] = useState(false)
//   const [fireworkOpacity, setFireworkOpacity] = useState(0)
//   const caught = DetectCollision(0);

//   const changeFirework = () => {
//     // const { firework } = useSelector((state: RootState) => state.arcade);
//     // if (startGame) dispatch(setFirework({ playFirework: true }));
//     // dispatch(setFirework({ image: violetSphere }));
//     // dispatch(setFirework({ ready: false }));
//     setTimeout(() => {
//       setPlayFirework(false)
//       // dispatch(setFirework({ playFirework: false }));
//       // dispatch(setFirework({ fireworkOpacity: 0 }));
//       setFireworkOpacity(0)
//       dispatch(setFirework({ image: '' }));
//       setTimeout(() => {
//         setFireworkOpacity(1)
//         // dispatch(setFirework({ fireworkOpacity: 1 }));
//         dispatch(
//           setFirework({ x: Math.floor((640 * 1.6875 - 50) * Math.random()) })
//         );
//         // dispatch(setFirework({ y: 660 }));
//         dispatch(setFirework({ ready: true }));
//         setStopCaught(false);
//         dispatch(setFirework({ image: violetSphere }));
//         // console.log('WORKED');
//         // dispatch(
//         //   setFirework({
//         //     x: Math.floor((640 * 1.6875 - 200) * Math.random()),
//         //     y: 660,
//         //     ready: true,
//         //   })
//         // );
//       }, 1000);
//       dispatch(setFirework({ delay: 2000 }));
//     }, firework.delay);
//   };
//   // (
//   //   (fa.centerX > points.leftMin[0] &&
//   //     fa.centerX < points.leftMax[0] &&
//   //     fa.centerY > points.leftMin[1] &&
//   //     fa.centerY < points.leftMax[1]) ||
//   //   (fa.centerX > points.rightMin[0] &&
//   //     fa.centerX < points.rightMax[0] &&
//   //     fa.centerY > points.rightMin[1] &&
//   //     fa.centerY < points.rightMax[1])
//   // )
//   // const { fireworkCoords } = props;
//   // const [firework, setFirework] = useState<null | any>(null);
//   // const [playFirework, setPlayFirework] = useState(false);
//   // // const [fireworkReady, setFireworkReady] = useState(false)
//   // const [fireworkOpacity, setFireworkOpacity] = useState<null | any>(1);
//   useEffect(() => {
//     // if(stopCaught) return

//     if (caught && !stopCaught) {
//       setStopCaught(true)
//       console.log('CAUTCH',caught)
//       setPlayFirework(true)
//       dispatch(setFirework({ image: redSphereImg }));
//       changeFirework()
//     }

//   }, [caught])
//   // useEffect(() => {
//   //   console.log('firework', firework);
//   //   console.log('ready', firework.ready);
//   //   if (firework.ready && firework.delay === 1) changeFirework();
//   //   // console.log('FIREWORKCOORD', firework);
//   // }, [firework]);

//   useEffect(() => {
//     if (startGame) {
//       changeFirework()
//       dispatch(setFirework({ image: violetSphere }));
//     }

//     console.log("startgame")
//   },[startGame])
//   // useEffect(() => {
//   //   changeFirework();
//   // }, []);
//   return (
//     <>
//       <Box
//         sx={{
//           position: 'absolute',
//           width: '50px',
//           height: '50px',
//           top: `${firework?.y || 0}px`,
//           left: `${firework?.x || 0}px`,
//           background: `url(${
//             firework.image
//             // firework.playFirework ? redSphereImg : firework?.image || ''
//           }) no-repeat center`,
//           backgroundSize: 'contain',
//           visibility: startGame ? 'visible' : 'hidden',
//           opacity: fireworkOpacity,
//           transition: 'opacity .5s',
//           zIndex: '10',
//         }}
//       />
//       <Box
//         sx={{
//           position: 'absolute',
//           width: '50px',
//           height: '50px',
//           top: `${firework?.y || 0}px`,
//           left: `${firework?.x || 0}px`,
//           visibility: firework ? 'visible' : 'hidden',
//           opacity: fireworkOpacity,
//           transition: 'opacity .5s',
//           zIndex: '1',
//         }}
//       >
//         <img
//           style={{
//             width: '200px',
//             transform: 'translate(-73px, -80%)',
//             zIndex: 1,
//           }}
//           src={playFirework ? fireworkImg : ''}
//           alt=""
//         />
//       </Box>
//     </>
//   );
// };

// export default FireworkComponent;
