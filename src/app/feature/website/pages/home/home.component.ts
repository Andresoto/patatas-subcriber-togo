import { Component, OnInit } from '@angular/core';
import {
  DataSubscriber,
  Subscribers,
} from '../../shared/models/subscribers.model';
import { SubscribersService } from '../../shared/services/subscribers.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  subscribers: Subscribers[] = [];
  count: number = 0;
  quantity: number = 10;
  page: number = 0;

  idUpdate!: number;

  subsForm: boolean = false;

  constructor(
    private subscribersService: SubscribersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = {
      page: 1,
      count: this.quantity,
    };
    this.subscribersService
      .getAllSubscribers(params)
      .subscribe((data: DataSubscriber) => {
        this.subscribers = data.Data;
        this.count = data.Count;
        this.page = Math.ceil(this.count / this.quantity);
      });
  }

  showForm(id: number) {
    this.idUpdate = id;
    this.subsForm = !this.subsForm;
  }

  closeSubsForm(event: any) {
    this.subsForm = event;
  }

  deleteSub(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscribersService.deleteSubscriber(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  pagination(page: number): void {
    const params = {
      page: page,
      count: this.quantity,
    };
    this.subscribersService.getAllSubscribers(params).subscribe((data: DataSubscriber) => {
      this.subscribers = data.Data;
    });
  }
}
