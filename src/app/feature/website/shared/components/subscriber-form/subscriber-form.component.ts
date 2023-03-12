import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries, DataCountries } from '../../models/countries.model';
import { Subscribers } from '../../models/subscribers.model';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss'],
})
export class SubscriberFormComponent implements OnInit {
  form!: FormGroup;

  @Input() id: number = 0;
  @Output() close = new EventEmitter();

  filterCountry = '';
  subsciberUpdate!: Subscribers;
  countries: Countries[] = [];
  countriesCopy: Countries[] = [];

  constructor(
    private subscribersService: SubscribersService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.subscribersService.getSubscriber(this.id)
      .subscribe((data: Subscribers) => {
        this.subsciberUpdate = data;
        this.form.patchValue(this.subsciberUpdate);
      });

    this.subscribersService.getCountries().subscribe((data: DataCountries) => {
      this.countries = data.Data;
      this.countriesCopy = [...this.countries];
    });
  }

  update() {
    if (this.form.valid) {
      let data = this.form.getRawValue();
      console.log(this.id);
      this.subscribersService.updateSubscriber(this.id, data).subscribe(() => {
        this.close.emit(false);
        window.location.reload();
      });
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

  closeSubsForm() {
    this.close.emit(false);
  }

  validField(field: string) {
    return this.form.get(`${field}`)?.touched && this.form.get(`${field}`)?.invalid;
  }

  hasErrorField(field: string, hasError: string = 'required') {
    return this.form.get(`${field}`)?.hasError(hasError);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      CountryCode: ['', [Validators.required]],
      PhoneNumber: [''],
      JobTitle: [''],
      Area: [''],
      Topics: [[]],
    });
  }
}
