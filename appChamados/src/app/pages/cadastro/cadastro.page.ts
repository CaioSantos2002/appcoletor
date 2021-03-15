import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss'],
})
export class CadastroPage {
  nome:String;
  celular:String;
  rua:String;
  numero:String;
  bairro:String;
  cidade:String;
  uf:String;
  cpf:String;
  tipo:String;
  senha:String

showPassword = false;
passwordToggleIcon = 'eye';


  constructor(public httpClient: HttpClient,
    public alertCtrl: AlertController) {}

  togglePassword() {
      this.showPassword = !this.showPassword;
  
      if(this.passwordToggleIcon == 'eye') {
          this.passwordToggleIcon = 'eye-off';
      
      } else {
        this.passwordToggleIcon = 'eye';
      }
  }

  sendPostRequest() {
    
    if(this.nome === undefined || this.nome.length == 0){ 
      this.showAlert("Digite seu nome!");
    }else{
      if(this.celular === undefined || this.celular.length == 0){ 
        this.showAlert("Digite o celular!");
      }else{
        if(this.rua === undefined || this.rua.length == 0){ 
          this.showAlert("Digite sua rua!");
        }else{
          if(this.numero === undefined || this.numero.length == 0){ 
            this.showAlert("Digite o numero da residencia!");
          }else{
            if(this.bairro === undefined || this.bairro.length == 0){ 
              this.showAlert("Digite seu bairro!");
            }else{
              if(this.cidade === undefined || this.cidade.length == 0){ 
                this.showAlert("Digite sua cidade!");
              }else{
                if(this.uf === undefined || this.uf.length == 0){ 
                  this.showAlert("Digite seu UF!");
                }else{
                  if(this.cpf === undefined || this.cpf.length == 0){ 
                    this.showAlert("Digite seu CPF!");
                  }else{
                    if(this.tipo === undefined || this.tipo.length == 0){ 
                      this.showAlert("Digite o tipo!");
                    }else{
                      if(this.senha === undefined || this.senha.length == 0){ 
                        this.showAlert("Digite uma senha!");
                      }
        
        let postData = JSON.stringify({
          "nome": this.nome,
          "celular": this.celular,
          "rua": this.rua,
          "numero": this.numero,
          "bairro": this.bairro,
          "cidade": this.cidade,
          "uf": this.uf,
          "cpf": this.cpf,
          "tipo": this.tipo,
          "senha": this.senha,
          "verbo": "POST"
      });

      console.log(postData);

      this.httpClient.post("https://projetorrw.000webhostapp.com/src/controll/routes/route.usuarios.php", postData)
      .subscribe(data=> {
        
     
        let jsonData: string =  JSON.stringify(data);
        let jsonObject = JSON.parse(jsonData);
        let status = jsonObject.status;

        let saidaMsg;

        if(status == "C001"){
          saidaMsg = "Cadastrado com sucesso!";
          this.nome = "";
        }else if(status == "C002"){
          saidaMsg = "Falha na Operação!";
        }else if(status == "C003"){
          saidaMsg = "Campos incompletos na requisição";
        }else if(status == "C004"){
          saidaMsg = "ID inválido";
        }else if(status == "C005"){
          saidaMsg = "Verbo não suportado";
        }else if(status == "C006"){
          saidaMsg = "Verbo não informado";
        }else if(status == "C007"){
          saidaMsg = "Em desenvolvimento";
        }else if(status == "C008"){
          saidaMsg = "CPF ou CNPJ inválidos";
        }

        this.showAlert(saidaMsg);
        console.log(data);
      }, error => {
        console.log(error);
      });
      
                    } 
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  async showAlert(mensagem) { 
      const alert = await this.alertCtrl.create({ 
      header: 'Aviso', 
      subHeader: '', 
      message: mensagem, 
      buttons: ['OK'] 
      }); 
      await alert.present(); 
      const result = await alert.onDidDismiss();  
      console.log(result); 
    } 
    
    //const mensagem = location.search.slice(1);
    //if (mensagem.split("=")[0] == "erro"){
    //  msg.innerHTML = decodeURIComponent(mensagem.split("=")[1]);
    //setTimeout(() => { window.location.href = "?" }, 3000);
    //}


}