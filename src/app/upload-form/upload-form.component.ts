import {Component, OnInit, Input} from '@angular/core';
import {Upload} from '../shared/uploads/upload';
import {UploadService} from '../shared/uploads/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  @Input() filedata: any;
  selectedFiles: FileList;
  currentUpload: Upload;
  uploading= false;;
  constructor(private upSvc: UploadService) {
  }

  ngOnInit() {
  }


  detectFiles(event, filedata) {
    console.log(filedata);
    this.uploading=true;
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file, filedata);
    var promise=this.upSvc.pushUpload(this.currentUpload);
    if(promise){
      this.uploading=false;
    }
  }
}
