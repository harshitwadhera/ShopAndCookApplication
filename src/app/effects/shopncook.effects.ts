import { Effect,Actions,ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RecipeAction } from '../action/recipe.action';
import { mergeMap,map,catchError } from 'rxjs/operators';
import { RecipesService } from '../service/recipe.service';
import { Injectable } from '@angular/core';
import * as RecipeActionClass  from '../action/recipe.action';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class shopNCookEffects{
    constructor(private action:Actions,private recipeService:RecipesService){

    }

    @Effect()
    loadRecipe$ : Observable<Action> =this.action.pipe(ofType(RecipeAction.get_All_Recipe),
    mergeMap((action:RecipeActionClass.getAllRecipe) => this.recipeService.getAllRecipe().pipe(
    map((recipeData:any) => new RecipeActionClass.getAllRecipeCompleteAction(recipeData)),
    catchError(() => of(new RecipeActionClass.getAllRecipeCompleteAction('Not Found')))
    )));

    @Effect()
    loadRecipeById$ : Observable<Action> =this.action.pipe(ofType(RecipeAction.get_Recipe_Id),
    mergeMap((action:RecipeActionClass.getRecipeById) => this.recipeService.getAllRecipeById(action.payload).pipe(
    map((recipeData:any) => new RecipeActionClass.getRecipeByIdCompleteAction(recipeData)),
    catchError(() => of(new RecipeActionClass.getRecipeByIdCompleteAction('Not Found')))
    )));

    @Effect()
   postRecipe$ : Observable<Action> = this.action.pipe(ofType(RecipeAction.insert_Recipe),
   mergeMap((action:RecipeActionClass.insertRecipe) => this.recipeService.insertRecipe(action.payload).pipe(
       map((recipeData:any) => new RecipeActionClass.getAllRecipeCompleteAction(recipeData)),
       catchError(() => of(new RecipeActionClass.getRecipeByIdCompleteAction('Not Found')))
   )));



     
}