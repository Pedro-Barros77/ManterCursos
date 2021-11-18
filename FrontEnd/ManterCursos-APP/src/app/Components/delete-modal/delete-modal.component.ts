import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriesService } from 'src/app/Shared/categories.service';
import { CoursesService } from 'src/app/Shared/courses.service';
import { Course } from 'src/app/Shared/Course.model';
import { Category } from 'src/app/Shared/Category.model';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(
    CourseService: CoursesService,
    CategoryService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.CategoryService = CategoryService;
    this.CourseService = CourseService;
  }

  @Output() confirmDelete = new EventEmitter();

  CategoryService: CategoriesService;
  CourseService: CoursesService;

  isLoading: boolean = false;

  ngOnInit(): void {

  }

  getCategory(id: number): Category {
    return this.CategoryService.CategoriesList.find(cat => cat.id == id)!;
  }

  confirm() {
    this.confirmDelete.emit('');
  }

  cancel(){
    this.CourseService.formData = new Course();
  }
}
