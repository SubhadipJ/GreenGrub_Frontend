import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailViewComponent } from './food-detail-view.component';

describe('FoodDetailViewComponent', () => {
  let component: FoodDetailViewComponent;
  let fixture: ComponentFixture<FoodDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
