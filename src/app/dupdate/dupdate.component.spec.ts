import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupdateComponent } from './dupdate.component';

describe('DupdateComponent', () => {
  let component: DupdateComponent;
  let fixture: ComponentFixture<DupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
