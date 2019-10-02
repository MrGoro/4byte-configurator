export class Device {
  id: number;
  name: string;
  icon: string;
  category: number;
  min: number;
  max: number;
  needed: number;
}

export class Category {
  id: number;
  name: string;
  icon: string;
  subCategories: Category[] = [];

  constructor() {}

  static of(data:DataCategory):Category {
    let category: Category = new Category();
    category.id = data.id;
    category.name = data.name;
    category.icon = data.icon;
    return category;
  }
}

export class DataCategory {
  id: number;
  name: string;
  icon: string;
  parentCategory: number;
}