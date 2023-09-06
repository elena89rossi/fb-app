import { TestBed } from '@angular/core/testing';

import { SnackbarNotificationsService } from './snackbar-notifications.service';

describe('SnackbarNotificationsService', () => {
  let service: SnackbarNotificationsService;
  let routerSpy: SpyObj<Router>;
  let matSnackBarSpy: SpyObj<MatSnackBar>;
  let ngZoneSpy: SpyObj<NgZone>;
  let showSnackBarSpy: jasmine.Spy<(config: MatSnackBarConfig<any>, route?: string | undefined) => void>;
  let zoneRunSpy: jasmine.Spy<any>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    ngZoneSpy = jasmine.createSpyObj('NgZone', ['run']);
    ngZoneSpy.run.and.callFake(fn => fn());

    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatSnackBar,
          useValue: matSnackBarSpy
        },
        {
          provide: Router,
          useValue: routerSpy
        },
      ]
    });

    service = TestBed.inject(SnackbarNotificationService);
    showSnackBarSpy = spyOn(service, 'showSnackBar');
    zoneRunSpy = spyOn((<any>service), 'zoneRun');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should showSuccess', () => {
    service.showSuccess(TranslocoUtilityService.getTranslocoEntity('message'), 'close');
    expect(service.showSnackBar).toHaveBeenCalledWith({
      duration: 5000,
      panelClass: ['success-snackbar'],
      data: {
        message: TranslocoUtilityService.getTranslocoEntity('message'),
        closeKey: 'close'
      } as ISnackBarData
    }, undefined);
  });

  it('should showError', () => {
    service.showError('message', 'close', 'route');
    expect(service.showSnackBar).toHaveBeenCalledWith({
      panelClass: ['alert-snackbar'],
      data: {
        message: 'message',
        closeKey: 'close'
      } as ISnackBarData
    }, 'route');
  });

  it('should showCustomError', () => {
    service.showCustomError({ message: 'message' } as ISnackBarData, 'route');
    expect(service.showSnackBar).toHaveBeenCalledWith({
      panelClass: ['alert-snackbar'],
      data: {
        message: 'message',
      } as ISnackBarData
    }, 'route');
  });

  it('should showWarning', () => {
    service.showWarning(TranslocoUtilityService.getTranslocoEntity('message'), 'close');
    expect(service.showSnackBar).toHaveBeenCalledWith({
      panelClass: ['warning-snackbar'],
      data: {
        message: TranslocoUtilityService.getTranslocoEntity('message'),
        closeKey: 'close'
      } as ISnackBarData
    }, undefined);
  });

  it('should showCustomWarning', () => {
    service.showCustomWarning({ message: 'message' } as ISnackBarData);
    expect(service.showSnackBar).toHaveBeenCalledWith({
      panelClass: ['warning-snackbar'],
      data: {
        message: 'message',
      } as ISnackBarData
    }, undefined);
  });

  it('should showSnackBar - null close', () => {
    showSnackBarSpy.and.callThrough();
    service.showSnackBar(
      {
        data: { message: 'message' } as ISnackBarData,
        duration: 1,
        panelClass: 'class',
      } as MatSnackBarConfig,
      'route');

    expect(zoneRunSpy).toHaveBeenCalledWith(
      {
        data: { message: 'message', closeKey: 'WRITER-UI.CLOSE' },
        duration: 1,
        panelClass: 'class',
      } as MatSnackBarConfig
      , 'route');
  });

  it('should showSnackBar - close', () => {
    showSnackBarSpy.and.callThrough();
    service.showSnackBar(
      {
        data: { message: 'message', closeKey: 'close' } as ISnackBarData,
      } as MatSnackBarConfig,
      'route');

    expect(zoneRunSpy).toHaveBeenCalledWith(
      {
        data: { message: 'message', closeKey: 'close' },
      } as MatSnackBarConfig
      , 'route');
  });

  it('should zoneRun', () => {
    zoneRunSpy.and.callThrough();
    matSnackBarSpy.openFromComponent.and.returnValue({
      onAction: () => of(void 0)
    } as MatSnackBarRef<CustomSnackBarComponent>);
    routerSpy.navigate.and.returnValue(lastValueFrom(of(true)));

    (<any>service).zoneRun(
      {
        data: { message: 'message', closeKey: 'close' } as ISnackBarData,
        duration: 1,
        panelClass: 'class',
      } as MatSnackBarConfig,
      'route');

    expect(matSnackBarSpy.openFromComponent).toHaveBeenCalledWith(CustomSnackBarComponent,
      {
        data: { message: 'message', closeKey: 'close' },
        duration: 1,
        panelClass: 'class',
      } as MatSnackBarConfig);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['route']);
  });
});
