import { NgModule } from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { HotelsRoutingModule } from './hotels-routing.module';
import { LayoutComponent } from './layout.component';

import { ListComponent } from './list.component';
import { CellCustomComponent } from './renderer/cell-custom.component';
import { AddNewHotelComponent } from './add-new-hotel/add-new-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { DeleteHotelComponent } from './delete-hotel/delete-hotel.component';
import { HotelService } from '@app/_services/hotel.service';
// import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HotelsRoutingModule,
        ModalModule.forRoot(),
         AgGridModule.withComponents(
            [ListComponent]
        )
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddNewHotelComponent,
        EditHotelComponent,
        DeleteHotelComponent,
        CellCustomComponent
        
    ],
    providers: [BsModalService,HotelService],
  
    entryComponents:[AddNewHotelComponent, EditHotelComponent, DeleteHotelComponent,CellCustomComponent]
})
export class HotelsModule { }