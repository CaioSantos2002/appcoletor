import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NomeProviderService } from '../../nome-provider.service';
import { NavigationExtras } from '@angular/router';

 @Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  chamados: any;
  
  constructor(public servidor:  NomeProviderService, public navController : NavController) {
   }

  ngOnInit() {
    this,this.getRetornar();
  }

  carregar_detalhes(id){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(id)
      }
    };
    this.navController.navigateRoot("listar", navigationExtras);
     
  }
  getRetornar(){
    this.servidor.getPegar("id=0&type_user=2&id_user=0").subscribe(data => {
      console.log (data)
      this.chamados = data;
    });
  }

  
}
