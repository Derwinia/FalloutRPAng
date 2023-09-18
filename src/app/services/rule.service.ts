import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RuleModel } from '../models/rule.model';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(
    private _http: HttpClient
  ) { }

  getRules(): Observable<RuleModel[]> {
    return this._http.get<RuleModel[]>(environment.base_url + '/Rule/List')
  }
}
