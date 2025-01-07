import {Component, inject, Input, input, output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "../models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "../edit-course-dialog/edit-course-dialog.component";

@Component({
    selector: 'courses-card-list',
    imports: [
        RouterLink
    ],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
  courses = input.required<Course[]>();
  courseUpdated = output<Course>({
    alias: "onCourseUpdate"
  });
  onCourseDelete = output<string>();

  constructor(public dialog: MatDialog) {}

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(this.dialog, {
      mode: "update",
      title: "Update Existing Course",
      course
    });
    if(newCourse) {
      this.courseUpdated.emit(newCourse);
    }
  }

  onDeleteCourse(id: string) {
      this.onCourseDelete.emit(id);
  }
}
