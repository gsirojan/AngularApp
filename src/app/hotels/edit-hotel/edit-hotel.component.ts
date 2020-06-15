import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HotelService } from '@app/_services/hotel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  
})
export class EditHotelComponent implements OnInit {

  editHotelForm: FormGroup;
  countries: any[] = [];
  cities: any[] = [];
  HotelId: number;
  hotelData: any;
  event: EventEmitter<any> = new EventEmitter();

  constructor(private builder: FormBuilder, private hotelService: HotelService, private bsModalRef: BsModalRef) {
    this.editHotelForm = this.builder.group({
      Country: new FormControl(null, []),
      HotelName: new FormControl('', []),
      Description: new FormControl('', []),
      Adddress: new FormControl('', []),
      City: new FormControl('', []),
      HotelId: new FormControl('', [])
    });


    this.hotelService.getCountryList().subscribe(data => {
      Object.assign(this.countries, data);
    }, error => { console.log('Error while gettig category data.'); });

    this.hotelService.hotelIdData.subscribe(data => {
     
      this.HotelId = data;
      if (this.HotelId !== undefined) {
        this.hotelService.getById(this.HotelId).subscribe(data => {
          this.hotelData = data;
          
          if (this.editHotelForm!=null && this.hotelData!=null) {
            this.HotelId=this.hotelData.HotelId;
            this.editHotelForm.controls['Country'].setValue(this.hotelData.CountryID);
            this.editHotelForm.controls['HotelId'].setValue(this.hotelData.HotelId);
            this.BindCity(this.hotelData.CountryID);
            this.editHotelForm.controls['City'].setValue(this.hotelData.CityId);
            this.editHotelForm.controls['HotelName'].setValue(this.hotelData.HotelName);
            this.editHotelForm.controls['Description'].setValue(this.hotelData.Description);
            this.editHotelForm.controls['Adddress'].setValue(this.hotelData.Adddress);
          }
        }, error => { console.log("Error while gettig post details") });
      }
    });
  }
  BindCity(countryId : number){  
    this.hotelService.CityByCountry(countryId).subscribe(data => {
       
      Object.assign(this.cities, data);
    }, error => { console.log('Error while gettig category data.'); });  
 }
  onHotelEditFormSubmit() {
    let hotelData = {
      'HotelId': Number(this.HotelId),
      'HotelName': this.editHotelForm.get('HotelName').value,
      'Description': this.editHotelForm.get('Description').value,
      'CityId': Number(this.editHotelForm.get('City').value),
      'Adddress': this.editHotelForm.get('Adddress').value,
    };
   console.log(hotelData);
   console.log(this.HotelId);
    this.hotelService.update(this.HotelId,hotelData).subscribe(data => {      
        this.event.emit('OK');
        this.bsModalRef.hide();      
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {

  }

}