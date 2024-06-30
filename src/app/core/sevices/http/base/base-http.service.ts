import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseModelInterface} from "../../../models/http/base/base.model";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService <T extends BaseModelInterface>{

  protected apiUrl: string = `${environment.apiUrl}/api`;
  protected suffix: string = '';
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  protected get endpointUrl(): string {
    return `${this.apiUrl}/${this.suffix}`;
  }

  constructor(protected http: HttpClient) {
  }

  setSuffix(suffix: string) {
    this.suffix = suffix;
  }

  setApiUrl(url: string) {
    this.apiUrl = url;
  }

  public index(params: any = {}): Observable<any> {
    return this.http.get(`${this.endpointUrl}?${objectToQueryString(params)}`, this.httpOptions).pipe();
  }

  get(id: number, params: any = {}): Observable<T> {
    return this.http.get<T>(`${this.endpointUrl}/${id}?${objectToQueryString(params)}`, this.httpOptions).pipe();
  }

  create(data: T, params: any = {}): Observable<T> {
    return this.http.post<T>(`${this.endpointUrl}?${objectToQueryString(params)}`, data, this.httpOptions).pipe();
  }

  update(id: number, data: T, params: any = {}): Observable<T> {
    return this.http.put<T>(`${this.endpointUrl}/${id}?${objectToQueryString(params)}`, data, this.httpOptions).pipe();
  }

  delete(id: number, params: any = {}): Observable<T> {
    return this.http.delete<T>(`${this.endpointUrl}/${id}?${objectToQueryString(params)}`, this.httpOptions).pipe();
  }

}
