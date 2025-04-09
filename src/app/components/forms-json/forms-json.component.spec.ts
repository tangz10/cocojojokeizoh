import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsJsonComponent } from './forms-json.component';

describe('FormsJsonComponent', () => {
  let component: FormsJsonComponent;
  let fixture: ComponentFixture<FormsJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
