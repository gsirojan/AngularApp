import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HotelService } from '@app/_services/hotel.service';
import { DeleteHotelComponent } from '../delete-hotel/delete-hotel.component';
@Component({
    selector: 'app-custom-button',
    templateUrl: './cell-custom.component.html'
  })
export class CellCustomComponent implements OnInit {
    data: any;
    params: any;
    bsModalRef: BsModalRef;
    constructor(private http: HttpClient, private router: Router,private bsModalService: BsModalService,private hotelService: HotelService) {}
  
    agInit(params) {
      this.params = params;
      this.data = params.value;
    }
  
    ngOnInit() {}
  
    editRow() {
      let rowData = this.params;
      console.log(rowData);
      this.editHotel(rowData.data.HotelId);
      let i = rowData.rowIndex;
     
    }
    editHotel(HotelId: number) {
        //this.hotelService.update(HotelId);
        this.hotelService.changeHotelId(HotelId);
        this.bsModalRef = this.bsModalService.show(EditHotelComponent);
       
        this.bsModalRef.content.event.subscribe(result => {
          if (result == 'OK') {
            setTimeout(() => {
              this.getHotels();
            }, 200);
          }
        });
      }
      getHotels() {
        this.hotelService.getAll().subscribe(data => {
            this.hotelService.updateHotelList(data)
          //Object.assign(this.hotels, data);
        }, error => {
          console.log("Error while getting posts ", error);
        });
      }
    deleteRow() {
      let rowData = this.params;
      this.deleteHotel(rowData.data.HotelId,rowData.data.HotelName);
      
    }
    deleteHotel(HotelId: number, HotelName: string) {
        this.bsModalRef = this.bsModalService.show(DeleteHotelComponent);
        this.bsModalRef.content.HotelId = HotelId;
        this.bsModalRef.content.HotelName = HotelName;
        this.bsModalRef.content.event.subscribe(result => {
          console.log("deleted", result);
          if (result == 'OK') {
            setTimeout(() => {
              //this.hotels=[];
              this.getHotels();
            }, 200);
          }
        });
      }
  }