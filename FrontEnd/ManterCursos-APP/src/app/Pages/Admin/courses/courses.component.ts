import { DeleteModalComponent } from './../../../Components/delete-modal/delete-modal.component';
import { CategoriesService } from './../../../Shared/categories.service';
import { CoursesService } from './../../../Shared/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/Shared/Course.model';

@Component({
  selector: 'courses-list',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(CourseService: CoursesService, CategoryService: CategoriesService)
  {
    this.CourseService = CourseService;
    this.CategoryService = CategoryService;
  }

  CourseService: CoursesService;
  CategoryService: CategoriesService;

  ngOnInit(): void {
    this.CourseService.refreshCourses();
    this.CategoryService.refreshCategories();
  }

  openCourse(event:Event, course: Course){
    event.stopPropagation();
    this.CourseService.formData = course;
    (<HTMLButtonElement>document.getElementById("btnOpenDetails")!).click();
  }

  deleteCourse(event:Event, course: Course){
    event.stopPropagation();
    this.CourseService.formData = course;
    (<HTMLButtonElement>document.getElementById("btnOpenDelete")!).click();
  }

  confirmDelete(){
    this.CourseService.deleteCourse(this.CourseService.formData.id).subscribe(
      res =>{
        console.log(res);
        this.CourseService.refreshCourses();
      },
      err =>{
        console.log(err);
      }
    );
  }

  formatDescription(description: string): string{
    if(description.length > 30){
      return description.substring(0,25) + '...' + description.substring(description.length - 6);
    }
    else{
      return description;
    }
  }



}
