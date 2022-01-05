import React from 'react';
import style from './TimeOver.module.css'

const TimeOver = ({ gameFinish }) => {
    return (
        <>
            <div className={style.timeWrap} style={{
                animation: gameFinish ? 'scaling 6s' : ''
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