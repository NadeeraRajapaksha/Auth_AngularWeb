import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _logonForm!: FormGroup;

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStoreService: UserStoreService,
  ) { }

  ngOnInit(): void {

    this._logonForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      token:['']
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this._logonForm.valid){

      

      this.authService.signIn(this._logonForm.value)
          .subscribe({
            next:(res)=>{
              this.authService.storeToken(res.token);
              let tokenPayload = this.authService.decodeToken();
              this.userStoreService.setFullNameFromStore(tokenPayload.name);
              this.userStoreService.setRoleForStore(tokenPayload.role);
              this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000});
              this.router.navigate(['dashboard'])
            },
            error:(err)=>{
              this.toast.error({detail:"ERROR",summary:"Username or Password Incorrect!",duration:5000});

            }
          })
    }
    else{
      this.validateAllFormFields(this._logonForm);
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
