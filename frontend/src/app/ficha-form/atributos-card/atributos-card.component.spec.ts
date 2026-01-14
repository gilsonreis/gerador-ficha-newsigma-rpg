import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributosCardComponent } from './atributos-card.component';

describe('AtributosCardComponent', () => {
  let component: AtributosCardComponent;
  let fixture: ComponentFixture<AtributosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtributosCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtributosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
