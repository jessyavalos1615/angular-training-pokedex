import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { logout } from 'src/app/store/actions/login/login.actions';
import { ShowModalService } from 'src/app/services/show-modal.service';
import { loginStateTypes } from '../../store/initialState/login/login.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogIn: boolean = false;
  isAdmin: boolean = false;
  constructor(
    private router: Router,
    private showModal: ShowModalService,
    private store: Store<{ loginState: loginStateTypes }>
  ) {
    this.store.select('loginState').subscribe((state) => {
      this.isLogIn = state.isLogin;
      this.isAdmin = state.isAdmin;
    });
  }

  ngOnInit(): void {}

  add(): void {
    this.showModal.changeState(true);
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }
}
