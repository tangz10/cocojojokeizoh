import { Component } from '@angular/core';
import {JsonFormsAngularService, JsonFormsControl} from '@jsonforms/angular';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTimepicker, MatTimepickerInput, MatTimepickerToggle} from "@angular/material/timepicker";
import {Actions, extractData, getData, isControl} from "@jsonforms/core";
import {SchemaServiceService} from "../../services/schema-service.service";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-date-time-renderer',
  imports: [
    MatDatepickerToggle,
    MatHint,
    MatLabel,
    MatDatepicker,
    MatSuffix,
    MatDatepickerInput,
    MatFormField,
    MatInput,
    MatTimepickerToggle,
    MatTimepickerInput,
    MatTimepicker,
    FormsModule,
  ],


  template: `
    <div class="form-date-time-renderer">
      <p>{{ label }}</p>
      <mat-form-field>
        <mat-label>Pick a date</mat-label>
        <input
          matInput
          [matDatepicker]="picker"
          (dateChange)="onDateChange($event)"
          [(ngModel)]="pickerDate"
        />
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-hint>{{ description }}</mat-hint>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Pick a time</mat-label>
        <input
          matInput
          [matTimepicker]="picker2"
          (valueChange)="onTimeChange($event)"
          [(ngModel)]="pickerTime"
        >
        <mat-timepicker-toggle matIconSuffix [for]="picker2"/>
        <mat-timepicker #picker2/>
        <mat-hint>{{ description }}</mat-hint>
      </mat-form-field>
    </div>
    <br>
  `
})

export class DateTimeRendererComponent extends JsonFormsControl {

  private selectedDate: Date | null = null;
  private selectedTime: Date | null = null;

  pickerDate: Date | null = null;
  pickerTime: Date | null = null;

  constructor(service: JsonFormsAngularService, private SchemaService: SchemaServiceService) {
    super(service);
  }

  override ngOnInit() {

    // Permet de récupérer le OnInit de la classe Parent
    super.ngOnInit();

    this.pickerDate = new Date(this.data);
    this.pickerTime = new Date(this.data);

  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    console.log(this.selectedDate);
    this.updateDateTime();
  }

  onTimeChange(event: any) {
    this.selectedTime = event
    console.log(this.selectedTime);
    this.updateDateTime(); // essaie de combiner
  }

  updateDateTime() {
    if (!this.selectedDate || !this.selectedTime) return;

    const year = this.selectedDate.getFullYear();
    const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.selectedDate.getDate()).padStart(2, '0');

    const hours = String(this.selectedTime.getHours()).padStart(2, '0');
    const minutes = String(this.selectedTime.getMinutes()).padStart(2, '0');
    const seconds = String(this.selectedTime.getSeconds()).padStart(2, '0');

    const formatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    if (this.data !== formatted) {
      this.jsonFormsService.updateCore(
        Actions.update(this.propsPath, () => formatted)
      );
      this.triggerValidation();
    }

  }
}
