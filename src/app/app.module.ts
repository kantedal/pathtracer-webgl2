import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RenderService} from "../renderer/render.service";
import {SceneService} from "../renderer/scene.service";;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RenderService,
    SceneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
