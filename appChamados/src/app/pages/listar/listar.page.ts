import { Component, OnInit } from '@angular/core';
import { NomeProviderService } from '../../nome-provider.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  id : any;
  chamados: any;

  constructor(public servidor:  NomeProviderService, public activate: ActivatedRoute) { }

  ngOnInit() {}

  fechar(){
    this.servidor.sendPostRequest(this.chamados);
  }

  ionViewWillEnter() {
    this.activate.queryParams.subscribe(params => {
        if (params && params.id) {
          this.id = JSON.parse(params.id);
          console.log(params);
        }
    });
    this.getRetornar();
  } 
  getRetornar(){
    this.servidor.getPegar("id="+this.id+"&type_user=2&id_user=0").subscribe(data => {

      this.chamados = data;
      console.log(data)
    });
  }
}
