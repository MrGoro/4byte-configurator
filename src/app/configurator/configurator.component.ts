import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Observable } from 'rxjs';

import { Category, Device } from './device/data';
import { DeviceService } from './device/device.service';

@Component({
  selector: 'app-configurator',
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '100%'
      })),
      state('closed', style({
        width: '150px'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './configurator.component.html',
  styleUrls: [ './configurator.component.css' ]
})
export class ConfiguratorComponent implements OnInit {

  public categories: Observable<Category[]>;

  public expanded: Category;
  public selected: Category;

  public configuredDevices: Device[] = [];

  constructor(private service: DeviceService) {
  }

  ngOnInit() {
    this.categories = this.service.getCategories();
  }

  expand(category: Category) {
    console.log(category);
    this.selected = null;
    if(this.expanded == category) {
      this.expanded = null;
    } else {
      this.expanded = category;
    }
  }

  select(category: Category) {
    console.log(category);
    if(this.selected == category) {
      this.selected = null;
    } else {
      this.selected = category;
    }
  }

  onDeviceAdded(device: Device) {
    this.configuredDevices.push(device);
  }

  removeDevice(device: Device) {
    arrayRemove(this.configuredDevices, device);
  }

  get neededTotal():number {
    let total = 0;
    for(let device of this.configuredDevices) {
      total += device.needed;
    }
    return total;
  }
}

function arrayRemove(arr, value) {
  let index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
}