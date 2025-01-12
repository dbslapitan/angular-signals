import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {User} from "../models/user.model";

@Component({
    selector: 'login',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = this.fb.group({
    email: [""],
    password: [""]
  });

  constructor(private fb: FormBuilder,
              private messagesService: MessagesService,
              private authServices: AuthService,
              private router: Router) {

  }

  async onLogin() {
    try {
      const {email, password} = this.form.value;
      if(!email || !password){
        this.messagesService.showMessage({
          text: "Enter an email or password.",
          severity: "error"
        });
        return;
      }
      await this.authServices.login(email, password);
      await this.router.navigate(['/']);
    }
    catch (error) {
      console.error(error);
      this.messagesService.showMessage({
        text: "Login failed, please try again",
        severity: "error"
      });
    }
  }
}
