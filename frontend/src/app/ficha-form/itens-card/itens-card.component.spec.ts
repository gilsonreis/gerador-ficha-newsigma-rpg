import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensCardComponent } from './itens-card.component';

describe('ItensCardComponent', () => {
  let component: ItensCardComponent;
  let fixture: ComponentFixture<ItensCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
