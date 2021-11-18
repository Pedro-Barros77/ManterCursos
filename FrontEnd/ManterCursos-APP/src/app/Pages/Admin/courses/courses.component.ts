import { CategoriesService } from './../../../Shared/categories.service';
import { CoursesService } from './../../../Shared/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Shared/Course.model';
import { Category } from 'src/app/Shared/Category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    CourseService: CoursesService,
    CategoryService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.CourseService = CourseService;
    this.CategoryService = CategoryService;
  }

  trigger!: number;

  CourseService: CoursesService;
  CategoryService: CategoriesService;

  ngOnInit(): void {
    this.CourseService.refreshCourses();
    this.CategoryService.refreshCategories();
  }

  openCourse(event: Event, course: Course) {
    event.stopPropagation();
    this.CourseService.formData = Object.assign({}, course);
    (<HTMLButtonElement>document.getElementById("btnOpenDetails")!).click();
  }

  deleteCourse(event: Event, course: Course) {
    event.stopPropagation();

    this.CourseService.formData = Object.assign({}, course);;
    (<HTMLButtonElement>document.getElementById("btnOpenDelete")!).click();
  }

  confirmDelete() {
    this.CourseService.deleteCourse(this.CourseService.formData.id).subscribe(
      res => {
        console.log(res);
        this.CourseService.refreshCourses();
        this.toastr.success('Curso excluído com sucesso!', 'Manter Cursos');
        this.CourseService.formData = new Course();
      },
      (err:any) => {
        console.log(err);
        if(err.error.errorCode == 5){
          this.CourseService.throwError(5);
        }
      }
    );
  }

  isOver(course: Course): boolean{
    return new Date(course.endingDate).setHours(0,0,0,0) < new Date().setHours(0,0,0,0);
  }

  formatDescription(description: string): string {
    if (description.length > 30) {
      return description.substring(0, 30) + '...';
    }
    else {
      return description;
    }
  }

  getCategory(categoryID: number): Category {
    let category = this.CategoryService.CategoriesList.find(cat => cat.id == categoryID)!;
    if (category && category != null) {
      return category;
    }
    else {
      return new Category();
    }
  }
}
