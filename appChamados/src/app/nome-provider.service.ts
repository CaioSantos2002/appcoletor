import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 @Injectable({
  providedIn: 'root'
})
export class NomeProviderService {

  url: string = "https://projetorrw.000webhostapp.com/src/controll/routes/";

  constructor(public http: HttpClient) {
   
   }
   sendPostRequest(dados) {
   var httpheaders = new HttpHeaders();
   httpheaders.append("Accept", 'application/json');
   httpheaders.append('Content-Type', 'application/json');

   let postData = JSON.stringify({
   "autonomo_id": dados.autonomo_id,
   "solicitante_id": dados.solicitante_id,
   "status": "3",
    "lat": dados.lat,
    "longi": dados.longi,
    "dia_hora": dados.dia_hora,
    "verbo": "PUT",
    "id": dados.id
    })

    this.http.post("https://projetorrw.000webhostapp.com/src/controll/routes/route.chamados_autonomos.php", postData)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });  
  }
  
  getPegar(parametros: string){

    return this.http.get(this.url+'route.chamados_autonomos.php?'+parametros);
   
   }
   
}
