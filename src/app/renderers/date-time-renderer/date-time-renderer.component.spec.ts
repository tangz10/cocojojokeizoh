import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeRendererComponent } from './date-time-renderer.component';

describe('DateTimeRendererComponent', () => {
  let component: DateTimeRendererComponent;
  let fixture: ComponentFixture<DateTimeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
