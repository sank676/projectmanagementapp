import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Tasks } from 'src/app/model/tasks';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-usertasks',
  templateUrl: './usertasks.component.html',
  styleUrls: ['./usertasks.component.css']
})
export class UsertasksComponent implements OnInit{

  projectId: string = '';
  tasks: Tasks[] = [];
  searchTerm: string = '';
  filteredTasks: Tasks[] = [];
  newComment: string;
  selectedStatus: string = '';


  constructor(private routes : ActivatedRoute,private route : Router,private taskService: TaskService){
    this.filteredTasks = [
      {
        taskId: '1',
        userId: '1',
        taskName: 'Task 1',
        taskDescription: 'This is the description of Task 1',
        status: 'TO-DO',
        projectId: '1',
        comment:'cdcrdexeddddr'
      },
      {
        taskId: '2',
        userId: '2',
        taskName: 'Task 2',
        taskDescription: 'This is the description of Task 2',
        status: 'Pending',
        projectId: '2',
        comment:''
      },
      {
        taskId: '3',
        userId: '3',
        taskName: 'Task 3',
        taskDescription: 'This is the description of Task 3',
        status: 'Pending',
        projectId: '3',
        comment:''
      }
    ];
    this.newComment = '';
  }

  openModal(task: any) {
    this.newComment = task.comment; 
   
  }

  saveComment() {
   
    const selectedTask = this.filteredTasks.find(task => task.comment === this.newComment);
    if (selectedTask) {
      selectedTask.comment = this.newComment;
    }
   
  }

  ngOnInit(): void {
    this.routes.params.subscribe(params => {
      console.log("usertask");
      this.projectId = params["projectId"];
      this.loadTasks();
    });
  }
  

filterTasks(): void {
  this.filteredTasks = this.tasks.filter(task =>
    task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    task.taskId.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

   logout(){
    localStorage.removeItem("token");
    this.route.navigate(['/login']);
   }

   loadTasks(): void {
    
    this.taskService.getTasksByProjectId(this.projectId).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  updateStatus(){}

  addComment(task:Tasks){
   
      const comment = prompt('Enter a comment:');
      if (comment) {
       
        task.comment= comment;
      }
    }
  }


