import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from './Course.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
    router: Router) {
    this.router = router;
  }
  router: Router;


  formData: Course = new Course();
  readonly baseURL = 'https://localhost:44309/api/Course';

  CoursesList: Course[] = [];


  refreshCourses() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res => {
        this.CoursesList = res as Course[];
      });
  }

  postCourse() {
    return this.http.post(this.baseURL, this.formData);
  }

  putCourse() {
    return this.http.put(`${this.baseURL}/${this.formData.id}`, this.formData);
  }
  deleteCourse(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
