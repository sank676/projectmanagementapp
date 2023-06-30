import { Component, OnInit } from '@angular/core';
import { Projects } from 'src/app/model/projects';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent implements OnInit {
  projects: Projects[] = [];
  updateProjectGroup: FormGroup;
 
  
  constructor(private adminService: AdminserviceService,
              private router: Router,
              private route: ActivatedRoute,private formBuilder: FormBuilder,private location: Location) {this.updateProjectGroup = this.formBuilder.group({
                projectId: ['', Validators.required],
                projectName: ['', Validators.required],
                projectDescription: ''
              }); }

  ngOnInit(): void {
    this.adminService.getProjects().subscribe(
      (data: Projects[]) => {
        this.projects = data;
      },
      (error) => {
        console.log(error);
        // Handle the error
      }
    );
  }

  deleteProject(project: Projects): void {
    this.adminService.deleteProject(project.projectId).subscribe(
      () => {
        const index = this.projects.findIndex(p => p.projectId === project.projectId);
        if (index !== -1) {
          this.projects.splice(index, 1);
        }
        console.log(`Deleted project with ID: ${project.projectId}`);
      },
      (error) => {
        console.log(error);
        
      }
    );
  }

  updateProject(project: Projects): void {
    // Implement your update logic here
    // For example, navigate to the update page with the project ID
    this.router.navigate(['/addprojects', project.projectId]);
  }
  viewTasks(projectId: string): void {
    this.router.navigate(['/projecttasks', projectId]);
  }

  openUpdateProjectModal(project: any) {
    this.updateProjectGroup.patchValue({
      projectId: project.projectId,
      projectName: project.projectName,
      projectDescription: project.projectDescription
    });
  }

  // Method to handle the submission of the update project form
  submitUpdateForm() {
    if (this.updateProjectGroup.valid) {
      // Retrieve the updated project values from the form
      const updatedProject = this.updateProjectGroup.value;
      
      // Perform the update logic with the updated project data
      // ...
      
      // Close the modal after the update is complete
      this.location.back();
    }
  
}

}