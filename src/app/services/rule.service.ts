import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { RuleCreateModel, RuleFolderCreateModel, RuleModel , RuleOrderModel, RuleUpdateModel} from '../models/rule.model';


@Injectable({
  providedIn: 'root'
})
export class RuleService {

  private actualPath! : string;
  private realPath! : string;
  private tempPath! : string[];

  private dataSubject = new Subject<RuleModel[]>();
  data$ = this.dataSubject.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  getPath():string{
    return this.actualPath
  }

  setPath(path : string){
    this.actualPath = path
    this.realPath = path
    this.getRulesFromPath().subscribe(x => this.sendData(x));
  }

  furtherPath(path : string){
    this.actualPath = path
    this.realPath = this.realPath+'/'+path
    this.getRulesFromPath().subscribe(x => this.sendData(x));
  }

  previousPath():boolean{
    this.tempPath = this.realPath.split('/')
    if(this.tempPath.length == 1){
      return false
    }
    this.realPath = this.tempPath[0]
    for(let i=1; i<this.tempPath.length-1; i++){
      this.realPath = this.realPath+'/'+this.tempPath[i]
    }
    this.actualPath = this.tempPath[this.tempPath.length-2]
    this.getRulesFromPath().subscribe(x => this.sendData(x));
    return true
  }

  private getRulesFromPath(): Observable<RuleModel[]> {
    return this._http.get<RuleModel[]>(environment.base_url + '/Rule/Rule-From-Path/'+ this.actualPath);
  }

  sendData(data: RuleModel[]) {
    this.dataSubject.next(data);
  }

  createRule(newRule : RuleCreateModel){
    if(newRule){
      this._http.post<void>(environment.base_url + '/Rule/Rule-Create', newRule).subscribe();
    }
  }

  createFolderRule(newFolderRule : RuleFolderCreateModel){
    if(newFolderRule){
      this._http.post<void>(environment.base_url + '/Rule/Rule-Folder-Create', newFolderRule).subscribe();
    }
  }

  getRules(): Observable<RuleModel[]> {
    return this._http.get<RuleModel[]>(environment.base_url + '/Rule/Rule-List');
  }

  modifyRule(rule : RuleUpdateModel){
    if(rule){
      this._http.patch(environment.base_url + '/Rule/Rule-Update', rule).subscribe();
    }
  }

  modifyRuleOrder(rules : RuleOrderModel){
    this._http.patch(environment.base_url + '/Rule/Rule-Order-Update', rules).subscribe();
  }

  deleteRule(id : string): Observable<void>{
    return this._http.delete<void>(environment.base_url + '/Rule/Rule-Delete/'+id);
  }
}
