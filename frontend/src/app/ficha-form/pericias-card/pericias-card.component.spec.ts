import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PericiasCardComponent } from './pericias-card.component';

describe('PericiasCardComponent', () => {
  let component: PericiasCardComponent;
  let fixture: ComponentFixture<PericiasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PericiasCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PericiasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
