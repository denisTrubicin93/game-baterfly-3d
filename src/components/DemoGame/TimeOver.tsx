import React, { useRef } from 'react';
import style from './TimeOver.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setRound, setPrompt } from 'features/Arcade/reducer';
import { RootState } from 'features';


const TimeOver = ({ isEndRound, endGame }) => {
    const timeRef = useRef()
    const dispatch = useDispatch()
    const { round } = useSelector((state: RootState) => state.arcade);
    const handleAnimation = () => {
        if (round < 3) {
            dispatch(setPrompt(2))
            setTimeout(() => {
                dispatch(setRound(round + 1))
                dispatch(setPrompt(3))
            }, 5000);
        } else endGame()

    }
    return (
        <>
            <div ref={timeRef} onAnimationEnd={handleAnimation} className={style.timeWrap} style={{
                animation: isEndRound ? 'scaling 6s' : ''
            }}>
                <h1>
                    <span>t</span>
                    <span>i</span>
                    <span>m</span>
                    <span>e</span>
                    <div></div>
                    <span>i</span>
                    <span>s</span>
                    <div></div>
                    <span>o</span>
                    <span>v</span>
                    <span>e</span>
                    <span>r</span>
                </h1>

            </div>
        </>
    )
}

export default TimeOver