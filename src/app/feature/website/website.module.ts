import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubscriberFormComponent } from './shared/components/subscriber-form/subscriber-form.component';
import { CreateSubscriberComponent } from './pages/create-subscriber/create-subscriber.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    SubscriberFormComponent,
    CreateSubscriberComponent,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WebsiteModule { }
