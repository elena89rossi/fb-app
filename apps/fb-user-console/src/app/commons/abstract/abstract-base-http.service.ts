import { HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { environment } from '../../../environments/environment.production';

export abstract class AbstractBaseHttpService {
  protected constructor(private controllerName: string) {}
  
  public readonly httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      observe: 'response',
    }),
  } as HttpParamsOptions;

  public getBaseUrl(): string {
    return environment.baseUrl;
  }

  public getControllerBaseUrl(): string {
    return this.getBaseUrl() + this.controllerName;
  }
}
