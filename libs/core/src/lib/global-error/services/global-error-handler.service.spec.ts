import { TestBed } from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { SnackbarNotificationsService } from '../../notifications/services/snackbar-notifications.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;
  let notificationServiceSpy: SpyObj<SnackbarNotificationsService>;
  beforeEach(() => {
    notificationServiceSpy = jasmine.createSpyObj('SnackbarNotificationsService', ['showError']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SnackbarNotificationsService,
          useValue: notificationServiceSpy
        }
      ]
    });
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test handleError', () => {
    expect(service).toBeTruthy();
    const err: Error = {
      message: 'message',
      stack: 'stack',
      name: 'name'
    };
    service.handleError(err);
    expect(notificationServiceSpy.showError).toHaveBeenCalledOnceWith(err.message);
  });

  it('should test handleError', () => {
    expect(service).toBeTruthy();
    const err: HttpErrorResponse = {
      message: 'message',
      error: 'error',
    } as HttpErrorResponse;
    service.handleError(err);
    expect(notificationServiceSpy.showError).not.toHaveBeenCalledOnceWith(err.error);
  });
});
