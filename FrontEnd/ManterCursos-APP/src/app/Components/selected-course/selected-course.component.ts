import { CoursesService } from './../../Shared/courses.service';
import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Shared/categories.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/Shared/Course.model';
import { Category } from 'src/app/Shared/Category.model';

@Component({
  selector: 'selected-course',
  templateUrl: './selected-course.component.html',
  styleUrls: ['./selected-course.component.css']
})
export class SelectedCourseComponent implements OnInit {

  constructor(
    CourseService: CoursesService,
    CategoryService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.CategoryService = CategoryService;
    this.CourseService = CourseService;
  }

  CategoryService: CategoriesService;
  CourseService: CoursesService;

  isOnList: boolean = true;
  isLoading: boolean = false;

  ngOnInit(): void {

  }

  backToList(){
    this.isOnList = true;
    document.getElementById("categoryModalLabel")!.innerText = "Categorias";
  }

  getCategory(id: number): Category{
    let category = this.CategoryService.CategoriesList.find(cat => cat.id == id);
    if(category){
      return category;
    }
    else{
      return new Category();
    }
  }
}
