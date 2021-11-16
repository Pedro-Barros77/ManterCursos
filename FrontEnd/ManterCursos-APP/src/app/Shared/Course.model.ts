export class Course {
  id: number = 0;
  title: string = '';
  description: string = '';
  startingDate: Date = new Date();
  endingDate: Date = new Date();
  studentsPerClass: number | null = null;
  categoryID: number = 0;
}
