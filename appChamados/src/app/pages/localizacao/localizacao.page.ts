import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx'
import { EcopontosDTO } from '../../models/ecoponto.dto';
import { HttpConfigService } from '../../services/http-config.service';
import { AlertController } from '@ionic/angular'; 



declare var google;
@Component({
  selector: 'app-localizacao',
  templateUrl: 'localizacao.page.html',
  styleUrls: ['localizacao.page.scss'],
})

export class LocalizacaoPage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  ecoPontos:EcopontosDTO[];
  LocalizacaoReferencia:any;

  constructor( private geolocation: Geolocation, 
               private httpConfigService: HttpConfigService,
               public alertCtrl: AlertController) {}

  ionViewWillEnter(){
    this.LocalizacaoReferencia = { lat: -22.703586, lng: -46.993531 };
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 18,
        center: this.LocalizacaoReferencia,
        disableDefaultUI: false
      }
    );
    this.directionsDisplay.setMap(map);
    


    this.geolocation.getCurrentPosition().then((resp) => {
        // Localização do atual Latitude Longitude
      this.LocalizacaoReferencia = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      map.setCenter(this.LocalizacaoReferencia);

      const marker = new google.maps.Marker({
        position:  this.LocalizacaoReferencia,
        map: map,

        //Titulo
        title: "Localização Atual",

        //Animção
        animation: google.maps.Animation.DROP, // BOUNCE

        //Icone
        icon: 'assets/placeholder.png'

        
      });  


    });

   
    // Obtém as informações do Ecoponto do backend
    this.httpConfigService.getLocalizacaoEcopontos("id=0")
      .subscribe((resposta: EcopontosDTO[]) => {
       

        this.ecoPontos = resposta;

         // Imprime os marcadores no mapa
        for(let i=0;i<this.ecoPontos.length;i++){
          
          const LocalizacaoBackEnd = { lat: Number(this.ecoPontos[i].lat), lng: Number(this.ecoPontos[i].longi) };
          
          const marker = new google.maps.Marker({
            position: LocalizacaoBackEnd,
            map: map,
      
            //Titulo
            title: this.ecoPontos[i].nome,
      
            //Animção
            animation: google.maps.Animation.DROP, // BOUNCE
      
            //Icone
            //icon: 'assets/gps.png'
      
            
          });  

          google.maps.event.addListener(marker, 'click', () => {
            //Call run function to set the data within angular zone to trigger change detection.
            this.showAlert('Ecoponto','Local: '+this.ecoPontos[i].nome,'Tipos de Materiais aceitos:'+this.ecoPontos[i].descricao);
            

            const request = {
              // Pode ser uma coordenada (LatLng), uma string ou um lugar
              origin: this.LocalizacaoReferencia,
              destination: LocalizacaoBackEnd,
              travelMode: 'WALKING' //DRIVING
            };


            this.traceRoute(this.directionsService, this.directionsDisplay, request);

          });
      }
    });
  }   
        

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }


  async showAlert(header,subHeader,message) { 
    const alert = await this.alertCtrl.create({ 
    header: header, 
    subHeader: subHeader, 
    message: message, 
    buttons: ['OK'] 
    }); 
    await alert.present(); 
    const result = await alert.onDidDismiss();  
    //console.log(result); 
    } 


}

