import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CourselessonsService{
	constructor(private _http:Http) { }
	getCourseLessons(courseId){
		return this._http.get('https://chimple-d0994.firebaseio.com/course_lessons/'+courseId+'.json').map(res => res.json());
	}
}



