import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottlersComponent } from './bottlers.component';

describe('BottlersComponent', () => {
  let component: BottlersComponent;
  let fixture: ComponentFixture<BottlersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottlersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
