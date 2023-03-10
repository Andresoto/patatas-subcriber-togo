import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.formBuilder.nonNullable.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  doLogin() {
    if (this.form.valid) {
      // this.status = 'loading';
      const { userName, password } = this.form.getRawValue();
      console.log(userName, password);
      this.authService.login(userName, password)
      .subscribe(() =>{
        this.router.navigate(['/app/home'])
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
