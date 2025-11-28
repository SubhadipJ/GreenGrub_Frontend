import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../models/food.model';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private foods$ = new BehaviorSubject<Food[]>([
    // some sample foods
    {
      id: 'f-' + Date.now(),
      name: 'Cooked Rice',
      desc: 'Steamed rice',
      quantity: 5,
      unit: 'kg',
      foodType: 'veg',
      images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c']
    }
  ]);

  getAll(): Observable<Food[]> {
    return this.foods$.asObservable();
  }

  add(food: Food) {
    const arr = [...this.foods$.value, food];
    this.foods$.next(arr);
  }

  getById(id: string): Food | undefined {
    return this.foods$.value.find(f => f.id === id);
  }
}
