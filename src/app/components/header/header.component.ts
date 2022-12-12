import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ShowModalService } from 'src/app/services/show-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private showModal: ShowModalService
  ) {}

  ngOnInit(): void {
    // console.log('ngOnInit');
  }

  /* ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  } */

  add(): void {
    this.showModal.changeState(true);
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.authService.checkAdmin();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }
}
