import { Recipe } from '../model/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../model/ingredient.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { mergeMap,map,catchError } from 'rxjs/operators';

@Injectable()
export class RecipesService{
    insertRecipe(payload: any) {
       return this.http.post('http://localhost:8080/insertRecipe',payload.recipe,{
        headers:this.userHeaders,
         withCredentials:true
         //,params:payload
      }).pipe(map(this.extractData.bind(this)),catchError((err) => this.handleErrorObservable(err)))
    }
    getAllRecipeById(param:String) {
      return this.http.get('http://localhost:8080/getAllRecipeById',{
        headers:this.userHeaders,
         withCredentials:true,
         params:new HttpParams().set("id",param.toString()),
      }).pipe(map(this.extractData.bind(this)),catchError((err) => this.handleErrorObservable(err)))
    }

  userHeaders =  new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
})
  
  constructor(private http:HttpClient){

  }

  getAllRecipe() {
       return this.http.get('http://localhost:8080/getAllRecipe',{
         headers:this.userHeaders,
          withCredentials:true,
       }).pipe(map(this.extractData.bind(this)),catchError((err) => this.handleErrorObservable(err)))
    }

    extractData(res:Response){
      if(res.status <200 || res.status>=300){
          throw new Error('Bad response'+res.status);
      }
      const body = res;
      return body;
  };

  handleErrorObservable(error: Response | any) {
    return Observable.throw(error.message || error);
     //throw new Error("Method not implemented.");
 }

 
 
  recipeChanged= new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe('1','A Test Recipe 1', 'This is simply a test 1', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [new Ingredient('Buns',2),new Ingredient('Onions',1)]
        ),
        new Recipe('2','A Test Recipe 2', 'This is simply a test 2', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [new Ingredient('Pizza Base',1),new Ingredient('Capsicum',1)]
        )
      ];

      recipeSelected = new EventEmitter<Recipe>();

      getRecipes(){
        return this.recipes.slice();
      }

      getSelectedRecipe(id: any) {
        return this.recipes.find(r => r.id == id);
           //return this.recipes[ id];
      }
      // getSelectedRecipes(id){
      //   return this.recipes.slice();
      // }

      // addOrUpdateRecipe(id:String,recipe:Recipe){
      //   let recipeFind =  this.getSelectedRecipe(id);
      //   if(id != undefined && id.length>0 && recipeFind != undefined){
          
      //     recipe.id=id;
      //       let index = this.recipes.indexOf(recipeFind);
      //        this.recipes[index] = recipe;
       
          

      //   }else{
      //     const idNew = this.recipes.length +1;
          
      //     recipe.id = idNew.toString();
      //     this.recipes.push(recipe);
      //   }

      //   this.recipeChanged.next(this.recipes.slice());
      // }

      deleteRecipe(selectedRecipe: Recipe) {
       let RecipeFind = this.getSelectedRecipe(selectedRecipe.id);
        let index = this.recipes.indexOf(RecipeFind);
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }
      
}

