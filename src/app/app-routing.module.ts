import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

import { AuthGuard } from './_helpers/auth.guard';
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const hotelsModule = () => import('./hotels/hotels.module').then(x => x.HotelsModule);
const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'hotels', loadChildren: hotelsModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'payment', component: PaymentDetailsComponent,canActivate: [AuthGuard] },
   

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
  
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }