import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = ''; // Add an initial value
  password: string = ''; // Add an initial value

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Redirect or handle successful registration here
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering', error);
      }
    );
  }
}
