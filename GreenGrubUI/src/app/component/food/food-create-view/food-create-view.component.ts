import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-create-view',
  standalone: true,
  imports: [
  FormsModule,
  CommonModule
],
  templateUrl: './food-create-view.component.html',
  styleUrl: './food-create-view.component.scss'
})
export class FoodCreateViewComponent {
food = {
    name: '',
    desc: '',
    quantity: null as number | null,
    unit: 'kg',
    foodType: 'veg',
    images: [] as File[],
    prepareDate: '',
    expiryDate: '' 
  };

  imagePreviews: string[] = [];

  foodTypes = [
    { value: 'veg', label: 'Veg' },
    { value: 'non-veg', label: 'Non-Veg' },
    { value: 'jain', label: 'Jain' },
    { value: 'waste', label: 'Waste' }
  ];

  onImageSelect(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.food.images.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    // Reset the file input so selecting same file again triggers change event
    event.target.value = '';
  }

  removeImage(index: number) {
    this.food.images.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  selectFoodType(type: string) {
    this.food.foodType = type;
  }

  onSubmit() {
    if (!this.food.name || !this.food.quantity || !this.food.unit) {
      alert('Please fill all required fields!');
      return;
    }

    console.log('Food to submit:', this.food);
    // TODO: Use HttpClient to send FormData to backend
    // Example:
    // const formData = new FormData();
    // formData.append('name', this.food.name);
    // formData.append('desc', this.food.desc);
    // formData.append('quantity', this.food.quantity.toString());
    // formData.append('unit', this.food.unit);
    // formData.append('foodType', this.food.foodType);
    // this.food.images.forEach(img => formData.append('images', img));
    // this.myFoodService.createFood(formData).subscribe(...)
  }
}
