import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.development";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;

  async loadCourses(){
    let courses: Course[] = [];
    await fetch(`${this.env.apiRoot}/courses`).then(response => response.json()).then(res => courses = res);
    return courses;
  }
}
