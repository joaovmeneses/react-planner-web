import React from 'react';
import { connect } from 'react-redux';
import { startTimer, pauseTimer, stopTimer } from '../redux/actions';

const Timer = ({ isRunning, startTimer, pauseTimer, stopTimer }) => {
  return (
    <div>
      <div>Tempo: {isRunning ? 'Rodando' : 'Parado'}</div>
      <button onClick={startTimer}>Iniciar</button>
      <button onClick={pauseTimer}>Pausar</button>
      <button onClick={stopTimer}>Parar</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isRunning: state.isRunning,
});

const mapDispatchToProps = {
  startTimer,
  pauseTimer,
  stopTimer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);