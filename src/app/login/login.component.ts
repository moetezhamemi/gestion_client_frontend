import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  user = new User();
  erreur = 0;
  err: number = 0;
  message: string = "login ou mot de passe erronés..";

  constructor(private authService: AuthService,
    private router: Router) { }
  onLoggedin() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err) => {

        this.erreur = 1;
        if (err.error.errorCause == 'disabled')
          this.message = "Utilisateur désactivé, Veuillez contacter votre Administrateur";
      }
    });
  }
}
