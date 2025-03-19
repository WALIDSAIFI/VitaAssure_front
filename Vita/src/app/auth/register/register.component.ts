import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterData } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  situationsFamiliales = [
    { value: 'CELIBATAIRE', label: 'Célibataire' },
    { value: 'MARIE', label: 'Marié(e)' },
    { value: 'DIVORCE', label: 'Divorcé(e)' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      dateNaissance: ['', [Validators.required, this.dateValidator]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      telephone: ['', [Validators.required, Validators.pattern(/^0[1-9][0-9]{8}$/)]],
      situationFamiliale: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  dateValidator(control: any) {
    const date = new Date(control.value);
    const today = new Date();
    if (date > today) {
      return { futureDate: true };
    }
    return null;
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { confirmPassword, terms, ...registrationData } = this.registerForm.value;

      // Vérification des données avant envoi
      if (new Date(registrationData.dateNaissance) > new Date()) {
        this.errorMessage = 'La date de naissance ne peut pas être dans le futur';
        this.isLoading = false;
        return;
      }

      console.log('Données d\'inscription:', registrationData);

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Inscription réussie:', response);
          this.isLoading = false;
          this.router.navigate(['/login'], { 
            queryParams: { registered: 'success' }
          });
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Erreur d\'inscription:', error);
          this.errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription';
        }
      });
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
          console.log(`Champ invalide: ${key}`, control.errors);
        }
      });
    }
  }
} 