import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Shared/categories.service';

@Component({
  selector: 'delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.css']
})
export class DeleteCategoryModalComponent implements OnInit {

  constructor(
    CategoryService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.CategoryService = CategoryService;
  }

  @Output() confirmDelete = new EventEmitter();

  CategoryService: CategoriesService;

  isLoading: boolean = false;

  ngOnInit(): void {

  }

  confirm() {
    this.confirmDelete.emit('');
  }
}
