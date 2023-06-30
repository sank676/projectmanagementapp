import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Tasks } from 'src/app/model/tasks';
import { TaskService } from 'src/app/task.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Projects } from 'src/app/model/projects';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projecttasks',
  templateUrl: './projecttasks.component.html',
  styleUrls: ['./projecttasks.component.css']
})

export class ProjecttasksComponent implements OnInit {
  taskId: string = '';
    taskName: string = '';
    userId: string = '';
    status:string ='';
    projectId:string ='';
    taskDescription:string ='';
    
  tasks: Tasks[] = [];
  selectedTask: Tasks = new Tasks();
  selectedTaskId: string='';

 
  visible: boolean = false;
  
  
  private apiUrl = 'http://localhost:8300/api/v1/task';


  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId')!;
      console.log(this.projectId);
      this.getTasksByProjectId(this.projectId);
    });
    
  }
  


  
  getTasksByProjectId(projectId: string): Observable<Tasks[]> {
    const url = `${this.apiUrl}/gettaskbyprojectid/${projectId}`;
    this.taskService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
    });console.log(this.tasks);
    return this.http.get<Tasks[]>(url);
  }



openEditTaskModal(taskId: string): void {
  this.selectedTaskId = taskId; // Store the selected Task ID
}
updateTask(){
  this.selectedTask.taskId=this.selectedTaskId;
  this.selectedTask.taskDescription=this.taskDescription;
  this.selectedTask.taskName=this.taskName;
  this.selectedTask.userId=this.userId;
  this.selectedTask.projectId=this.projectId;
  this.selectedTask.status=this.status;
  this.taskService.updateTask(this.selectedTaskId,this.selectedTask)
  .subscribe(
    response => {
      console.log("Task updated successfully", response);
      this.router.navigate(['/projecttasks/', this.projectId]).then(() => {
        window.location.reload();
      });
    },
    error =>{
      console.error("Failed to update",error);
    }
  );
}

editTask(task: Tasks) {

  this.selectedTask = task; 

}



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
      
    }
  );
}



viewComment(taskId: string){}


private handleError(error: any): Observable<any> {
  console.error('An error occurred:', error);
  
  return throwError('Something went wrong. Please try again later.');
}



}
 

