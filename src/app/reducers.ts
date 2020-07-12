import * as recipeReducer from './reducers/shopncook.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    //GetRecipeDataById: recipeReducer.ShopNCookReducer;
    GetAllRecipeData:recipeReducer.ShopNCookReducer;
}

export const reducers:ActionReducerMap<AppState> = {
    GetAllRecipeData:recipeReducer.reducer
  //  GetRecipeDataById:recipeReducer.reducer
}