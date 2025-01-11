import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";
import {SkipLoading} from "../loading/skip-loading.component";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;

  constructor( private http: HttpClient) {}

  async loadCourses(): Promise<Course[]> {
    const courses$ = this.http.get<GetCoursesResponse>(`${this.env.apiRoot}/courses/`, /*{
      context: new HttpContext().set(SkipLoading, true)
    }*/);
    const response = await firstValueFrom(courses$);
    return  response.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.http.post<Course>(`${this.env.apiRoot}/courses/`, course);
    return firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    const savedCourse$ = this.http.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
    return firstValueFrom(savedCourse$);
  }

  async deleteCourse(courseId: string) {
    const deletedCourse$ = this.http.delete<{id: string}>(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(deletedCourse$);
  }
}
