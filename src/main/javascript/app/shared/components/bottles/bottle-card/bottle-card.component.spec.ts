import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleCardComponent } from './bottle-card.component';

describe('BottleCardComponent', () => {
  let component: BottleCardComponent;
  let fixture: ComponentFixture<BottleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
