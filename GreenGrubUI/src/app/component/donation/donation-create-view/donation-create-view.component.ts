import { Component, OnDestroy, OnInit } from '@angular/core';
import { Food } from '../../../models/food.model';
import { Subscription } from 'rxjs';
import { FoodService } from '../../../services/food.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donation-create-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './donation-create-view.component.html',
  styleUrl: './donation-create-view.component.scss'
})
export class DonationCreateViewComponent implements OnInit, OnDestroy {

donation = {
    title: '',
    pickupAddress: '',
    notes: '',
    foods: [] as Food[]
  };

  // app-wide foods
  allFoods: Food[] = [];
  subs = new Subscription();

  // create modal state
  showCreate = false;
  createModel: Partial<Food> = this.emptyCreateModel();
  createPreviews: string[] = [];

  // browse modal state
  showBrowse = false;

  // view food modal
  viewingFood: Food | null = null;

  foodTypes = [
    { value: 'veg', label: 'Veg' },
    { value: 'non-veg', label: 'Non-Veg' },
    { value: 'jain', label: 'Jain' },
    { value: 'waste', label: 'Waste' }
  ];

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.subs.add(this.foodService.getAll().subscribe(list => this.allFoods = list));
  }
  ngOnDestroy() { this.subs.unsubscribe(); }

  emptyCreateModel(): Partial<Food> {
    return { id: '', name: '', desc: '', quantity: 1, unit: 'kg', foodType: 'veg', images: [] };
  }

  // Create modal handlers
  openCreate() {
    this.createModel = this.emptyCreateModel();
    this.createPreviews = [];
    this.showCreate = true;
  }
  closeCreate() { this.showCreate = false; }

  onCreateImages(evt: any) {
    const files: FileList = evt.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.createPreviews.push(e.target.result);
      };
      reader.readAsDataURL(f);
    }
    evt.target.value = '';
  }
  removeCreatePreview(i: number) { this.createPreviews.splice(i, 1); }

  saveNewFood() {
    if (!this.createModel.name || !this.createModel.quantity) {
      alert('Please fill required fields (name & quantity).');
      return;
    }

    const newFood: Food = {
      id: 'f-' + Date.now() + '-' + Math.floor(Math.random()*1000),
      name: String(this.createModel.name),
      desc: String(this.createModel.desc || ''),
      quantity: Number(this.createModel.quantity || 0),
      unit: String(this.createModel.unit || 'kg'),
      foodType: String(this.createModel.foodType || 'veg'),
      images: [...this.createPreviews]
    };

    // save to app-wide list and add to current donation
    this.foodService.add(newFood);
    this.donation.foods.push(newFood);

    this.showCreate = false;
  }

  // Browse modal
  openBrowse() { this.showBrowse = true; }
  closeBrowse() { this.showBrowse = false; }

  addToDonation(food: Food) {
    // prevent duplicates
    if (this.donation.foods.find(f => f.id === food.id)) {
      alert('Already added to donation.');
      return;
    }
    this.donation.foods.push({ ...food }); // shallow copy
  }

  // View modal
  viewFood(food: Food) {
    this.viewingFood = food;
  }
  closeView() { this.viewingFood = null; }

  removeFromDonation(idx: number) {
    this.donation.foods.splice(idx, 1);
  }

  // final create donation (demo)
  createDonation() {
    if (!this.donation.title) {
      alert('Please give the donation a title.');
      return;
    }
    // here you would call backend API to create donation
    console.log('Donation created:', this.donation);
    alert('Donation created (see console).');
    // reset form
    this.donation = { title: '', pickupAddress: '', notes: '', foods: [] };
  }

}
