import { Routes } from '@angular/router';

export const routes: Routes = [

{
    path:'auth',
    loadChildren:()=> import ('./auth/features/auth.routes')
},
{
    path:'ejemplo1',
    loadComponent:()=> import ('./formulario/ejemplo1/ejemplo1.component')
},


];
