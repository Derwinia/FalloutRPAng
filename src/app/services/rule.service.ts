import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RuleCreateModel, RuleModel , RuleOrderModel, RuleUpdateModel} from '../models/rule.model';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(
    private _http: HttpClient
  ) { }

  createRule(newRule : RuleCreateModel){
    if(newRule){
      this._http.post<void>(environment.base_url + '/Rule/Rule-Create', newRule).subscribe();
    }
  }

  getRules(): Observable<RuleModel[]> {
    return this._http.get<RuleModel[]>(environment.base_url + '/Rule/Rule-List');
  }

  modifyRule(rule : RuleUpdateModel){
    this._http.patch(environment.base_url + '/Rule/Rule-Update', rule).subscribe();
  }

  modifyRuleOrder(rules : RuleOrderModel){
    this._http.patch(environment.base_url + '/Rule/Rule-Order-Update', rules).subscribe();
  }

  deleteRule(id : string): Observable<void>{
    return this._http.delete<void>(environment.base_url + '/Rule/Rule-Delete/'+id);
  }
}
