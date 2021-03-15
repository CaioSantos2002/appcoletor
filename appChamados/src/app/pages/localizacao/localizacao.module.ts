import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LocalizacaoPage } from './localizacao.page';

import { LocalizacaoPageRoutingModule } from './localizacao-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LocalizacaoPage }]),
    LocalizacaoPageRoutingModule
  ],
  declarations: [LocalizacaoPage]
})
export class LocalizacaoPageModule {}
