import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerStatsComponent } from './power-stats.component';

describe('PowerStatsComponent', () => {
  let component: PowerStatsComponent;
  let fixture: ComponentFixture<PowerStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
