import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/clases/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  user = new User();

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  get name() {
    return this.signupForm.get('name')!;
  }

  get lastName() {
    return this.signupForm.get('lastName')!;
  }

  get email() {
    return this.signupForm.get('email')!;
  }

  get password() {
    return this.signupForm.get('password')!;
  }

  signup() {
    if (this.signupForm.valid) {
      const user = {
        name: this.name?.value,
        lastName: this.lastName?.value,
        role: 'ADMIN',
        email: this.email?.value,
        password: this.password?.value,
      };
      this.authService.register(user);
    }
  }
}
