import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminserviceService } from 'src/app/adminservice.service';
import { Projects } from 'src/app/model/projects';

@Component({
  selector: 'app-addprojects',
  templateUrl: './addprojects.component.html',
  styleUrls: ['./addprojects.component.css']
})
export class AddprojectsComponent implements OnInit {
  addprojectGroup: FormGroup;
  project: Projects = new Projects();

  constructor(private adminService: AdminserviceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) {
    this.addprojectGroup = new FormGroup({
      projectId: new FormControl(''),
      projectName: new FormControl(''),
      projectDescription: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.addprojectGroup = this.formBuilder.group({
      projectId: [''],
      projectName: [''],
      projectDescription: ['']
    });
  }

  //   submitForm() {

  //     this.project = this.addprojectGroup.value;

  //     this.http.post('http://localhost:3000/projects', this.project)
  //       .subscribe((response: any) => {

  //         alert("Project added successfully");
  //         this.addprojectGroup.reset();
  //       }, (error: any) => {
  //         console.error('Error adding data:', error);
  //       });
  //   }
  // }

  onSubmit(): void {
    if (this.addprojectGroup.valid) {
      const project: Projects = {
        projectId: this.addprojectGroup.get('projectId')?.value,
        projectName: this.addprojectGroup.get('projectName')?.value,
        projectDescription: this.addprojectGroup.get('projectDescription')?.value
      };

      this.adminService.saveProject(project).subscribe(
        (data) => {
          console.log(data);

          this.router.navigate(['/viewproject']);
        },
        (error) => {
          console.log(error);
          if (error.status === 404) {
            console.log("Error 404: Not Found");
          } else {
            console.log("An error occurred. Please try again later.");
          }
        }
      );


    }
  }
}
