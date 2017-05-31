import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AllcoursesService{
	constructor(private _http:Http) { }
	getCourses(){
		return this._http.get('https://chimple-d0994.firebaseio.com/courses.json').map(res => res.json());
	}
}



