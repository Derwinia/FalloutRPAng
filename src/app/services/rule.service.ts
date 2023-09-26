import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RuleModel , RuleUpdateModel} from '../models/rule.model';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

  updateRule? : RuleUpdateModel;

  constructor(
    private _http: HttpClient
  ) { }

  getRules(): Observable<RuleModel[]> {
    return this._http.get<RuleModel[]>(environment.base_url + '/Rule/List');
  }

  changeRule(rule : RuleModel){
    this.updateRule = {id : rule.id, name : rule.name, shortDescription : rule.shortDescription, description : rule.description};

    this._http.patch(environment.base_url + '/Rule/Update-Rule', this.updateRule).subscribe();
  }
}
