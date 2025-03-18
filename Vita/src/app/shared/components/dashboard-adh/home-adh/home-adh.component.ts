import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home-adh',
  templateUrl: './home-adh.component.html',
  styleUrls: ['./home-adh.component.css']
})
export class HomeAdhComponent {
  constructor(public authService: AuthService) {}
}
