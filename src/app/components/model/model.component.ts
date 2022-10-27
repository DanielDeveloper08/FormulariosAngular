import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formulario!: FormGroup;
  //clases que se agg
  // valid-invalid -> se cumplen las validaciones
  // pristine -- dirty -> nunca se ha ingresado al campo
  // untouched -- touched -> tenia el foco y lo perdio

  constructor() { 
    this.formulario = new FormGroup({
      nombre: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
      ]),
      apellidos: new FormControl('',[
        Validators.required,
        Validators.maxLength(10)
      ]),
      edad: new FormControl('',[
        Validators.required, 
        this.edadValidator
      ]),
      dni: new FormControl('',[
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ]),
      repite_password: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        //Expresines regulares
        Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      ]),
    });
  }

  ngOnInit(): void {
    const emailControl = this.formulario.controls['email'];
    // pipe se utiliza para esperar cierto tiempo para recuperar los cambios del campo.
    emailControl.valueChanges.pipe(debounceTime(5000)).subscribe(value => console.log(value));
  }

  onSubmit(){
    console.log(this.formulario.value);
  }

  edadValidator(formControl:FormControl){
    const value = formControl.value;
    const max = 65;
    const min = 18;

    if(value >=min && value <=max){
      return null;
    }else{
      return { edadValidator: {max,min}};
    }
    
  }

  dniValidator(formControl:FormControl){
    const value = formControl.value;


  }

}
