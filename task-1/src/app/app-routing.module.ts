import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes =[
    { path: '', component: AppComponent},
    { path: 'add', component: RegistrationFormComponent},
    { path: 'about', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
