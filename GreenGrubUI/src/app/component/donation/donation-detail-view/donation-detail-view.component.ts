import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation-detail-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './donation-detail-view.component.html',
  styleUrl: './donation-detail-view.component.scss'
})
export class DonationDetailViewComponent {
editMode = false;
  currentImage = 0;

  // sample donation - replace with real data from API
  donation = {
    id: 'don-12345',
    title: 'Home-cooked lunch (rice + curry)',
    date: new Date(),
    status: 'pending' as 'pending' | 'accepted' | 'rejected' | 'picked_up',
    donor: {
      name: 'Anita Sharma',
      phone: '+91 98765 43210',
      email: 'anita@example.com'
    },
    pickup: {
      address: 'Flat 4B, Sunflower Apartments, MG Road, Kolkata',
      time: 'Today, 6:30 PM'
    },
    notes: 'Able to keep warm in insulated containers. Please pick up between 6 - 7 PM.',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      'https://images.unsplash.com/photo-1604908177522-bf9417e3b8ec'
    ],
    items: [
      { name: 'Cooked Rice', desc: 'Steamed', quantity: 5, unit: 'kg', foodType: 'veg' },
      { name: 'Chana Masala', desc: 'Spicy', quantity: 10, unit: 'servings', foodType: 'veg' }
    ] as any[],
    history: [
      { time: new Date(Date.now() - 1000 * 60 * 60 * 5), event: 'Donation created' }
    ]
  };

  // draft copy used while editing to allow Cancel
  draft: any = this.cloneDonation();

  ngOnInit() {
    // If loading from API, populate donation then clone
    this.draft = this.cloneDonation();
  }

  cloneDonation() {
    return JSON.parse(JSON.stringify(this.donation));
  }

  // Image carousel controls
  nextImage() {
    if (!this.donation.images || this.donation.images.length === 0) return;
    this.currentImage = (this.currentImage + 1) % this.donation.images.length;
  }
  prevImage() {
    if (!this.donation.images || this.donation.images.length === 0) return;
    this.currentImage = (this.currentImage - 1 + this.donation.images.length) % this.donation.images.length;
  }
  goToImage(i: number) { this.currentImage = i; }

  donorInitials(name: string) {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  }

  statusClass(status: string) {
    return {
      pending: 'st-pending',
      accepted: 'st-accepted',
      rejected: 'st-rejected',
      picked_up: 'st-picked'
    }[status] || 'st-pending';
  }

  // Toggle edit mode: reset draft if entering, discard if cancelling
  toggleEdit() {
    if (this.editMode) {
      // cancel -> revert draft
      this.draft = this.cloneDonation();
      this.editMode = false;
    } else {
      this.draft = this.cloneDonation();
      this.editMode = true;
    }
  }

  // Confirm save and push draft into real donation (call API here)
  confirmSave() {
    if (!this.editMode) return;
    if (!confirm('Save changes to donation?')) return;

    // apply changes
    this.donation = this.cloneDonationFrom(this.draft);
    this.editMode = false;

    // push to history
    this.donation.history.unshift({ time: new Date(), event: 'Donation edited' });

    // TODO: call API to update donation on server
    console.log('Saved donation:', this.donation);
  }

  cloneDonationFrom(src: any) {
    return JSON.parse(JSON.stringify(src));
  }

  // Actions: accept/reject/picked_up
  confirmAction(action: 'accept'|'reject'|'picked_up') {
    let msg = '';
    if (action === 'accept') msg = 'Accept this donation?';
    if (action === 'reject') msg = 'Reject this donation?';
    if (action === 'picked_up') msg = 'Mark as picked up?';
    if (!confirm(msg)) return;

    if (action === 'accept') {
      this.donation.status = 'accepted';
      this.donation.history.unshift({ time: new Date(), event: 'Donation accepted' });
    } else if (action === 'reject') {
      this.donation.status = 'rejected';
      this.donation.history.unshift({ time: new Date(), event: 'Donation rejected' });
    } else if (action === 'picked_up') {
      this.donation.status = 'picked_up';
      this.donation.history.unshift({ time: new Date(), event: 'Picked up by volunteer' });
    }

    // TODO: call backend API to update status
    console.log('Action performed:', action, 'new status:', this.donation.status);
  }
}
