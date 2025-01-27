import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Land} from "../../../../../core/models/http/land.model";
import {CurrencyPipe, NgStyle} from "@angular/common";
import {LandComponentService} from "../../component-services/land.component.service";

@Component({
    selector: 'app-land-item',
    templateUrl: './land-item.component.html',
    imports: [
        NgStyle,
        CurrencyPipe
    ],
    standalone: true,
})
export class LandItemComponent {

    @Input() land?: Land;
    @Output() onEdit = new EventEmitter();

    constructor(private landComponentService: LandComponentService) {
    }

    editLand() {
        if (!this.land?.project_id) return;
        this.landComponentService.showLandForm(this.land).onClose.subscribe({
            next: (value) => {
                if (value) {
                    this.onEdit.emit(value);
                }
            }
        });
    }
}
