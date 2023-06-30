import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { Projects } from 'src/app/model/projects';

import { Tasks } from 'src/app/model/tasks';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-listtasks',
  templateUrl: './listtasks.component.html',
  styleUrls: ['./listtasks.component.css']
})
export class ListtasksComponent implements OnInit {
  tasks: Tasks[] =[];
  project:Projects[]=[];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.getTasks();

  }

  getTasksByProjectId(){}
  getTasks() {
    throw new Error('Method not implemented.');
  }
  // getTasks(): Observable<Tasks[]> {
  //   return this.taskService.getTasks().pipe(
  //     map((data: Tasks[]) => {
  //       this.tasks = data;
  //       return data;
  //     }),
  //     catchError((error: any) => {
  //       console.log(error);
  //       // Handle the error
  //       return throwError(error);
  //     })
  //   );
  // }
  

  deleteTask(task: Tasks): void {
    this.taskService.deleteTask(task.taskId).subscribe(
      () => {
        const index = this.tasks.findIndex(t => t.taskId === task.taskId);
        if (index !== -1) {
          this.tasks.splice(index, 1);
        }
        console.log(`Deleted task with ID: ${task.taskId}`);
      },
      (error) => {
        console.log(error);
        // Handle the error
      }
    );
  }

  updateTask(task: Tasks): void {
    // Implement your update logic here
    // For example, navigate to the update page with the task ID
    this.router.navigate(['/update-task', task.taskId]);
  }
}