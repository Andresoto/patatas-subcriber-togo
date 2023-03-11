import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscribersService } from '../../services/subscribers.service';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss']
})
export class SubscriberFormComponent implements OnInit {

  form!: FormGroup;

  @Output() close = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) { 
    console.log('constuctor');
    this.buildForm();
  }

  ngOnInit() {

  }

  closeSubsForm() {
    this.close.emit(false);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      subscribers: this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['' , [Validators.required]],
        countryCode: ['', [Validators.required]],
        phoneNumber: [''],
        jobTitle: [''],
        area: [''],
      })
    })
  }

}
