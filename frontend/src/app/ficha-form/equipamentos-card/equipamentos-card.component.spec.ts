import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentosCardComponent } from './equipamentos-card.component';

describe('EquipamentosCardComponent', () => {
  let component: EquipamentosCardComponent;
  let fixture: ComponentFixture<EquipamentosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipamentosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipamentosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
