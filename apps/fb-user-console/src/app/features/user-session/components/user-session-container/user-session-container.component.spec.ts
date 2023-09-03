import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSessionContainerComponent } from './user-session-container.component';

describe('UserSessionContainerComponent', () => {
  let component: UserSessionContainerComponent;
  let fixture: ComponentFixture<UserSessionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSessionContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSessionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
