import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {ProjectService} from "../../../../core/sevices/http/project.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Project} from "../../../../core/models/http/project.model";
import {InputText} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Button} from "primeng/button";
import {finalize} from "rxjs";
import {Textarea} from "primeng/textarea";

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Textarea,
    Button,
    InputText,
  ],
  standalone: true
})
export class ProjectFormComponent implements OnInit {
  project: Project = {};
  projectForm!: FormGroup;
  saving = false;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
  }

  ngOnInit() {
    this.project = this.config.data.project;
    this.project = deepCopy(this.project);
    this.initializeFormBuilder();
  }

  initializeFormBuilder() {
    this.projectForm = this.fb.group({
      title: [this.project.title, [Validators.required]],
      description: [this.project.description, []]

    });
  }

  hasError(controlName: string, errorName?: string) {
    if (errorName) return this.projectForm.controls[controlName].hasError(errorName);
    const control = this.projectForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  saveProject() {
    if (this.saving) return;
    this.saving = true;
    const data = {
      ...this.projectForm.value,
      status: 'active',
      user_id: authUser.id
    };
    (
      this.project.id
        ? this.projectService.update(this.project.id, data)
        : this.projectService.create(data)
    )
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: (result) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project saved successfully',
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
