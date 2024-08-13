import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ToolbarModule} from "primeng/toolbar";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CommonModule} from "@angular/common";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {finalize} from "rxjs";
import {LandService} from "../../../../../core/sevices/http/land.service";
import {Land} from "../../../../../core/models/http/land.model";

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonDirective,
    Ripple,
  ],
  standalone: true
})
export class LandFormComponent implements OnInit {

  @Input() land: Land = {};
  @Input() projectId!: number;
  landForm!: FormGroup;
  saving = false;

  constructor(
    private landService: LandService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
  ) {
  }

  // FORM CONTROLS
  get title() {
    return this.landForm.get('title')!;
  }

  ngOnInit() {
    this.land = deepCopy(this.land);
    this.initializeFormBuilder();
  }

  initializeFormBuilder() {
    this.landForm = this.fb.group({
      title: [this.land.title, [Validators.required]],
      description: [this.land.description, []]
    });

  }

  save() {
    if (this.saving) return;
    this.saving = true;
    const data = {
      ...this.landForm.value,
      status: 'active',
      user_id: loggedUser.id,
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
