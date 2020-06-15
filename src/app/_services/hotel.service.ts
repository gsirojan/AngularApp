import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Hotel } from '@app/_models/hotel';
import { Country } from '@app/_models/country';
import { City } from '@app/_models/city';

@Injectable({ providedIn: 'root' })
export class HotelService {
    private hotelSubject: BehaviorSubject<Hotel>;
    public hotel: Observable<Hotel>;
    hotelIdSource = new  BehaviorSubject<number>(0);
    hotelIdData: any;
    listCity: City[];  

    hotels : Hotel[];
  
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.hotelSubject = new BehaviorSubject<Hotel>(JSON.parse(localStorage.getItem('Hotel')));
        this.hotel = this.hotelSubject.asObservable();
        this.hotelIdData= this.hotelIdSource.asObservable();
    }

    public get hotelValue(): Hotel {
        return this.hotelSubject.value;
    }

    

   

    register(hotel: Hotel) {
       
        return this.http.post(`${environment.apiUrl}/hotels`, hotel);
    }

    getAll() {
        return this.http.get<Hotel[]>(`${environment.apiUrl}/hotels`);
    }
    getCountryList() {
        return this.http.get<Country[]>(`${environment.apiUrl}/countries`);
    }
    CityByCountry(countryID:number) {  
        return this.http.get<City[]>(`${environment.apiUrl}/countries/CityDetails/${countryID}`);  
       }

    getById(id: number) {
        return this.http.get<Hotel>(`${environment.apiUrl}/hotels/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/hotels/${id}`, params);
    }
    updateHotelList(data)
    {
        this.hotels=data;
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/hotels/${id}`);
    }
    changeHotelId(hotelId: number){
        this.hotelIdSource.next(hotelId);
    }
  
}