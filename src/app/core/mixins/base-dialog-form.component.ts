import {Component, EventEmitter, Input, Output} from "@angular/core";
import {BaseModelInterface, ClassType} from "../models/http/base/base.model";

@Component({
  template: '',
  standalone: true
})
export class BaseDialogFormComponent<T extends BaseModelInterface> {
  model!: ClassType<T>;
  @Input('visible') visible: boolean = false;
  @Output('visibleChange') visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('item') item!: T;
  @Output('onSaved') onSaved = new EventEmitter<T>();
  submitted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    if (!this.item) {
      this.item = new this.model();
    }
  }

  save() {
    this.submitted = true;
    if (this.checkIfFormIsValid()) {
      this.onSaved.emit(this.item);
    }
  }

  hide() {
    this.visible = false;
    this.submitted = false;
    this.visibleChange.emit(this.visible);
  }

  checkIfFormIsValid() {
    return true;
  }
}
