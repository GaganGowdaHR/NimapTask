import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , FormControl , Validators } from '@angular/forms';
import { HomeModel } from './home.component.model';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { MatSliderChange } from '@angular/material';
import {coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  value : any;
  firstname : any;
  registerForm: FormGroup;
  formValue !: FormGroup;
  submitted = false;
  homeModelObj : HomeModel = new HomeModel();

  constructor(private formBuilder: FormBuilder, private api : ApiService,private router : Router) { }

  ngOnInit() {
    // const myForm = new FormGroup({
  }

  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formValue.patchValue({
        fileSource: file
      });
    }
  }

  set tickInterval(homeModelObj) {
    this._tickInterval = coerceNumberProperty(homeModelObj.value);
  }
  private _tickInterval = 1;

  onSliderChange(event: MatSliderChange) {
    console.log(event.value);
  }


  postDetails(){

    if(this.homeModelObj.firstname !=null &&
    this.homeModelObj.lastname !=null &&
    this.homeModelObj.email !=null &&
    this.homeModelObj.number !=null &&
    this.homeModelObj.state !=null &&
    this.homeModelObj.country !=null &&
    this.homeModelObj.value !=null &&
    this.homeModelObj.address2 !=null &&
    this.homeModelObj.address1 !=null ){
    this.api.postOrder(this.homeModelObj).subscribe(res=>{
      console.log(res);
      alert("Registered Successfully")
      this.router.navigate(['/profile'])
    },
    err=>{
      alert("Something went wrong")
    })
  }
  else{
    alert("please fill all the details")
  }
  }

}
