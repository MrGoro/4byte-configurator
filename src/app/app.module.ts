import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConfiguratorComponent } from './configurator/configurator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DeviceService } from './configurator/device/device.service';
import { DeviceListComponent } from './configurator/device/list/device-list.component';
import { DeviceComponent } from './configurator/device/device.component';

@NgModule({
  imports: [ 
    BrowserModule, FormsModule, HttpClientModule,
    BrowserAnimationsModule, MaterialModule
  ],
  declarations: [
    AppComponent, ConfiguratorComponent, 
    DeviceListComponent, DeviceComponent
  ],
  providers: [
    DeviceService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
