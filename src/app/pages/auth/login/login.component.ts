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
import {AuthService} from "../../../core/sevices/http/auth/auth.service";

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
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
export class LoginComponent implements OnInit {
  redirectUrl: string = "/";

  // credentials
  username!: string;
  password!: string;
  rememberMe: boolean = false;

  constructor(
    public layoutService: DashboardLayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.redirectUrl = this.route.snapshot.paramMap.get('redirectUrl') ?? this.redirectUrl;
  }

  validatedData() {
    if (this.username && this.password) {
      return {
        username: this.username,
        password: this.password
      }
    }
    return false;
  }

  login() {
    const credentials = this.validatedData();
    if (credentials) {
      this.authService.login(credentials).subscribe(token => {
        this.authService.seAuthToken(token, this.rememberMe);
        this.authService.fetchAuthenticatedUser().subscribe(user => {
          this.authService.setAuthenticatedUser(user, this.rememberMe);
          this.onLoginSuccess();
        });
      });
    }
  }

  onLoginSuccess() {
    this.router.navigate([this.redirectUrl ?? '/']).then();
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.login();
    }
  }
}
