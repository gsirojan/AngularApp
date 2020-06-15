import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HotelService } from '@app/_services/hotel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
//http://www.mukeshkumar.net/articles/angular/crud-operations-in-angular-with-typescript-using-ngx-bootstrap
@Component({
  selector: 'app-add-new-hotel',
  templateUrl: './add-new-hotel.component.html',
  
})
export class AddNewHotelComponent implements OnInit {

addNewHotelForm: FormGroup;
  countries: any[] = [];
  cities: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(private builder: FormBuilder, private hotelService: HotelService, private bsModalRef: BsModalRef) {
    this.addNewHotelForm = this.builder.group({
      Country: new FormControl(null, []),
      City: new FormControl(null, []),
      HotelName: new FormControl('', []),
      Description: new FormControl('', []),
      Adddress: new FormControl('', []),
    });
   
    this.hotelService.getCountryList().subscribe(data => {
        console.log(data);
      Object.assign(this.countries, data);
    }, error => { console.log('Error while gettig category data.'); });
  }

  onHotelFormSubmit(){
    let hotelData = {
      'HotelId':0,
      'HotelName': this.addNewHotelForm.get('HotelName').value,
      'Description': this.addNewHotelForm.get('Description').value,
      'CityId': Number(this.addNewHotelForm.get('City').value),
      'CountryId': Number(this.addNewHotelForm.get('Country').value),
      'Adddress': this.addNewHotelForm.get('Adddress').value,
    };
  
    this.hotelService.register(hotelData).subscribe(data=>{
     console.log("QQQ");
     console.log(data);
      if(data!=null && data["HotelId"]>0){
        console.log("ZZZZ");
        this.event.emit('OK');
        this.bsModalRef.hide();
      }
    });
  }
  BindCity(countryId : number){  
    this.hotelService.CityByCountry(countryId).subscribe(data => {
       
      Object.assign(this.cities, data);
    }, error => { console.log('Error while gettig category data.'); });  
 }
  onClose(){
    this.bsModalRef.hide();
  }

  ngOnInit() {
  }

}