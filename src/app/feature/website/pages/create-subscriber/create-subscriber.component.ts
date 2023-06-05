import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries, DataCountries } from '../../shared/models/countries.model';
import { Subscribers } from '../../shared/models/subscribers.model';
import { SubscribersService } from '../../shared/services/subscribers.service';

@Component({
  selector: 'app-create-subscriber',
  templateUrl: './create-subscriber.component.html',
  styleUrls: ['./create-subscriber.component.scss'],
})
export class CreateSubscriberComponent implements OnInit {
  form!: FormGroup;

  filterCountry = '';

  countries: Countries[] = [];
  countriesCopy: Countries[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subscribersService: SubscribersService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.addSubscriberFields();
    this.subscribersService.getCountries().subscribe((data: DataCountries) => {
      this.countries = data.Data;
      this.countriesCopy = [...this.countries];
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      subscribers: this.formBuilder.array([]),
    });
  }

  addSubscriberFields(): void {
    this.subscribersField.push(this.createSubscriberFields());
  }

  private createSubscriberFields() {
    return this.formBuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      CountryCode: ['', [Validators.required]],
      PhoneNumber: [''],
      JobTitle: [''],
      Area: [''],
      Topics: [[]],
    });
  }

  get subscribersField() {
    return this.form.get('subscribers') as FormArray;
  }

  validField(field: string, index: number) {
    return this.form.get(`subscribers.${index}`)?.get(field)?.touched && this.form.get(`subscribers.${index}`)?.get(field)?.invalid;
  }

  hasErrorField(field: string, index: number, hasError: string = 'required') {
    return this.form.get(`subscribers.${index}`)?.get(field)?.hasError(hasError);
  }

  save(): void {
    let data: Subscribers;

    if (this.form.valid) {
      data = this.form.getRawValue();
      console.log(data);
      this.subscribersService.createSubscriber(data).subscribe(() => {
        this.router.navigate(['app/home']);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  filterCountries(): void {
    const filterValue = this.filterCountry.trim().toLocaleLowerCase();
    this.countriesCopy = this.countries.filter((field) =>
      field.Name.trim().toLocaleLowerCase().includes(filterValue)
    );
    this.countriesCopy.sort((first, second) =>
      first.Name.localeCompare(second.Name)
    );
  }

  cleanSearchFields(): void {
    this.filterCountry = '';
    this.filterCountries();
  }

  cancel(): void {
    this.router.navigate(['/app/home']);
  }

  delete(index: number) {
    //para eliminar un form de la lista de forms
    this.subscribersField.removeAt(index);
  } 
}
