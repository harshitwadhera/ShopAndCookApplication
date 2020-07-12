import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';
import { ShoppingListService } from 'src/app/service/shoppingList.service';
import { ActivatedRoute, Params, Routes, RouterModule, Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { RecipesService } from 'src/app/service/recipe.service';
import * as RecipeActionClass  from '../../action/recipe.action';
import { Store } from '@ngrx/store';
import * as globalReducer from 'src/app/reducers';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe:any;
  id: any;
post:boolean=false;
  constructor(private shopService:ShoppingListService,private router:ActivatedRoute,private routes:Router
    ,private recipeServce:RecipesService,private recipeStore:Store<globalReducer.AppState>) {
     

     }

  ngOnInit(): void {
    console.log("this is details componenet");
  //  this.id = this.router.snapshot.params['id'];
  
   // console.log(this.selectedRecipe.ingredients);   

    
   this.router.params.subscribe(
    (param:Params) => {
      this.id = param['id'];
      if(this.id!=null){
      this.recipeStore.dispatch(new RecipeActionClass.getRecipeById(this.id));

      this.recipeStore.select(x => x.GetAllRecipeData).subscribe( my => {
        if(my != undefined && my.recipeDataById != undefined && my.recipeDataById.ingredient != undefined){
          this.selectedRecipe=  my.recipeDataById   
          console.log(this.selectedRecipe.ingredient);  
          this.post =true;
          //this.selectedRecipe.ingredient.push(...my.recipeDataById.ingredient);
      
        }
         
      } // this.recipeServce.getSelectedRecipe(this.id);      
    ) 
    }  
}
  );
    
}
 // this.selectedRecipe = this.recipeServce.getSelectedRecipe(this.id);;


  sendToShop(){
    console.log(this.selectedRecipe.ingredient);
    this.shopService.addIngredientsToList(this.selectedRecipe.ingredient);
//this.shopService.ingrediantsChanges.emit(this.selectedRecipe.ingredients);
  }

  editSelectedRecipe(){
    this.routes.navigate(['edit'],{relativeTo:this.router})
  }

  deleteARecipe(selectedRecipe:Recipe){
this.recipeServce.deleteRecipe(selectedRecipe);
this.routes.navigate(['../'],{relativeTo:this.router});
  }
}
