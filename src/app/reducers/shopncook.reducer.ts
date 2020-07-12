import { Action } from 'rxjs/internal/scheduler/Action';
import { AllAction, RecipeAction } from '../action/recipe.action';


export class ShopNCookReducer{
    recipeData:any;
    recipeDataById:any;

    public constructor(data:any)
    {
        this.recipeData=data.recipe;
        this.recipeDataById = data.recipeDataById;
    }
}


export const initialState = () =>{
    return new ShopNCookReducer ({
        recipeData:[],
        recipeDataById:[]
    })
}



export function reducer(state = initialState(),action:AllAction):ShopNCookReducer{

    switch(action.type){
        case RecipeAction.get_All_Recipe:{
            return state;
        }
        case RecipeAction.get_All_Recipe_Complete_Action:{
            return Object.assign({},state ,{
                
                recipeData:action.payload 
            });           
        }

        case RecipeAction.get_Recipe_Id:{
            return state;
        }
        case RecipeAction.get_Recipe_Id_Complete_Action:{
            return Object.assign({},state ,{
                
                recipeDataById:action.payload 
            });           
        }
        

    }

}