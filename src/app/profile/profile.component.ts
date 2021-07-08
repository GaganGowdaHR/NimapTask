import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeModel } from '../home/home.component.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  record :HomeModel;
  homeModelObj : HomeModel = new HomeModel();
  value: any;
  constructor( private api : ApiService,private router : Router) { }

  ngOnInit() {
this.getAllOrder();
  }

  getAllOrder(){
    this.api.getOrder(this.homeModelObj)
    .subscribe((res : HomeModel)=>{
      this.record = res;
      this.homeModelObj.firstname = this.record[0].firstname +" "+ this.record[0].lastname;
      this.homeModelObj.email = this.record[0].email;
      this.homeModelObj.state = this.record[0].state;
      this.homeModelObj.country = this.record[0].country;
      this.homeModelObj.number = this.record[0].number;
      this.homeModelObj.value = this.record[0].value;
      this.homeModelObj.address1 = this.record[0].address1;
      this.homeModelObj.address2 = this.record[0].address2;
    })
  }

  onEdit(row : any){
    this.homeModelObj.firstname['firstname'].setValue(this.record.firstname);
    this.homeModelObj.lastname['lastname'].setValue(this.record.lastname);
    this.homeModelObj.email['email'].setValue(this.record.email);
    this.homeModelObj.number['number'].setValue(this.record.number);
    this.homeModelObj.value['value'].setValue(this.record.value);
    this.homeModelObj.state['state'].setValue(this.record.state);
    this.homeModelObj.country['country'].setValue(this.record.country);
    this.homeModelObj.address1['address1'].setValue(this.record.address1);
    this.homeModelObj.address2['address2'].setValue(this.record.address2);
  }

  updateDetails(){

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
      alert("Updated Successfully")
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

  url="../../../images/sliders1-1.jpg"

  onselectFile(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e .target.files[0]);
      reader.onload = (event:any)=>{
        this.url=event.target.result;
      }
    }
  }

  agree(){
    this.router.navigate(['/home'])
  }

}
