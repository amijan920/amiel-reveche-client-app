import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Greeting } from './greeting';

@Injectable()
export class GreetingService {
  // TODO move data source to back-end service
   private greetingsUrl = 'assets/data/greetings.json';
   constructor(private httpClient: HttpClient) {}

   getGreetings(): Observable<Greeting[]> {
     return this.httpClient.get<Greeting[]>(this.greetingsUrl);
   }
}
