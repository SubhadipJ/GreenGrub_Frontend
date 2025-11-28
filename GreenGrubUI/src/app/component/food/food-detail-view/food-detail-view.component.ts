import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-detail-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './food-detail-view.component.html',
  styleUrl: './food-detail-view.component.scss'
})
export class FoodDetailViewComponent {
  currentImage = 0;

  food = {
    name: 'Fresh Rice',
    desc: 'Cooked rice available for donation.',
    quantity: 5,
    unit: 'kg',
    foodType: 'veg',
    images: [
      'https://images.unsplash.com/photo-1604908177522-bf9417e3b8ec',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      'https://images.unsplash.com/photo-1604908812197-3f4822388c52'
    ]
  };

  foodTypes = [
    { value: 'veg', label: 'Veg' },
    { value: 'non-veg', label: 'Non-Veg' },
    { value: 'jain', label: 'Jain' },
    { value: 'waste', label: 'Waste' }
  ];

  nextImage() {
    if (!this.food.images || this.food.images.length === 0) return;
    this.currentImage = (this.currentImage + 1) % this.food.images.length;
  }

  prevImage() {
    if (!this.food.images || this.food.images.length === 0) return;
    this.currentImage = (this.currentImage - 1 + this.food.images.length) % this.food.images.length;
  }

  goToImage(i: number) {
    this.currentImage = i;
  }

  selectFoodType(type: string) {
    this.food.foodType = type;
  }

  onSave() {
    console.log('Saved Food Details:', this.food);
    // TODO: Call backend API to save the updated food details
  }
}
