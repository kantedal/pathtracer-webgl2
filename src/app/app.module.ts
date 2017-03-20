import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'

import { AppComponent } from './app.component'
import {RenderService} from "./renderer/render.service"
import {BottomBarComponent} from "./components/bottom-bar/bottom-bar.component"
import {SettingsService} from "./services/settings.service"

@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    RenderService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
