"use client"
import React from 'react';

const TimerBar = ({ style }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '9px', backgroundColor: '#ccc', borderRadius: '0 0 0.375rem 0.375rem' }}>
      <div style={{ ...style, height: '100%', background: 'linear-gradient(to right, #CB55FF, #9E25D3, #7102A2)', borderRadius: 'inherit', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }}></div>
    </div>
  );
};

export default TimerBar;




