import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { getTranslocoModule, TranslocoEntity, translocoTestMissingHandler, TranslocoUtilityService } from '@beyondoc/core-lib/transloco';
import SpyObj = jasmine.SpyObj;
import { CustomSnackBarComponent } from './custom-snackbar.component';
import { IEntityLink, ISnackBarData } from '../models/ISnackbarData';
import { PlainMap } from '@beyondoc/data-models-lib';

describe('CustomSnackBarComponent', () => {
  let component: CustomSnackBarComponent;
  let fixture: ComponentFixture<CustomSnackBarComponent>;
  let snackRefSpy: SpyObj<MatSnackBarRef<CustomSnackBarComponent>>;
  let routerSpy: SpyObj<Router>;

  const snackBarData = {} as ISnackBarData;

  function createComponent() {
    fixture = TestBed.createComponent(CustomSnackBarComponent);
    component = fixture.componentInstance;
    component.message = 'message';
    fixture.detectChanges();
  }

  beforeEach(async () => {
    snackRefSpy = jasmine.createSpyObj('MatSnackBarRef', ['dismiss']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [CustomSnackBarComponent],
      imports: [getTranslocoModule()],
      providers: [
        translocoTestMissingHandler,
        {
          provide: MatSnackBarRef,
          useValue: snackRefSpy,
        },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: snackBarData,
        },
        {
          provide: Router,
          useValue: routerSpy,
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

  function setSnackBarData(messageKey: string | undefined = undefined, message: string | undefined = undefined, params: PlainMap<string> | undefined = undefined, closeKey: string | undefined = undefined, link: IEntityLink = {} as IEntityLink) {
    snackBarData.closeKey = closeKey as string;
    snackBarData.link = link;
    if (message) {
      snackBarData.message = message;
    } else {
      snackBarData.message = TranslocoUtilityService.getTranslocoEntity(messageKey as string, params);
    }
  }

  function testHtml(message: string | TranslocoEntity | undefined, linkDiv: boolean, linkButtonText: string | undefined, closeDiv: boolean, closeButtonText: string | undefined) {
    if (message) {
      expect(fixture.debugElement.query(By.css('div[data-karma="message"]'))?.nativeElement.textContent.trim()).toEqual((message as TranslocoEntity).key ? (message as TranslocoEntity).key : message);
    }

    const linkDivQuery = fixture.debugElement.query(By.css('div[data-karma="link"]'));
    if (linkDiv) {
      expect(linkDivQuery).not.toBeNull();
    } else {
      expect(linkDivQuery).toBeNull();
    }

    expect(fixture.debugElement.query(By.css('button[data-karma="link"]'))?.nativeElement.textContent.trim()).toEqual(linkButtonText);

    const closeDivQuery = fixture.debugElement.query(By.css('div[data-karma="close"]'));
    if (closeDiv) {
      expect(closeDivQuery).not.toBeNull();
    } else {
      expect(closeDivQuery).toBeNull();
    }

    expect(fixture.debugElement.query(By.css('button[data-karma="close"]'))?.nativeElement.textContent.trim()).toEqual(closeButtonText);
  }

  it('test messageKey', () => {
    setSnackBarData('messageKey', undefined, { a: 'a' } as PlainMap<string>);

    createComponent();

    testHtml(snackBarData.message, false, undefined, false, undefined);
  });

  it('test message', () => {
    setSnackBarData(undefined, 'message', { a: 'a' } as PlainMap<string>);

    createComponent();

    expect(component.message).toEqual(snackBarData.message);

    testHtml(component.message, false, undefined, false, undefined);
  });

  it('test closeKey', () => {
    setSnackBarData(undefined, undefined, undefined, 'closeKey');

    createComponent();

    testHtml(undefined, false, undefined, true, component.close);
  });

  it('openLink', () => {
    routerSpy.navigateByUrl.and.returnValue(Promise.resolve(true));
    createComponent();
    component.link = 'link';
    component.openLink();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(component.link);
    expect(snackRefSpy.dismiss).toHaveBeenCalled();
  });

  it('closeSnackBar', () => {
    createComponent();
    component.closeSnackBar();
    expect(snackRefSpy.dismiss).toHaveBeenCalled();
  });
});
