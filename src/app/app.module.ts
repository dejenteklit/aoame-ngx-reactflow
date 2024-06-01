import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactFlowComponent} from 'ngx-reactflow';
import { HeaderComponent } from './header/header.component';
import { ModellingEnvironmentComponent } from './modelling-environment/modelling-environment.component';
import { ModellingAreaComponent } from './modelling-environment/components/modelling-area/modelling-area.component';

import { PaletteAreaBpmnComponent } from './modelling-environment/components/palette-area-bpmn/palette-area-bpmn.component';
import { PaletteAreaComponent } from './modelling-environment/components/palette-area/palette-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModellingEnvironmentComponent,
    ModellingAreaComponent,
    PaletteAreaBpmnComponent,
    PaletteAreaComponent,

  ],
  imports: [
    BrowserModule,
    ReactFlowComponent,
    BrowserAnimationsModule,  // Required for Angular Material
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
