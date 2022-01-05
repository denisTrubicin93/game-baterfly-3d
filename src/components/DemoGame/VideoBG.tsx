import React from 'react';

const VideoBG = () => {
  return (
    <>
      <img
        style={{ width: '100%', height: '100%', transform: 'rotateY(180deg)' }}
        src="http://localhost:8090/vid"
        // src=""
        alt=""
      />
    </>
  );
};

export default VideoBG;
