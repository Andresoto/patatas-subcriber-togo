import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectGuard } from './core/guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ RedirectGuard ],
    loadChildren: () => import('./feature/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'app',
    canActivate: [ AuthGuard ],
    loadChildren: () => import('./feature/website/website.module').then((m) => m.WebsiteModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
