import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  _signUpPage!: FormGroup;

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    ) { }

  ngOnInit(): void {

    this._signUpPage = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      userName: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this._signUpPage.valid){

      this.authService.signUp(this._signUpPage.value)
          .subscribe({
            next:(res=>{
              alert(res.message);
              this._signUpPage.reset();
              this.router.navigate(['login']);
            })
            ,error:(err=>{
              this.toast.error({detail:"ERROR",summary:err.error.message,duration:5000});
            })
          })

    }
    else{
      this.validateAllFormFields(this._signUpPage);
    }
  }

  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

}
