import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginModel } from '../../shared/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful');
          // Vérifier si l'authentification a réussi
          if (this.authService.isAuthenticated()) {
            // Rediriger vers le dashboard ou la page d'accueil
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      });
    }
  }
} 