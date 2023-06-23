import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('@ngrx-example/features/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@ngrx-example/features/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import(
        '@ngrx-example/features/statistics/statistics.module'
      ).then((m) => m.StatisticsModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@ngrx-example/features/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: 'players',
    loadChildren: () =>
      import('@ngrx-example/features/players/players.module').then(
        (m) => m.PlayersModule
      ),
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}