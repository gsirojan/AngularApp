import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HotelService } from '@app/_services/hotel.service';

@Component({
  selector: 'app-delete-hotel',
  templateUrl: './delete-hotel.component.html',
 
})
export class DeleteHotelComponent implements OnInit {

  HotelId: number;
  HotelName: string;
  event: EventEmitter<any> = new EventEmitter();
  
  constructor(private bsModalRef: BsModalRef, private hotelService: HotelService) {

  }

  deleteHotel(HotelId: number) {
    this.hotelService.delete(HotelId).subscribe();
    this.event.emit('OK');
    this.bsModalRef.hide();
  }

  onClose() {
    this.bsModalRef.hide();

  }
  ngOnInit() {
  }
}