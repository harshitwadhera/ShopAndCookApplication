import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';


const routes: Routes = [
  {
    path:"",redirectTo:"/Recipes",pathMatch:"full"
    },
  {
  path:"Recipes",component:RecipesComponent ,children:[
    { path:"",component:RecipeHomeComponent} ,
    { path:"add",component:RecipeEditComponent } ,
    { path:":id",component:RecipeDetailComponent } ,
  
    { path:":id/edit",component:RecipeEditComponent } ,
    
  ]
  },
  {
    path:"shoppinglist",component:ShoppingListComponent
    },
    {
      path:"**",component:ShoppingListComponent
      }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
