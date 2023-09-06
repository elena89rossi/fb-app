import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistationContainerComponent } from './registation-container.component';

describe('RegistationContainerComponent', () => {
  let component: RegistationContainerComponent;
  let fixture: ComponentFixture<RegistationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistationContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
