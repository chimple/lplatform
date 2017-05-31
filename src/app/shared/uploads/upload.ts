export class Upload {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  fileData: any;
  createdAt: Date = new Date();

  constructor(file: File, fileData: any) {
    this.file = file;
    this.fileData = fileData;
  }
}
