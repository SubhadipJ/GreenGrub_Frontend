import { Routes } from '@angular/router';
import { FoodCreateViewComponent } from './component/food/food-create-view/food-create-view.component';
import { FoodDetailViewComponent } from './component/food/food-detail-view/food-detail-view.component';
import { DonationDetailViewComponent } from './component/donation/donation-detail-view/donation-detail-view.component';
import { DonationCreateViewComponent } from './component/donation/donation-create-view/donation-create-view.component';

export const routes: Routes = [
     { path: 'foodDetail', component: FoodDetailViewComponent },
     { path: 'createFood', component: FoodCreateViewComponent },
     { path: 'donationDetail', component: DonationDetailViewComponent },
     { path: 'createDonation', component: DonationCreateViewComponent }
];
