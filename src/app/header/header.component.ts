import { Component, OnInit, Output,EventEmitter, ElementRef } from '@angular/core';
import { OpenDropdownDirective } from '../open-dropdown.directive';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<String>();

  constructor() {
   
   }

  ngOnInit(): void {
  }

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }

}
