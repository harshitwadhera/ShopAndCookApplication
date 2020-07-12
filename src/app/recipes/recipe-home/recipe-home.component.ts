import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './recipe-home.component.html',
  styleUrls: ['./recipe-home.component.sass']
})
export class RecipeHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("test recipe home component");
  }

}
