import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import { IonicPageModule } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { GameViewPage } from './game-view.page';

const routes: Routes = [
  {
    path: '',
    component: GameViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GameViewPage]
})
export class GameViewPageModule {}
