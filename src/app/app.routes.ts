import { Routes } from '@angular/router';
import {SignUpForm} from './components/sign-up-form/sign-up-form';
import {Home} from './components/home/home';
import {SignInForm} from './components/sign-in-form/sign-in-form';
import {CarroCompras} from './components/carro-compras/carro-compras';
import {AdminDashboard} from './components/admin-dashboard/admin-dashboard';
import {Juegos} from './components/juegos/juegos';
import {Ofertas} from './components/ofertas/ofertas';
import {UserProfile} from './components/user-profile/user-profile';
import {Producto} from './components/producto/producto';
import {PassRecover} from './components/pass-recover/pass-recover';
import {EditProfile} from './components/edit-profile/edit-profile';
import {TerminosCondiciones} from './components/terminos-condiciones/terminos-condiciones';
import {Privacidad} from './components/privacidad/privacidad';


export const routes: Routes = [

  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sign-up',
    component: SignUpForm,
  },
  {
    path: 'sign-in',
    component: SignInForm,
  },
  {
    path: 'carro-compras',
    component: CarroCompras,
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
  },
  {
    path: 'juegos/:categoria',
    component: Juegos,
  },
  {
    path: 'ofertas',
    component: Ofertas,
  },
  {
    path: 'user-profile/:username',
    component: UserProfile,
  },
  {
    path: 'producto/:id',
    component: Producto,
  },
  {
    path: 'password-reset?email=:email',
    component: PassRecover,
  },
  {
    path: 'edit_profile/:username',
    component: EditProfile,
  },
  {
    path: 'terminos-condiciones',
    component: TerminosCondiciones
  },
  {
    path: 'privacidad',
    component: Privacidad,
  }
];
