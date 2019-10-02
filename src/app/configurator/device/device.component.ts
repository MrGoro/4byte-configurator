import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DeviceService } from './device.service';
import { Category } from './data';

@Component({
  selector: 'app-device',
  template: `Device`,
  styles: [``]
})
export class DeviceComponent implements OnInit  {
  
  constructor(private service: DeviceService) {}

  ngOnInit() {
    
  }
}
