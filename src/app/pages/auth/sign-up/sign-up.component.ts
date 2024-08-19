import {Component, HostListener, OnInit} from '@angular/core';
import {DashboardLayoutService} from "../../../core/layouts/dashboard/service/dashboard.layout.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Ripple} from "primeng/ripple";
import {User} from "../../../core/models/http/user.model";
import {UserService} from "../../../core/sevices/http/user.service";

@Component({

  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    RouterLink,
    Ripple,
    NgOptimizedImage
  ],
  standalone: true
})
export class SignUpComponent implements OnInit {
  redirectUrl: string = "/login";

  user: User & { passwordConfirmation: string } = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(
    public layoutService: DashboardLayoutService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.paramMap.get('redirectUrl') ?? this.redirectUrl;
  }

  validatedData() {
    if (
      this.user.username
      && this.user.password
      && this.user.passwordConfirmation === this.user.password
    ) {
      return this.user
    }
    return false;
  }

  signUp() {
    const data = this.validatedData();
    if (data) {
      this.userService.create({...data, type: 'vendor'}).subscribe(() => {
        this.onRegistrationSuccess();
      });
    }
  }

  onRegistrationSuccess() {
    this.router.navigate([this.redirectUrl]).then();
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.signUp();
    }
  }
}
