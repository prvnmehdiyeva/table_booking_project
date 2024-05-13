import { Component, HostListener, OnInit } from '@angular/core';
import { AccountService } from './service/account.service';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from './models/user';

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

  constructor(private accountSrv: AccountService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountSrv.getUser().subscribe((user: any) => {
      this.user = user;
      this.name = user.name;
      this.jobTitle = user.jobTitle;
      
      this.myAccount.patchValue({
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        mobile: this.user.mobile,
        address: this.user.address
      });
    });

    this.myAccount = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone:  ['', [Validators.required, this.phoneValidator]] ,
      mobile: ['', [Validators.required, this.phoneValidator]] ,
      address: ['', Validators.required]
    });
  }
  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);
      return valid ? null : { invalidPhone: true };
    };
  }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.phoneValidator()(control);
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    let trimmed = input.value.replace(/\s+/g, '');

    if (trimmed.length > 13) {
      trimmed = trimmed.substr(0, 13);
    }

    trimmed = trimmed.replace(/-/g, '');

    let numbers = [];

    numbers.push(trimmed.substr(0, 3));
    if (trimmed.substr(3, 2) !== "")
      numbers.push(trimmed.substr(3, 3));
    if (trimmed.substr(6, 3) !== "")
      numbers.push(trimmed.substr(6, 2));
    if (trimmed.substr(8, 4) !== "")
      numbers.push(trimmed.substr(8, 2));
    if (trimmed.substr(10, 8) !== "")
      numbers.push(trimmed.substr(10, 2));
    input.value = numbers.join('-');
  }



  onSubmit(): void {
    if (this.myAccount.valid) {
      const newAccount: User = {
        id: this.user.id,
        username: this.user.username,
        password: this.user.password,
        name: this.myAccount.value.name,
        email: this.myAccount.value.email,
        phone: this.myAccount.value.phone,
        mobile: this.myAccount.value.mobile,
        address: this.myAccount.value.address,
        jobTitle: this.user.jobTitle,
      };
      
      this.accountSrv.updateUser(this.user.id, newAccount).subscribe(() => {
        
      });
    }
  }
  

}
