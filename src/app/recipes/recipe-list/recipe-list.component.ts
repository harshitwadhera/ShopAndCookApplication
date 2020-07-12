import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipesService } from 'src/app/service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as globalReducer from 'src/app/reducers';
import * as RecipeActionClass  from '../../action/recipe.action';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {

 // @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  data: any;
  allRecipeData: any;
  constructor(private recipeService:RecipesService,private router:ActivatedRoute,private routes:Router,
    private recipeData:Store<globalReducer.AppState>) {

      this.recipeData.dispatch(new RecipeActionClass.getAllRecipe(true));

      this.recipeData.select(x => x.GetAllRecipeData).subscribe(
        my => {
          if(my!= undefined && my.recipeData != undefined){
          //  console.log(y.recipeData);
            this.recipes=my.recipeData;
          }
        }
      );
     }

  ngOnInit(): void {
   this.recipes = this.recipeService.getRecipes();
   this.recipeService.recipeChanged.subscribe(
     (recipe:Recipe[]) =>{
      this.recipes=recipe;
     }
   );

  

 
  console.log(this.allRecipeData);

  }

  // onRecipeSelected(event:Recipe){
  //   this.recipeService.recipeSelected.emit(event);
    
  // }

  onNewAddRecipe()
  {
    this.routes.navigate(['/Recipes/add'],{relativeTo:this.router})
  }

}
