import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Data {
  purchaseDate: Date;
  assetType: string;
  purchaseQuantity:number;
  purchasePrice:number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://66e5c2d45cc7f9b6273e4aab.mockapi.io/api/v1/portfolio_asset';

  constructor(private http: HttpClient) { }

  // Method to get data from the API
  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiUrl)
      .pipe(
        map((response: any) => response)
      );
  }

  // Example method to get a single item by ID
  getDataById(id: number): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/${id}`);
  }

  // Example method to post data
  postData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.apiUrl, data);
  }

  // Example method to delete data
  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
