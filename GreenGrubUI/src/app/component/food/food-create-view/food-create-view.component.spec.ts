import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCreateViewComponent } from './food-create-view.component';

describe('FoodCreateViewComponent', () => {
  let component: FoodCreateViewComponent;
  let fixture: ComponentFixture<FoodCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCreateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
