import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TodoService} from './services/todo.service';

import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
