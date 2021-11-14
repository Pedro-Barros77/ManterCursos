export class Course {
  id: number = 0;
  title: string = '';
  description: string = '';
  startingDate: Date = new Date();
  endingDate: Date = new Date();
  studentsPerClass: number | null = null;
  categoryID: number = 0;

  //Por não ser permitido sobrecarga no typescript, tornei todos os parâmetros do construtor
  //opcionais, dessa forma posso utilizar um "Construtor padrão" que aceita 0 argumentos.
  //se todos os campos obrigatórios forem != de "undefined", então é construído o objeto com os valores
  constructor(id?: number, title?: string, description?: string, startingDate?: Date,
              endingDate?: Date, studentsPerClass?: number | null, categoryID?: number) {
    if (id && title && description && startingDate && endingDate && categoryID) {
      this.id = id!;
      this.title = title!;
      this.description = description!;
      this.startingDate = startingDate!;
      this.endingDate = endingDate!;
      this.categoryID = categoryID!;
      
      if (studentsPerClass) {
        this.studentsPerClass = studentsPerClass!;
      }
      else {
        this.studentsPerClass = null;
      }
    }
  }
}
