import { Ingredient } from '../model/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export class ShoppingListService{
    shoppingListEdit=new Subject<number>();
    private  ingredients: Ingredient[]=[
        new Ingredient("TEst",5)
    ];

    ingrediantsChanges = new EventEmitter<Ingredient[]>();

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredients(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingrediantsChanges.emit(this.ingredients.slice());
        console.log(this.ingredients);
    }

    addIngredientsToList(ingredient:Ingredient[]){
        this.ingredients.push(...ingredient);
        this.ingrediantsChanges.emit(this.ingredients.slice());
        console.log(this.ingredients);
    }

    getIngredientsWithIndex(i:number){
        return this.ingredients[i];
    }

    updateIngtredient(i:number,ingredient:Ingredient){
         this.ingredients[i]=ingredient;
         this.ingrediantsChanges.next(this.ingredients.slice());
    }

    deleteIngreDient(i:number){
         this.ingredients.splice(i,1);
        this.ingrediantsChanges.next(this.ingredients.slice());
    }
}