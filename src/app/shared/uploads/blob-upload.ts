export class BlobUpload {
  $key: string;
  file: Blob;
  fileData: any;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: Blob, filedata: any) {
    this.file = file;
    this.fileData = filedata;
    this.name = this.fileData.objectname;
  }
}
