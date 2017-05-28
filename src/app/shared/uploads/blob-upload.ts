export class BlobUpload {
  $key: string;
  file: Blob;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: Blob) {
    this.file = file;
  }
}
