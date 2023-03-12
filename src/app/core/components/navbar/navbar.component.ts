import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showLogOut: boolean = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tokenService.existToken$
    .subscribe(exist => {
      this.showLogOut = exist;
    })
  }

  logOut() {
    this.tokenService.removeToken();
    this.router.navigate(['/'])
  }

}
