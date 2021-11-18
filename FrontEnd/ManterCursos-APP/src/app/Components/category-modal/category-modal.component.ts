import { CategoriesService } from './../../Shared/categories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';
import { Category } from 'src/app/Shared/Category.model';
import { ActiveToast, Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {

  constructor(
    CategoryService: CategoriesService,
    private toastr: ToastrService
  ) {
    this.CategoryService = CategoryService;
  }

  CategoryService: CategoriesService;

  isOnList: boolean = true;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.CategoryService.refreshCategories();
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;

    this.CategoryService.formData.id = 0;

    this.CategoryService.postCategory().subscribe(
      response => {
        this.CategoryService.refreshCategories();

        this.isLoading = false;
        this.isOnList = true;
        this.toastr.success('Cadastro realizado com sucesso!', 'Manter Cursos');

        this.resetForm(form);
        console.log(response);


      },
      err => { console.log(err); }
    );
  }

  deleteCategory(event:Event, category: Category){
    event.stopPropagation();
    this.CategoryService.formData = Object.assign({}, category);
    (<HTMLButtonElement>document.getElementById("btnOpenDeleteCategory")!).click();
  }

  confirmDelete(){
    this.CategoryService.deleteCategory(this.CategoryService.formData.id).subscribe(
      res =>{
        console.log(res);
        this.CategoryService.refreshCategories();
        this.toastr.success('Categoria excluída com sucesso!', 'Manter Cursos');
      },
      err =>{
        console.log(err);
      }
    );
  }

  newCategory(){
    this.isOnList = false;
    document.getElementById("categoryModalLabel")!.innerText = "Nova Categoria";
  }

  backToList(form: NgForm){
    this.resetForm(form);
    this.CategoryService.formData = new Category();
    this.isOnList = true;
    document.getElementById("categoryModalLabel")!.innerText = "Categorias";
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.CategoryService.formData = new Category();
  }
}
