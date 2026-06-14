import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroCompras } from './carro-compras';

describe('CarroCompras', () => {
  let component: CarroCompras;
  let fixture: ComponentFixture<CarroCompras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarroCompras],
    }).compileComponents();

    fixture = TestBed.createComponent(CarroCompras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
