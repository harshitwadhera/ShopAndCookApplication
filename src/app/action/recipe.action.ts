
import { Action } from '@ngrx/store';

export enum RecipeAction {
    get_All_Recipe = "[Colletion] get all Recipe Map",
    get_All_Recipe_Complete_Action = "[Collection] get all Recipe Map Complete Action",
    get_Recipe_Id = "[Colletion] get Recipe by Id Map",
    get_Recipe_Id_Complete_Action = "[Collection] get Recipe by Id Map Complete Action",
    insert_Recipe="Inserting Recipe"
   
}

export class getAllRecipe implements Action{
public readonly type = RecipeAction.get_All_Recipe;
constructor(public payload:boolean){}
}

export class getAllRecipeCompleteAction implements Action{
    public readonly type = RecipeAction.get_All_Recipe_Complete_Action;
    constructor(public payload:any){    
    }    
}

export class getRecipeById implements Action{
        public readonly type = RecipeAction.get_Recipe_Id;
        constructor(public payload:String){       
        }    
}
        
export class getRecipeByIdCompleteAction implements Action{
            public readonly type = RecipeAction.get_Recipe_Id_Complete_Action;
            constructor(public payload:any){            
        }
}

export class insertRecipe implements Action{
    public readonly type = RecipeAction.insert_Recipe;
    constructor(public payload:any){       
    }    
}

    export type AllAction = getAllRecipe | getAllRecipeCompleteAction |
    getRecipeById | getRecipeByIdCompleteAction | insertRecipe