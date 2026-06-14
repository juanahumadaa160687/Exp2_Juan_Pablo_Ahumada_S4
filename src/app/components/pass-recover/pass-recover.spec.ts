import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRecover } from './pass-recover';

describe('PassRecover', () => {
  let component: PassRecover;
  let fixture: ComponentFixture<PassRecover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassRecover],
    }).compileComponents();

    fixture = TestBed.createComponent(PassRecover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
