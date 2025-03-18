import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private titleService: Title
  ) {
    this.titleService.setTitle('VitaAssure');
  }
}
