import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Upload} from './upload';
import {BlobUpload} from './blob-upload';
import {AlphabetService} from '../model/alphabet.service';
import {PhoneticService} from '../model/phonetic.service';
import {WordService} from '../model/word.service';
import {LessonService} from '../model/lesson.service';
import {CourseService} from "../model/course.service";


@Injectable()
export class UploadService {
  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;

  constructor(private db: AngularFireDatabase, private alphabetService: AlphabetService,
              private phoneticService: PhoneticService, private wordService: WordService,
              private lessonService: LessonService, private courseService: CourseService) {
  }

  getUploads(query = {}) {
    this.uploads = this.db.list(
      this.basePath, {
        query: query
      }
    );
    return this.uploads;
  }


  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.progress = 100;
        return this.saveFileData(upload);
      }
    );
  }

  pushBlobUpload(upload: BlobUpload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        this.saveBlobFileData(upload);
      }
    );
  }

  updateReferenceForUpload(filedata, fileUrl) {
    console.log(`request received ${filedata.componentname}`);
    console.log(`request received ${filedata.courseId}`);
    console.log(`request received ${filedata.objectname}`);
    console.log(`request received ${filedata.uploadFor}`);

    if (filedata.componentname === 'alphabet' && filedata.uploadFor === 'sound') {
      this.alphabetService.updateSoundLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'alphabet' && filedata.uploadFor === 'pronunciation') {
      this.alphabetService.updatePronunciationLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'phonetic' && filedata.uploadFor === 'pronunciation') {
      this.phoneticService.updatePronunciationLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'word' && filedata.uploadFor === 'pronunciation') {
      this.wordService.updatePronunciationLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'word' && filedata.uploadFor === 'image') {
      this.wordService.updateImageLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'lesson' && filedata.uploadFor === 'image') {
      this.lessonService.updateImageLink(filedata.courseId, filedata.objectname, fileUrl);
    } else if (filedata.componentname === 'course' && filedata.uploadFor === 'image') {
      this.courseService.updateImageLink(filedata.courseId, fileUrl);
    }
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload)
      .then(
        success => {
          this.updateReferenceForUpload(upload.fileData, upload.url);
        },
        fail => {
        }
      );
  }

  private saveBlobFileData(upload: BlobUpload) {
    this.db.list(`${this.basePath}/`).push(upload)
      .then(
        success => {
          //alert('success');
          // update related links
          this.updateReferenceForUpload(upload.fileData, upload.url);
          return true;
        },
        fail => {
         // alert('failure');
         return false;
        }
      );
    ;
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
