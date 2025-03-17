import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)]],
      confirmPassword: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^0[1-9][0-9]{8}$/)]],
      situationFamiliale: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      // Enlever les champs qui ne sont pas nécessaires pour l'API
      const { confirmPassword, terms, ...registrationData } = this.registerForm.value;
      
      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Redirigez vers la page de connexion
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = 'Une erreur est survenue l\'inscription';
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
} 