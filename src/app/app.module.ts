import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OpenDropdownDirective } from './open-dropdown.directive';
import { RecipesService } from './service/recipe.service';
import { ShoppingListService } from './service/shoppingList.service';
import { RecipeHomeComponent } from './recipes/recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { shopNCookEffects } from './effects/shopncook.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { reducer } from './reducers/shopncook.reducer';
import { HttpClientModule } from '@angular/common/http';

export function clearState(reducer){
  return function (state,action){
    //if(action.type == LOGOUT_S)
    return reducer(state,action);
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    OpenDropdownDirective,
    RecipeHomeComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers,{metaReducers:[clearState]}),
    EffectsModule.forRoot([
      shopNCookEffects
    ]),
  ],
  providers: [RecipesService,ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
