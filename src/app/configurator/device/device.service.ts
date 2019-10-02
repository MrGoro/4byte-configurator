import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map, flatMap, filter } from 'rxjs/operators';

import { Device, Category, DataCategory } from './data';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.getDataCategories().pipe(
      map(this.mapData)
    )
  }

  mapData(dataCategories: DataCategory[]): Category[] {
    const categories: Category[] = [];
    for(let data of dataCategories) {
      if(data.parentCategory == -1) {
        let category:Category = Category.of(data);
        categories.push(category)
      } else {
        let parentCategory:Category = find(categories, data.parentCategory);
        let category:Category = Category.of(data);
        parentCategory.subCategories.push(category);
      }
    }
    return categories;
  }

  getDevices(categoryId: number) {
    return this.getDataDevices().pipe(
      map(devices => devices.filter(d => d.category == categoryId))
    )
  }

  private getDataCategories(): Observable<DataCategory[]> {
    return this.http.get<DataCategory[]>("/assets/api/categories.json");
  }

  private getDataDevices(): Observable<Device[]> {
    return this.http.get<Device[]>("/assets/api/devices.json");
  }

}

function find(categories: Category[], id: number): Category {
  for(let category of categories) {
    if(category.id == id) {
      return category;
    }
  }
  console.log("Error finding category " + id)
  return null;
}