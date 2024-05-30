import { Component, HostListener, OnInit } from '@angular/core';
import { AccountService } from './service/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './models/user';
import { MessageService } from 'primeng/api';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  myAccount!: FormGroup;
  user!: User;
  name!: User;
  jobTitle!: User;
  isSubmit:boolean = true
  initialFormValue: any;
  
  constructor(private accountSrv: AccountService, private fb: FormBuilder, private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const inputElement = document.querySelector("#phone")
    if(inputElement){
      intlTelInput(inputElement,{
        initialCountry:'az',
        separateDialCode:true,
        utilsScript:"http://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
      })
    }
    this.accountSrv.getUser().subscribe((user: any) => {
      this.user = user;
      this.name = user.name;
      this.jobTitle = user.jobTitle;
      
      this.myAccount.patchValue({
        name: this.user.name,
        email: this.user.email,
        mobile: this.user.mobile,
        address: this.user.address
      });
      this.initialFormValue = this.myAccount.value;
      this.checkFormChanges();
    });

    this.myAccount = this.fb.group({
      name: ['', [Validators.required,Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: ['', Validators.required] 
    });
    this.myAccount.valueChanges.subscribe(() => {
      this.checkFormChanges();
    });
  
  }
  checkFormChanges(): void {
    const currentFormValue = this.myAccount.value;
    const isFormChanged = JSON.stringify(currentFormValue) !== JSON.stringify(this.initialFormValue);
    this.isSubmit = !isFormChanged;
  }
  
  onSubmit(): void {
    
    if (this.myAccount.valid) {
      const newAccount: User = {
        id: this.user.id,
        username: this.user.username,
        password: this.user.password,
        name: this.myAccount.value.name,
        email: this.myAccount.value.email,
        mobile: this.myAccount.value.mobile,
        address: this.myAccount.value.address,
        jobTitle: this.user.jobTitle,
        role: ''
      };
      if (this.user.role === "admin") {
        newAccount.role = "admin";
      } else {
        newAccount.role = "user";
      }
      this.accountSrv.updateUser(this.user.id, newAccount).subscribe(() => {
        this.showToastMessage()
        setTimeout(() => {
          this.isSubmit = true
        }, 1000);
        
      });
    }
  }
  showToastMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your account information added successfully',
    });
  }

}