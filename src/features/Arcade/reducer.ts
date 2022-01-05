import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords, PrevCoords, initialState } from './models';

const arcadeSlice = createSlice({
  name: 'arcade',
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<Coords>) => {
      // if (state.coords) {
      //   state.coords = JSON.parse(JSON.stringify(action.payload));
      // }
      // let res = action.payload;
      // res.result[0][0][0] = res.result[0][0][0] * -1 + 480
      // res.result[0][1][0] = res.result[0][1][0] * -1 + 480
      // res.result[1][0][0] = res.result[1][0][0] * -1 + 480
      // res.result[1][1][0] = res.result[1][1][0] * -1 + 480
      // console.log(action.payload.result[1][0][0])
      state.coords = action.payload;
    },
    setFireworkCoords: (state, action: PayloadAction<any>) => {
      state.firework.x = action.payload.x;
      state.firework.y = action.payload.y;
    },
    setTypeScene: (state, action: PayloadAction<string>) => {
      state.typeScene = action.payload
    },
    setFirework: (state, action: PayloadAction<any>) => {
      console.log('ACTION', action.payload);
      if (action.payload.image) state.firework.image = action.payload.image;
      if (action.payload.x) state.firework.x = action.payload.x;
      if (action.payload.y) state.firework.y = action.payload.y;
      if (action.payload.ready) state.firework.ready = action.payload.ready;
      if (action.payload.delay) state.firework.delay = action.payload.delay;
      if (action.payload.playFirework)
        state.firework.playFirework = action.payload.playFirework;
      if (action.payload.fireworkOpacity)
        state.firework.fireworkOpacity = action.payload.fireworkOpacity;
    },
    setPrevCoords: (state, action: PayloadAction<PrevCoords>) => {
      state.prevCoords = action.payload;
    },
    setFireworkReady: (state, action: PayloadAction<boolean>) => {
      state.firework.ready = action.payload;
    },
    setStartGame: (state, action: PayloadAction<boolean>) => {
      state.startGame = action.payload;
    },
    setCautch: (state, action: PayloadAction<boolean>) => {
      state.cautch = action.payload;
    },
    setActiveFlower: (state, action: PayloadAction<any>) => {
      state.isActive[action.payload] = true;
    },
    setColorFlower: (state, action: PayloadAction<Array<string>>) => {
      state.colorFlower = action.payload;
    },
    setPosXFlower: (state, action: PayloadAction<Array<number>>) => {
      state.posXFlower = action.payload;
    },
    setActiveHand: (state, action: PayloadAction<any>) => {
      const { hand, value } = action.payload;
      if (hand === 'left') state.activeHand.left = value;
      else if (hand === 'right') state.activeHand.right = value;
    },
    setCapture: (state, action: PayloadAction<string>) => {
      state.capture = action.payload;
    },
    setPrompt: (state, action: PayloadAction<number>) => {
      state.prompt = action.payload;
    },
    setPoints: (state, action: PayloadAction<number>) => {
      // if (state.coords) {
      //   state.coords = JSON.parse(JSON.stringify(action.payload));
      // }
      state.points = action.payload;
      console.log('setPoints', state.points);
    },
    setRound: (state, action: PayloadAction<number>) => {
      state.round = action.payload;
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.gameWin = action.payload;
    },
    setDefaultState: (state) => {
      state.startGame = false;
      state.cautch = false;
      state.capture = '';
      state.activeHand = {
        right: false,
        left: false,
      };
      state.isActive = [false, false, false, false, false];
    },
  },
});

export default arcadeSlice.reducer;
export const {
  setCoords,
  setPoints,
  setFirework,
  setFireworkReady,
  setStartGame,
  setCautch,
  setFireworkCoords,
  setColorFlower,
  setPosXFlower,
  setPrevCoords,
  setActiveFlower,
  setCapture,
  setPrompt,
  setActiveHand,
  setDefaultState,
  setRound,
  setWin,
  setTypeScene
} = arcadeSlice.actions;
