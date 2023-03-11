import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Countries } from '../../shared/models/countries.model';
import { SubscribersService } from '../../shared/services/subscribers.service';

@Component({
  selector: 'app-create-subscriber',
  templateUrl: './create-subscriber.component.html',
  styleUrls: ['./create-subscriber.component.scss']
})
export class CreateSubscriberComponent implements OnInit {

  form!: FormGroup;

  countries: Countries[] = []

  constructor(
    private formBuilder: FormBuilder,
    private subscribersService: SubscribersService
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.addSubscriberFields();
    this.subscribersService.getCountries()
    .subscribe((data: any) => {
      console.log(data);
      this.countries = data.Data;
    });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      subscribers: this.formBuilder.array([])
    });
  }

  addSubscriberFields() {
    this.subscribersField.push(this.createSubscriberFields());
  }

  private createSubscriberFields() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['' , [Validators.required]],
      countryCode: ['', [Validators.required]],
      phoneNumber: [''],
      jobTitle: [''],
      area: [''],
    });
  }

  get subscribersField() {
    return this.form.get('subscribers') as FormArray;
  }

  validField(field: string) {
    return this.form.controls[field]?.touched && this.form.controls[field]?.invalid
  }

  save() {
    console.log(this.form.value);
  }
}
