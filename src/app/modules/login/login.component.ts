import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from './services/loginservice.service';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../sessionservice/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup 
  spinner:boolean=false
  constructor(
    private loginService:LoginserviceService,
    private fb:FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sessionService:SessionService,
    private snackBar: MatSnackBar,
    private router: Router
  )
  {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    
  }

  onSubmit(){
    const email = this.loginForm.get('email')?.value
    console.log("🚀 ~ LoginComponent ~ onSubmit ~ email:", email)

    const password = this.loginForm.get('password')?.value
    console.log("🚀 ~ LoginComponent ~ onSubmit ~ password :", password )

    if(isPlatformBrowser(this.platformId)){
      this.loginService.getUsers().subscribe(data =>{
        const user = data.find((user:any)=>user.email === email && user.password === password)
        
        if(user){
          this.sessionService.setItem("loginUser",user)
          console.log("success");
          this.snackBar.open('Login Successful', 'Close', { duration: 2000 });
          
          this.spinner=true
          setTimeout(()=>{
            this.loginForm.reset()
            this.router.navigate(['main'])
          },3000)

          
        }else {
          this.snackBar.open('Invalid email or password', 'Close', { duration: 2000 });
        }
      })
    }
    
  }

}
