import React from 'react';
import { render } from 'react-dom';

class Playback extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   recorder: '',
    //   audio: '',
    // }
    // this.recordAudio = this.recordAudio.bind(this);
    // this.stopRecording = this.stopRecording.bind(this);
    // }
 
  // recordAudio() {
  //   console.log('start recording');
  //   console.log(this.state.recorder);
  //   this.state.recorder.start();

  //   let chunks = [];
  //   this.state.recorder.ondataavailable = function(e) {
  //     chunks.push(e.data);
  //     var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  //   }

  //   this.state.recorder.onstop = function(e) {
  //     console.log('"onstop" event detected...recorder stopped');
  //     var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
  //     var audioURL = window.URL.createObjectURL(blob);
  //     console.log('audio: ', audio);
  //     this.audio.src = audioURL;
      
  //   }
  
}

  // stopRecording() {
  //   console.log('stop recording');
  //   console.log('this.state.recorder: ', this.state.recorder);
  //   if (this.state.recorder.state !== 'inactive') this.state.recorder.stop();
  //   // this.state.recorder.stop();
  // }


  componentDidMount() {
    // let audio = document.getElementById("12").childNodes[1];
    // let audioStream = audio.captureStream();
    // let recorder = new MediaRecorder(audioStream);
    // this.setState({recorder});
  }

  render() {
    return (
      <div id="playback">
        <button id="record" onClick={this.props.recordSession}><i className="fas fa-circle"></i></button>
        <button><i className="fas fa-play" onClick={this.props.playSession}></i></button>
        {/* <button><i className="fas fa-pause"></i></button> */}
        <button onClick={this.props.stopSession}><i className="fas fa-stop"></i></button>
      </div>
    )
  }
}

export default Playback;