import {Component, OnInit} from '@angular/core';
import {Upload} from '../shared/uploads/upload';
import {UploadService} from '../shared/uploads/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private upSvc: UploadService) {
  }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
  }
}