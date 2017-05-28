import {Injectable} from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;

@Injectable()
export class AudioServiceService {
  public isRecording = false;
  private chunks: any = [];
  private mediaRecorder: any;
  private stream: MediaStream;


  constructor() {
  }


  successCallback(stream: MediaStream) {
    this.stream = stream;
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.onstop = e => {
      const audio = new Audio();
      const blob = new Blob(this.chunks, {'type': 'audio/ogg; codecs=opus'});
      this.chunks.length = 0;
      audio.src = window.URL.createObjectURL(blob);
      audio.load();
      audio.play();
    };

    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
  }

  errorCallback() {
    // handle error here
    console.log('not able to record audio');
  }

  startRecording() {
    const mediaConstraints = {
      video: false,
      audio: true
    };

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    this.mediaRecorder.stop();
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }
}
