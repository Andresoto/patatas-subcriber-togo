import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries } from '../../shared/models/countries.model';
import { Subscribers } from '../../shared/models/subscribers.model';
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
    private subscribersService: SubscribersService,
    private router: Router
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
      name: ['prueba 1s', [Validators.required]],
      email: ['correo@mail.com' , [Validators.required]],
      countryCode: ['', [Validators.required]],
      phoneNumber: [''],
      jobTitle: [''],
      area: [''],
      topics: [[]],
    });
  }

  get subscribersField() {
    return this.form.get('subscribers') as FormArray;
  }

  validField(field: string) {
    return this.form.controls[field]?.touched && this.form.controls[field]?.invalid
  }

  save() {
    // console.log(this.form.value);

    let data: Subscribers;

    if (this.form.valid) {
      
      // console.log(this.form.getRawValue());
      data = this.form.getRawValue();
      console.log(data);
      this.subscribersService.createSubscriber(data)
      .subscribe(() => {
        this.router.navigate(['app/home']);
      });

    } else {
      this.form.markAllAsTouched();
    }

  }

  cancel() {
    this.router.navigate(['/app/home'])
  }

  deleteSubscriberFields() {
    // this.subscribersField.
  }
}
