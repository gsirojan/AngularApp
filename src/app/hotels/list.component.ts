import { Component, OnInit,ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { HotelService } from '@app/_services/hotel.service';
import { AgGridAngular } from 'ag-grid-angular';
import { AddNewHotelComponent } from './add-new-hotel/add-new-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { DeleteHotelComponent } from './delete-hotel/delete-hotel.component';
import { ButtonRendererComponent } from './renderer/button-renderer.component';
import { CellCustomComponent } from './renderer/cell-custom.component';
@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular;
    bsModalRef: BsModalRef;
    frameworkComponents: any;
    rowDataClicked1 = {};
    hotels = null;
    columnDefs = [
        {headerName: 'Hotel Name', field: 'HotelName',sortable: true, filter: 'agTextColumnFilter' },
        {headerName: 'City', field: 'CityName',sortable: true,  filter: 'agTextColumnFilter', },
        {headerName: 'Country', field: 'CountryName',sortable: true, filter: true },
        {headerName: 'Address', field: 'Adddress',sortable: true, filter: true},
        {
          headerName: 'Actions',
          cellRendererFramework: CellCustomComponent
        }
       
    ];  

   
    constructor(private hotelService: HotelService,private bsModalService: BsModalService) {

      
    }
    onBtnClick1(e) {
      this.rowDataClicked1 = e.rowData;
    }

    ngOnInit() {
    
        this.hotelService.getAll()
            .pipe(first())
            .subscribe(hotels => this.hotelService.updateHotelList(hotels));
        
    }
    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.HotelName + ' ' + node.Adddress).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
    getHotels() {
        this.hotelService.getAll().subscribe(data => {         
          this.hotelService.updateHotelList(data)
          //this.hotels=data;           
         // Object.assign(this.hotels, data);
        }, error => {
          console.log("Error while getting posts ", error);
        });
      }
    addNewHotel() {
        this.bsModalRef = this.bsModalService.show(AddNewHotelComponent);
        
        this.bsModalRef.content.event.subscribe(result => {
         

          if (result == 'OK') {
            this.getHotels();
          }
        });
      }
     
      
    
}