import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { MaterialModule } from '@angular/material'
import {ColorPickerModule} from 'angular2-color-picker';

import { AppComponent } from './app.component'
import {RenderService} from "./renderer/render.service"
import {BottomBarComponent} from "./components/bottom-bar/bottom-bar.component"
import {SettingsService} from "./renderer/settings/settings.service"
import {TopBarComponent} from "./components/top-bar/top-bar.component"
import {RenderSettingsComponent} from "./components/render-settings/render-settings.component"
import {SettingAttributeComponent} from './components/setting-attribute/setting-attribute.component'
import {FractalSettingsComponent} from "./components/fractal-settings/fractal-settings.component"

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    FractalSettingsComponent,
    RenderSettingsComponent,
    BottomBarComponent,
    SettingAttributeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ColorPickerModule
  ],
  providers: [
    RenderService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
