import { CategoriesService } from './../../../Shared/categories.service';
import { CoursesService } from './../../../Shared/courses.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/Shared/Course.model';

@Component({
  selector: 'courses-NewEdit',
  templateUrl: './courses-new-edit.component.html',
  styleUrls: ['./courses-new-edit.component.css']
})
export class CoursesNewEditComponent implements OnInit {

  constructor(
    CourseService: CoursesService,
    CategoryService: CategoriesService,
    router: Router
  ) {
    this.router = router;
    this.CourseService = CourseService;
    this.CategoryService = CategoryService;
  }

  router: Router;
  public CourseService: CoursesService;
  public CategoryService: CategoriesService;

  ngOnInit(): void {
    this.CategoryService.refreshCategories();
  }

  onSubmit(form: NgForm) {
    this.CourseService.formData.id = 0;

    this.CourseService.postCourse().subscribe(
      response => {
        this.resetForm(form);
        console.log(response);

        this.router.navigate(["/courses-list"]);
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.CourseService.formData = new Course();
  }
}
