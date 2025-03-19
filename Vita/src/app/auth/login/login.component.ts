import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

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
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      console.log('Envoi des identifiants:', credentials);

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Réponse de login:', response);
          this.isLoading = false;
          
          const currentUser = this.authService.getCurrentUser();
          if (currentUser) {
            if (currentUser.role === 'ADMINISTRATEUR') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur de login:', error);
          this.errorMessage = error.message || 'Email ou mot de passe incorrect';
        }
      });
    }
  }
} 