import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './modules/users/users.component';
import { ConfirmDeleteComponent } from './modules/dialogs/confirm-delete/confirm-delete.component';
import { UserFormComponent } from './modules/dialogs/user-form/user-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ConfirmDeleteComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [],
  entryComponents: [UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
