import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipesService } from '../service/recipe.service';
import { Store } from '@ngrx/store';
import * as globalReducer from 'src/app/reducers';
import { RecipeAction } from '../action/recipe.action';
import * as RecipeActionClass  from '../action/recipe.action';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.sass']
})
export class RecipesComponent implements OnInit {
 selectedRecipe:Recipe;


  constructor(private recipeService:RecipesService,private recipeData:Store<globalReducer.AppState>) { 
    
  }

  ngOnInit() {
    console.log('Recipe component');
    
    this.recipeService.recipeSelected.subscribe(
      (MyselectedRecipe:Recipe)=> this.selectedRecipe=MyselectedRecipe
      );

      this.recipeData.dispatch(new RecipeActionClass.getAllRecipe(true));
  }

  onRecipeSelected(event){
    console.log(event);
    
  }

}
