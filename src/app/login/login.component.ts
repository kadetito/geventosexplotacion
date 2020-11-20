import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm,
  NgModel,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { DataserviceService } from '../services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  datosphp: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataserviceService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (localStorage.removeItem('id_persona') != null) {
      const keysToRemove = ['token', 'id_persona', 'usuario', 'id_rol'];

      for (const key of keysToRemove) {
        localStorage.removeItem(key);
      }

      this.router.navigateByUrl('');
    }
  }

  postdata(angForm: FormGroup) {
    var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    var emailResult = patronEmail.test(angForm.value.email);
    if (emailResult == false) {
      Swal.fire({
        text: 'El campo E-mail debe cumplir con el formato adecuado',
        icon: 'error',
        showConfirmButton: true,
      });
    } else {
      this.dataService
        .userlogin(angForm.value.email, angForm.value.password)
        .pipe(first())
        .subscribe(
          (data) => {
            //const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/listadoinicial';
            const redirect =
              this.route.snapshot.queryParams['redirectUrl'] || '/eventos';
            this.router.navigate([redirect]);
          },
          (error) => {
            Swal.fire({
              text:
                'El campo E-mail o el password son erróneos. revise los datos.',
              icon: 'error',
              showConfirmButton: true,
            });
          }
        );
    }
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
}
