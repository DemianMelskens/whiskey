import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistilleriesComponent } from './distilleries.component';

describe('DistilleriesComponent', () => {
  let component: DistilleriesComponent;
  let fixture: ComponentFixture<DistilleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistilleriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistilleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
