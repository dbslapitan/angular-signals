import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;

  constructor( private http: HttpClient) {}

  async loadCourses(): Promise<Course[]> {
    this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses/`).subscribe(data => console.log("data", data));
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses/`);
    const response = await firstValueFrom(courses$);
    return  response.courses;
  }

}
