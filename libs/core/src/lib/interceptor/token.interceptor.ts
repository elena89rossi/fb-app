import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const GOREST_TOKEN = '09bade14aaf48230c61e2f5d90ca79c7d837416953cf285176474875a7f0de7b';
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${GOREST_TOKEN}`
                }
            });

        return next.handle(request);
    }
}