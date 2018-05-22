import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

var recordingSessionData = {
  isRecording: false, sessions: [{ name: 'sessA', startTime: -Infinity, data: [] }]
}

render(<App  recordingSessionData={recordingSessionData} />, document.getElementById('contents'));