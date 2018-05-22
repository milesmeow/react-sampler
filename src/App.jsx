import React from 'react';
import { render } from 'react-dom';

import Board from './components/board.jsx';
import VizLib from './components/vizlib.jsx';
import Settings from './components/settings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCodes: [49, 50, 51, 52, 81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86],
      keySymbols: [1, 2, 3, 4, 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'],
      audioFiles: [
        {
          name: "clap",
          source: "samples/ clap.WAV"
        },
        {
          name: "closed-hat",
          source: "samples/ closed-hat.WAV"
        },
        {
          name: "cowbell",
          source: "samples/ cowbell.WAV"
        },
        {
          name: "cymbal",
          source: "samples/ cymbal.WAV"
        },
        {
          name: "high tom",
          source: "samples/ high tom.WAV"
        },
        {
          name: "kick drum",
          source: "samples/ kick drum.WAV"
        },
        {
          name: "mid tom",
          source: "samples/ mid tom.WAV"
        },
        {
          name: "open-hat",
          source: "samples/ open-hat.WAV"
        },
        {
          name: "snare",
          source: "samples/ snare.WAV"
        },
        {
          name: "808 loop",
          source: "samples/808 loop.WAV"
        },
        {
          name: "bass stab",
          source: "samples/bass stab.WAV"
        },
        {
          name: "blip",
          source:"samples/blip.WAV"
        },
        {
          name: "bongo",
          source:"samples/bongo.WAV"
        },
        {
          name: "haht",
          source:"samples/haht.WAV"
        },
        {
          name: "house loop",
          source: "samples/house loop.WAV"
        },
        {
          name: "nomsayn",
          source: "samples/nomsayn.WAV"
        },
        ],
      mapText: '',
      mapMode: false,
      loopMode: false
      }



    this.recordingSessionData = {
      isRecording: false, sessions: [{ name: 'sessA', startTime:-Infinity, data: [] }]
    }




    this.clickHandler = this.clickHandler.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    this.addSample = this.addSample.bind(this);
    this.mapSample = this.mapSample.bind(this);
    this.recordSession = this.recordSession.bind(this);
    this.stopSession = this.stopSession.bind(this);
    this.playSession = this.playSession.bind(this);
  }

  mapSample(e) {
    if (e.target.id === 'loop') {
      this.state.loopMode = true;
      return;
    }
    this.state.mapText = e.target.dataset.source;
    this.state.mapMode = true;
    let buttons = document.getElementsByClassName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "linear-gradient(to top, rgb(149, 104, 255), rgb(132, 0, 255))";
    }
    document.getElementById('map-mode').style.visibility = 'visible';
  }
  
  clickHandler(e) {

    let code = parseInt(e.target.dataset.key) || e.keyCode; //set the code to either the click target or if undefined the keyboard key
    let id = e.target.id;
    let key = document.querySelector(`div[data-key="${code}"]`);
    let audio = document.querySelector(`audio[data-key="${code}"]`);
    console.log(`e.target.dataset.key ${e.target.dataset.key}`);

    // record session
    if (this.recordingSessionData.isRecording) {
      this.recordingSessionData.sessions[0].data.push( e.timeStamp, code);
    }
    console.log(this.recordingSessionData.sessions[0].data);

    // if (this.props.recordingSessionData.isRecording) {
    //   this.props.recordingSessionData.sessions[0].data.push(e.timeStamp, code);
    // }
    // console.log(this.props.recordingSessionData.sessions[0].data);
    // console.log(this.props.recordingSessionData);

    if (this.state.mapMode) {
      audio.src = this.state.mapText;
      let buttons = document.getElementsByClassName('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.background = "linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))";
      }
      document.getElementById('map-mode').style.visibility = 'hidden';
    }
    else if (this.state.loopMode) {
      if (audio.loop === true) {
        audio.loop = false
        key.style.background = "linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))";
      }
      else {
        audio.loop = true;
        key.style.background = "rgba(255, 165, 0, 1)";
      } 
      this.state.loopMode = false;
      return;
    }
    else {
      if (!audio) return;
      if (e.keyCode) {
        key.style.background = "rgba(255, 165, 0, 1)";
        setTimeout(() => {
          key.style.background = "linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))";
        }, 100);
      }
      key.classList.add("playing");
      audio.currentTime = 0;
      audio.play();
    }
    this.state.mapMode = false;
  };

  addSample(e) {
    let samples = [].concat(this.state.audioFiles);
    for (let i = 0; i < e.target.files.length; i++) {
      let sampleURL = window.URL.createObjectURL(e.target.files[i]);
      samples.push({name: e.target.files[i].name.replace(/(^samples\/)|(\..+$)/g,''), source: sampleURL});
      this.setState({audioFiles: samples});
    }
  };
  
  removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  };
  
  recordSession(e) {
    console.log('recording a session...OVERWRITES the current session');
    //save the start session timestamp
    this.recordingSessionData.isRecording = true;
    this.recordingSessionData.sessions[0].startTime = e.timeStamp;
    this.recordingSessionData.sessions[0].data = [];
    console.log(this.recordingSessionData);

    // recordingSessionData.isRecording = true;
    // recordingSessionData.sessions[0].startTime = e.timeStamp;
    // recordingSessionData.sessions[0].data = [];
    // console.log(recordingSessionData);

  }

  stopSession() {
    console.log('stop recordinng a session');
    this.recordingSessionData.isRecording = false;
    console.log(this.recordingSessionData);
  }

  playSession() {
    console.log('playing a session...');
    // settings.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 81 }));

    //
    // document.querySelector(`audio[data-key="81"]`).play();

    var audioCtx = new AudioContext();
    let myMediaElement = document.querySelector(`audio[data-key="81"]`);
    // var source = audioCtx.createMediaElementSource(myMediaElement);
    // console.log('audioCtx: ', audioCtx);
    // console.log("source: ", source);
    
    myMediaElement.play();

    // document.dispatchEvent(new KeyboardEvent('keyup', { 'key': 'Shift' }));
  }

  render() {
    window.addEventListener('keydown', this.clickHandler);
    return (
      <div>
        <div id="map-mode">
          Map Mode
        </div>
        <Board keyCodes={this.state.keyCodes} keySymbols={this.state.keySymbols} clickHandler={this.clickHandler} removeTransition={this.removeTransition} audioFiles={this.state.audioFiles} stopSession={this.stopSession} recordSession={this.recordSession} playSession={this.playSession} />
        <VizLib audioFiles={this.state.audioFiles} addSample={this.addSample} mapSample={this.mapSample}/>
        <Settings />
      </div>
    )
  }
}

export default App;