import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingListService } from '../service/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {

 ingredients: Ingredient[]=[];
  constructor(private shopService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();
    this.shopService.ingrediantsChanges.subscribe(
      (ingredient: Ingredient[]) => { this.ingredients = ingredient;}
    );  
  }

  addIngredient(ingredient:Ingredient){
   // console.log(this.ingredients);
  }
  onEditItem(i:number){
    this.shopService.shoppingListEdit.next(i);
  }
}


