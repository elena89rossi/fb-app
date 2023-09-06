import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import SpyObj = jasmine.SpyObj;
import { CustomSnackBarComponent } from './custom-snackbar.component';
import { ISnackBarData } from '../models/snackbar-data.interface';

describe('CustomSnackBarComponent', () => {
  let component: CustomSnackBarComponent;
  let fixture: ComponentFixture<CustomSnackBarComponent>;
  let snackRefSpy: SpyObj<MatSnackBarRef<CustomSnackBarComponent>>;

  const snackBarData = {} as ISnackBarData;

  function createComponent() {
    fixture = TestBed.createComponent(CustomSnackBarComponent);
    component = fixture.componentInstance;
    component.message = 'message';
    fixture.detectChanges();
  }

  beforeEach(async () => {
    snackRefSpy = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);

    await TestBed.configureTestingModule({
      declarations: [CustomSnackBarComponent],
      imports: [],
      providers: [
        {
          provide: MatSnackBarRef,
          useValue: snackRefSpy,
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: snackBarData,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
  });

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  function setSnackBarData(message: string, closeKey: string | undefined = undefined) {
    snackBarData.closeKey = closeKey as string;
    snackBarData.message = message;
  }

  function testHtml(message: string , linkDiv: boolean, linkButtonText: string | undefined, closeDiv: boolean, closeButtonText: string | undefined) {
    if (message) {
      expect(fixture.debugElement.query(By.css('div[data-karma="message"]'))?.nativeElement.textContent.trim()).toEqual(message);
    }
    const closeDivQuery = fixture.debugElement.query(By.css('div[data-karma="close"]'));
    if (closeDiv) {
      expect(closeDivQuery).not.toBeNull();
    } else {
      expect(closeDivQuery).toBeNull();
    }

    expect(fixture.debugElement.query(By.css('button[data-karma="close"]'))?.nativeElement.textContent.trim()).toEqual(closeButtonText);
  }

  it('test message', () => {
    setSnackBarData( 'message');

    createComponent();

    expect(component.message).toEqual(snackBarData.message);

    testHtml(component.message, false, undefined, false, undefined);
  });

  it('closeSnackBar', () => {
    createComponent();
    component.closeSnackBar();
    expect(snackRefSpy.dismiss).toHaveBeenCalled();
  });
});
