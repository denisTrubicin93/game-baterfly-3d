/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useSound from 'use-sound';
import { RootState } from 'features';
import { catchDetect } from 'utils/funcs';
import {
    setActiveHand,
    setStartGame,
    setPrompt,
    setCapture
} from '../../../features/Arcade/reducer';
import { detectCollision } from '../../../utils/DetectCollision';
import successAudio from '../assets/audio/success.mp3';
import catchAudio from '../assets/audio/catch.mp3';
import handImg from '../assets/hand.png';
import styles from './Baterfly.module.scss';


const BaterflyDemo = (props) => {
    const dispatch = useDispatch();
    const { color, baterflyImg } = props;
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
    const { coords, startGame, isActive, activeHand, round, prompt, colorFlower, ratio } = useSelector(
        (state: RootState) => state.arcade
    );
    const [posBaterfly, setPosBaterfly] = useState<any>({ x: 575, y: 50 });
    const [batId, setBatId] = useState(null);
    // const [initBaterfly, setInitBaterfly] = useState(false);
    const [anchorBaterfly, setAnchorBaterfly] = useState('');
    const [activeFlower, setActivedFlower] = useState<number>();
    const [caught, setCaught] = useState(false);
    const [handVisible, setHandVisible] = useState(false)
    const [stopCaught, setStopCaught] = useState(false);
    const [sound, setSound] = useState<any>();
    const xFlowerList = [175, 375, 550, 775, 975];
    const audioList = {
        success: useSound(successAudio),
        catch: useSound(catchAudio),
    };


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

    // useEffect(() => {
    //     if (anchorBaterfly === 'free') {
    //         setTimeout(
    //             () => {
    //                 setInitBaterfly(true);
    //                 setPosBaterfly(() => randomVector());
    //             },
    //             initBaterfly ? 5000 : 500
    //         );
    //     }
    // }, [posBaterfly]);
    const handlerTransition = (e) => {
        if (e.propertyName === 'top') {
            setHandVisible(true);
            document.removeEventListener('transitionend', handlerTransition)
        }
    }

    useEffect(() => {
        if (anchorBaterfly !== 'free') return;
        if (posBaterfly && !startGame && handVisible) {
            const { x, y } = posBaterfly;
            const hit = catchDetect(hra, hla, x, y, activeHand);
            if (hit.hand) {
                setSound(() => audioList.catch);
                setHandVisible(false);
                dispatch(setActiveHand({ hand: hit.hand, value: true }));
                setAnchorBaterfly(() => hit.hand);
                dispatch(setCapture(hit.hand));
            }
        }
    }, [coords]);

    useEffect(() => {
        if (prompt === 2) {
            setTimeout(() => {
                const centerPos = { x: 550, y: 1200 }
                setPosBaterfly(() => centerPos);
                setAnchorBaterfly(() => 'free');
            }, 500);
        }
    }, [prompt]);

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
            setTimeout(() => {
                dispatch(setStartGame(true))
                dispatch(setPrompt(3))
            }, 2000);

            setBatId(() => hit.id);
            setActivedFlower(() => hit.id);
            setCaught(hit?.id);
        }
    }, [coords]);

    useEffect(() => {
        if (caught && !stopCaught) {
            setStopCaught(true);
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

    useEffect(() => {
        document.addEventListener('transitionend', handlerTransition)
    }, [])

    return (
        <>
            <div
                id='demo-baterfly'
                className={styles.demoWrapper}
                style={{
                    display: `${prompt === 2 ? 'block' : 'none'}`,
                    transition: `1.5s`,
                    top: `${activeFlower === batId && anchorBaterfly === 'flower'
                        ? 1450
                        : anchorBaterfly === 'right'
                            ? hra.yMin
                            : anchorBaterfly === 'left'
                                ? hla.yMin
                                : posBaterfly?.y
                        }px`,
                    left: `${activeFlower === batId && anchorBaterfly === 'flower'
                        ? xFlowerList[activeFlower]
                        : anchorBaterfly === 'right'
                            ? hra.xMin
                            : anchorBaterfly === 'left'
                                ? hla.xMin
                                : posBaterfly?.x
                        }px`,
                    width: `${activeFlower === batId && anchorBaterfly === 'flower'
                        ? 150
                        : anchorBaterfly === 'right'
                            ? (hra.xMax - hra.xMin) * 2
                            : anchorBaterfly === 'left'
                                ? (hla.xMax - hla.xMin) * 2
                                : 150
                        }px`,
                    height: `${activeFlower === batId && anchorBaterfly === 'flower'
                        ? 100
                        : anchorBaterfly === 'right'
                            ? (hra.yMax - hra.yMin) * 2
                            : anchorBaterfly === 'left'
                                ? (hla.yMax - hla.yMin) * 2
                                : 100
                        }px`,
                    zIndex: '1000'
                }}
            >
                <img className={styles.baterfly} src={baterflyImg} alt="" />
                <img className={styles.hand} src={handImg} alt="" style={{ display: handVisible ? 'block' : 'none' }} />
            </div>

        </>
    );
};

export default BaterflyDemo;
