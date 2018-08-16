import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
 
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
 
    constructor() { }
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        let users: any[] = [
            {'username': 'suvadip', 'password': 'suvadip123'},
            {'username': 'gosh', 'password': 'gosh123'}
        ];
 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {
 
            // get users
            if (request.url.endsWith('/api/login') && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: { message: 'Successfully Login'} }));   
            }
 
            // create user
            if (request.url.endsWith('/api/login') && request.method === 'POST') {
                // get new user object from post body
                let loginData = request.body;
 
                // validation
                let validUser = users.some(user => { 
                    return user.username === loginData.username && user.password === loginData.password;
                });

                if (!validUser) {
                    return Observable.throw('Username "' + loginData.username + '" is not valid');
                }
 
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200, body: { message: 'Successfully Login'} }));
            }
 
            // pass through any requests not handled above
            return next.handle(request);
             
        })
 
        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}
 
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};