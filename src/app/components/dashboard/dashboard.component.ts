import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public fullName : string = "";

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private userStoreService: UserStoreService,
  ) { }

  ngOnInit(){
    this.apiService.getUsers()
    .subscribe(res => {
      this.users = res;
    });

    this.userStoreService.getFullNameFromStore()
    .subscribe(value =>{
      let fullNameFromToken = this.authService.getFullNameFromToken();
      console.log("Name",fullNameFromToken)
      this.fullName = value || fullNameFromToken
    })
  }

  logout(){
    this.authService.signOut();
  }

}
