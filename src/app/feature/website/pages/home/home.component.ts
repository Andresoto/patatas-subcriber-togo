import { Component, OnInit } from '@angular/core';
import { Subscribers } from '../../shared/models/subscribers.model';
import { SubscribersService } from '../../shared/services/subscribers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscribers: Subscribers[] = [];

  subsForm: boolean = false

  constructor(
    private subscribersService: SubscribersService
  ) { }

  ngOnInit(): void {
    this.subscribersService.getSubcribers()
    .subscribe((data: any) => {
      console.log(data);
      this.subscribers = data.Data;
    });
  }

  showForm() {
    this.subsForm = !this.subsForm;
  }

  closeSubsForm(event: any) {
    console.log(event);
    this.subsForm = event;
  }


}
