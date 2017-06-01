import {Component, Input, OnInit} from '@angular/core';
import {UploadService} from '../shared/uploads/upload.service';
import {BlobUpload} from '../shared/uploads/blob-upload';

declare const navigator: any;
declare const MediaRecorder: any;
@Component({
  selector: 'app-record-audio',
  templateUrl: './record-audio.component.html',
  styleUrls: ['./record-audio.component.css']
})
export class RecordAudioComponent implements OnInit {
  @Input() filedata: any;

  public isRecording = false;
  public isTimer = false;
  private chunks: any = [];
  private mediaRecorder: any;
  count : number=4;
  timer: any;
  constructor(private upSvc: UploadService) {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { 'type': 'audio/mp3; codecs=opus' });
        this.chunks.length = 0;
        // audio.src = window.URL.createObjectURL(blob);
        // audio.load();
        // audio.play();
        // let ul = document.getElementById('audio');
        // let blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
        // let url = URL.createObjectURL(blob);
        // let li = document.createElement('li');
        // let mt = document.createElement('audio');
        // let hf = document.createElement('a');
        // ;
        // mt.controls = true;
        // mt.src = url;
        // hf.href = url;
        // hf.download = `file.ogg`;
        // hf.innerHTML = `download ${hf.download}`;
        // li.appendChild(mt);
        // li.appendChild(hf);
        // ul.appendChild(li);
        console.log(`file data ${this.filedata}`);
        const blobUpload = new BlobUpload(blob, this.filedata);
        this.upSvc.pushBlobUpload(blobUpload);
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    navigator.getUserMedia({audio: true}, onSuccess, e => console.log(e));
  }

  ngOnInit() {
  }
  
    
    public toggleRecording() {
        if (this.isRecording) {
            this.isRecording = false;
            this.mediaRecorder.stop();
        } else {
         this.timer= setInterval(() => { this.checktime(); }, 1500 );
        }
    }
checktime() {
        if (this.count === 1) {
            clearInterval(this.timer);
            this.endCountdown();
        } else {
          this.isTimer=true;
            this.count--;
            console.log(this.count);
        }
    }
   endCountdown(){
            this.isTimer=false;
            this.isRecording = true;
            this.mediaRecorder.start();
    }
  // public toggleRecording() {
  //   if (this.isRecording) {
  //     this.isRecording = false;
  //     this.mediaRecorder.stop();
  //   } else {
  //     this.isRecording = true;
  //     this.mediaRecorder.start();
  //   }
  // }
}

