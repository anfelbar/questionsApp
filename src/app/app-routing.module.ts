import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  /*{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},*/
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule",
  },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "contact",
    loadChildren: "./contact/contact.module#ContactPageModule",
  },
  {
    path: "game-view",
    loadChildren: "./game-view/game-view.module#GameViewPageModule",
  },
  {
    path: "statistics",
    loadChildren: () =>
      import("./statistics/statistics.module").then(
        (m) => m.StatisticsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
