import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DeviceService } from './../device.service';
import { Device, Category } from './../data';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DeviceListComponent implements OnInit  {

  @Output() public deviceAdded = new EventEmitter<Device>();
  @Input() public category: Category;

  public devices: Observable<Device[]>

  isLoadingResults = true;
  expandedElement: Device | null;
  displayedColumns: string[] = ['position', 'name'];
  
  constructor(private service: DeviceService) {}

  ngOnInit() {
    console.log("Devices for Category: " + this.category.id);
    this.devices = this.service.getDevices(this.category.id).pipe(
      tap(x => this.isLoadingResults=false)
    );
  }

  add(device: Device) {
    this.deviceAdded.emit(device);
  }
}
