import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  user = new UserModel();
  constructor( private auth:AuthService, 
    private router: Router) {}

  ngOninit(){
  }
  onSubmit( form: NgForm){

    if( form.invalid){ return ;}

    Swal.fire({ 
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
     }
    );
    Swal.showLoading();
     this.auth.register(this.user).subscribe( resp =>{
       Swal.close();
       Swal.fire({ 
        allowOutsideClick: false,
        icon: 'success',
        text: 'Registro exitoso'
       }
      );
       this.router.navigateByUrl('/login');
     }, (err)=>{
      Swal.fire({ 
        allowOutsideClick: false,
        icon: 'error',
        text: err.error.message,
        title:'Error de registro'
       }
      );
      console.log(err.error.message);
     });
  }

}
