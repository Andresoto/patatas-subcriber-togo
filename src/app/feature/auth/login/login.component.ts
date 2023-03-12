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
    userName: ['patata', [Validators.required]],
    password: ['MrPotat0', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  doLogin() {
    if (this.form.valid) {
      // this.status = 'loading';
      console.log(this.form.getRawValue());
      const { userName, password } = this.form.getRawValue();
      this.authService.login(userName, password)
      .subscribe(() =>{
        this.router.navigate(['/app/home'])
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
