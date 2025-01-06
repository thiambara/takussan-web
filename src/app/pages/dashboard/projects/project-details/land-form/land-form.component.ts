import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ToolbarModule} from "primeng/toolbar";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {finalize} from "rxjs";
import {LandService} from "../../../../../core/sevices/http/land.service";
import {Land} from "../../../../../core/models/http/land.model";
import {User} from "../../../../../core/models/http/user.model";
import {CustomerService} from "../../../../../core/sevices/http/customer.service";
import {Textarea} from "primeng/textarea";

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
    Textarea,
  ],
  standalone: true
})
export class LandFormComponent implements OnInit {
  land: Land = {};
  projectId!: number;
  customers?: User[];
  landForm!: FormGroup;
  saving = false;

  constructor(
    private landService: LandService,
    private customerService: CustomerService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
  }

  ngOnInit() {
    this.land = deepCopy(this.config.data.land || {});
    this.projectId = this.config.data.projectId;
    this.initializeFormBuilder();
  }

  initializeFormBuilder() {
    this.landForm = this.fb.group({
      title: [this.land.title, [Validators.required]],
      description: [this.land.description, []]
    });
  }

  hasError(controlName: string, errorName?: string) {
    if (errorName) return this.landForm.controls[controlName].hasError(errorName);
    const control = this.landForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  getCustomers(searchQuery: string = '') {
    this.customerService.index({search_query: searchQuery})
      .subscribe({
        next: result => {
          this.customers = result as User[];
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'An error has occurred',
            life: 3000
          })
        }
      });

  }

  save() {
    console.log(this.projectId)
    if (this.saving) return;
    this.saving = true;
    const data = {
      ...this.landForm.value,
      status: 'active',
      price: 100,
      area: 100,
      project_id: this.projectId
    };
    (
      this.land.id
        ? this.landService.update(this.land.id, data)
        : this.landService.create(data)
    )
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: (result) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Land saved successfully',
            life: 3000
          })

          this.close(result)
        },
        error: error => this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'An error has occurred',
          life: 3000
        })
      });
  }

  close(result?: any) {
    this.ref.close(result)
  }
}
