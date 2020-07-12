import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appOpenDropdown]'
})
export class OpenDropdownDirective {
@HostBinding('class.open') open=false;

  constructor(private elementref:ElementRef,private render:Renderer2) { }

  // @HostListener('mouseenter2') mouseClick (eventData:Event){
    
  //   const className = this.elementref.nativeElement.className;
    
  //   if(className.includes("open")){
  //     this.render.removeClass(this.elementref.nativeElement,"open"); 
  //   }else{
  //     this.render.addClass(this.elementref.nativeElement,"open");  
  //   }
  // }   MY Done

  // @HostListener('click')  togleOpenClass(){
  //   this.open = !this.open;
  // }  IMP

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.open = this.elementref.nativeElement.contains(event.target) ? !this.open : false;
  }

  

}