import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCreateViewComponent } from './donation-create-view.component';

describe('DonationCreateViewComponent', () => {
  let component: DonationCreateViewComponent;
  let fixture: ComponentFixture<DonationCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationCreateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
