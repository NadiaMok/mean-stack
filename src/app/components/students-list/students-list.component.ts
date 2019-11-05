import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'studentName', 'studentEmail', 'section', 'action'];

  constructor(private studentApi: ApiService) {
    this.studentApi.GetStudents().subscribe(data => {
      console.log(data);
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() { }

  deleteStudent(index: number, e) {
    if (window.confirm('Are you sure? You are making the developers sad :(')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe();
    }
  }
}
