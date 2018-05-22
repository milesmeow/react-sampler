import React from 'react';
import { render } from 'react-dom';

import Button from './button.jsx';
import Playback from './playback.jsx';

const Board = props => {
  
  let board = [];
  for(let i = 0; i < 4; i++){
    let buttonrow = [];
    for(let j = 0; j < 4; j++){
    buttonrow.push(<Button id={(4*i)+j} keyCodes={props.keyCodes} keySymbols={props.keySymbols} clickHandler={props.clickHandler} removeTransition={props.removeTransition} audioFiles={props.audioFiles}/>)
  }
  board.push(<div id={i} className="button-row">{buttonrow}</div>);
}

    return <div id="board">
        {board}
        <Playback stopSession={props.stopSession} recordSession={props.recordSession} playSession={props.playSession} />
      </div>;
  }

export default Board;