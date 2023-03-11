import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSubscriberComponent } from './pages/create-subscriber/create-subscriber.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'create',
    component: CreateSubscriberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
