import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {CoursesService} from "../services/courses.service";
import {Course, sortCoursesBySeqNo} from "../models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "../courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "../messages/messages.service";
import {catchError, from, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import {CoursesServiceWithFetch} from "../services/courses-fetch.service";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";
import {createCourse} from "../../../server/create-course.route";

@Component({
    selector: 'home',
    imports: [
        MatTabGroup,
        MatTab,
        CoursesCardListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  #courses = signal<Course[]>([]);

  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === "BEGINNER");
  });

  advanceCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === "ADVANCED");
  });

  constructor(private courseService: CoursesService, private matDialog: MatDialog) {
    this.loadCourses();
  }

  async loadCourses(){
    const courses = await this.courseService.loadCourses();
    this.#courses.set(courses);
  }

  courseUpdated(course: Course) {
    this.#courses.update(courses => {
      const index = courses.findIndex(c => c.id === course.id);
      const newCourses = [...courses];
      newCourses[index] = course;
      return  newCourses;
    });
  }

  async courseDeleted(id: string) {
    try{
      const courseDeleted = await this.courseService.deleteCourse(id);
      this.#courses.update(courses => courses.filter(course => course.id !== id));
    }
    catch (error){
      console.log(error);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(this.matDialog, {
      mode: "create",
      title: "Create New Course"
    });
    if(newCourse){
      this.#courses.update(courses => [newCourse, ...courses]);
    }
  }
}
