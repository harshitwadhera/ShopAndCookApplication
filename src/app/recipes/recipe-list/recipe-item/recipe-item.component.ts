import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../../model/recipe.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RecipesService } from 'src/app/service/recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.sass']
})
export class RecipeItemComponent implements OnInit {

  @Input("recipe") recipe:Recipe;

  //@Output() recipeSelected = new EventEmitter<Recipe>();
  
  RecipeForm: FormGroup;
  constructor(private fb:FormBuilder,private recipeServce:RecipesService) {
    this.RecipeForm = fb.group({
      'name':['',Validators.required],
      'description':['',Validators.required],
      'ImagePath':['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  recipeDetails(recipe:Recipe){
    this.recipeServce.recipeSelected.emit(recipe);
    console.log(recipe);  
  }

}
