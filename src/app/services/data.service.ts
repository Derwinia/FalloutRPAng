import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { DataModel } from '../models/data.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient
  ) { }

  getData(categorie : number): Observable<DataModel[]> {
    return this._http.get<DataModel[]>(environment.base_url + '/Data/Data-List-Categorie/'+categorie);
  }

}
