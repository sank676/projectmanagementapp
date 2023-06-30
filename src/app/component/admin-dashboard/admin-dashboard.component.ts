import { Component, OnInit,ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private route : Router){}
   ngOnInit(): void {
       
   }

   canvas:any;
   ctx:any;
   @ViewChild('myChart') mychart:any;

   ngAfterViewInit(){
    this.canvas=this.mychart.nativeElement;
    this.ctx=this.canvas.getContext('2d');

    new Chart(this.ctx,{
      type:'pie',
      data:{
        datasets:[{
          label:'completed',
          data:[4,3,6],
          backgroundColor:"rgb(115 185 243 /65%)"
          
        }]
      }
    })
   }
   logout(){
    // localStorage.removeItem("token");
    this.route.navigate(['/login']);
   }
   

}