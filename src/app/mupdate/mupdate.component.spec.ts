import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MupdateComponent } from './mupdate.component';

describe('MupdateComponent', () => {
  let component: MupdateComponent;
  let fixture: ComponentFixture<MupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
