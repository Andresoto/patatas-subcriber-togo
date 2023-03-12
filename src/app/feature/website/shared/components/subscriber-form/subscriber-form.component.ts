import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Countries } from '../../models/countries.model';
import { Subscribers } from '../../models/subscribers.model';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss']
})
export class SubscriberFormComponent implements OnInit {

  form!: FormGroup;



  @Input() id: number = 0;
  @Output() close = new EventEmitter();

  subsciberUpdate!: Subscribers;
  countries: Countries[] = []

  constructor(
    private subscribersService: SubscribersService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();

    console.log('Constructor',this.id);
  }

  ngOnInit() {
    console.log('init',this.id);
    this.subscribersService.getSubscriber(this.id)
    .subscribe((data: any) => {
      this.subsciberUpdate = data;
      console.log(this.subsciberUpdate);
      this.form.patchValue(this.subsciberUpdate);
    })

    this.subscribersService.getCountries()
    .subscribe((data: any) => {
      console.log(data);
      this.countries = data.Data;
    });
  }


  update() {
    if(this.form.valid) {
      let data = this.form.getRawValue();
      console.log(this.id);
      this.subscribersService.updateSubscriber(this.id, data)
      .subscribe(() => {
        this.close.emit(false);
        window.location.reload();
      });
    }
  }

  closeSubsForm() {
    this.close.emit(false);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Email: ['' , [Validators.required]],
      CountryCode: ['', [Validators.required]],
      PhoneNumber: [''],
      JobTitle: [''],
      Area: [''],
      Topics: [[]],
    })
  }

}
