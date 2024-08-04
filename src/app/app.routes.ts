import { Routes } from '@angular/router';
import { AjoutComponent } from './ajout/ajout.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path:'ajout',component:AjoutComponent },
    { path:'list',component:ListComponent },
    { path: ':postId/detail', component: DetailComponent },
    { path: ':postId/edit', component: EditComponent }
];
