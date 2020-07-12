import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/service/shoppingList.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from 'src/app/service/recipe.service';
import { Recipe } from 'src/app/model/recipe.model';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient.model';
import * as RecipeActionClass  from '../../action/recipe.action';
import { Store } from '@ngrx/store';
import * as globalReducer from 'src/app/reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {
 
  id: any;
  selectedRecipe: Recipe;
  editMode: boolean=false;
  recipeForm: FormGroup;
 // ingredients =  new FormArray([]);
  constructor(private shopService:ShoppingListService,private Arouter:ActivatedRoute,private router:Router
    ,private recipeServce:RecipesService,private fb:FormBuilder,private recipeStore:Store<globalReducer.AppState>) { 

      this.recipeForm = this.fb.group({
        id:[''],
        name:['',Validators.required],
        imagePath:['',Validators.required],
        description:['',Validators.required],
        ingredient:this.fb.array([])
        

      })
    }

  ngOnInit(): void {
    console.log("this is edit componenet");
    this.recipeForm.reset();
    this.Arouter.params.subscribe(
      (param:Params) => {
        this.id = param['id'];
        this.editMode = this.id != null;
       
        if(this.editMode){
         // this.recipeStore.dispatch(new RecipeActionClass.getRecipeById(this.id));
          this.recipeStore.select(x => x.GetAllRecipeData).subscribe( my => {
            if(my!=undefined && my.recipeDataById != undefined && my.recipeDataById.ingredient != undefined){
              this.selectedRecipe=  my.recipeDataById   
              console.log(this.selectedRecipe.ingredient);   
              this.recipeForm.patchValue({
  
                name:this.selectedRecipe.name,
                imagePath:this.selectedRecipe.imagePath,
               
                description:this.selectedRecipe.description,
                
              
              })    
              this.setValueOfIngredient(this.selectedRecipe.ingredient);    
          
            }      
          })          
        }else{
          alert("Something went Wrong please try again..")
        }

        if(this.selectedRecipe === undefined){
          alert("Something went Wrong please try again..");
        }
         
        // this.selectedRecipe =  this.recipeServce.getSelectedRecipe(this.id);
       
      }
    )
    
    
  }
  setValueOfIngredient(ingredients: Ingredient[]) {
    let controls = (<FormArray>this.recipeForm.get('ingredient')['controls'])
  for (let ingredient of ingredients) {
    let fg = this.fb.group({
      name:[ingredient.name],
      amount:[ingredient.amount]
    });
  controls.push(
   fg
  )
 
  
}

  }

  ingredientForm(ingredient: Ingredient): any {

    if(ingredient != undefined){

      
      return this.fb.group({
        'name':[ingredient.name],
        'amount':[ingredient.amount]
    
       })
    }else{
      return this.fb.group({
        name:['',Validators.required],
        amount:['',Validators.required],  
    
       })
    }
  
  }

  onSubmit(){
    console.log(this.recipeForm.controls);
  
    let controls= this.recipeForm.controls;
    let ingredient:Ingredient[]=[];// new Array<Ingredient>;
    for (let control of this.recipeForm.get('ingredient')['controls']) {
      console.log(control);
      // ...
      ingredient.push(new Ingredient(control.controls.name.value,control.controls.amount.value))
  }
   
   let recipe = new Recipe(this.id,controls.name.value,controls.description.value,controls.imagePath.value,ingredient)
  // this.recipeServce.addOrUpdateRecipe(this.id,this.recipeForm.value);
  // this.recipeForm.setValue({"id":this.id});
  if(this.id!= null){
    this.recipeForm.patchValue({
      id:this.id
    })
  }
   
   let formdata=
   {recipe:JSON.stringify(this.recipeForm.value)};
   this.recipeStore.dispatch(new RecipeActionClass.insertRecipe(formdata));
   this.editMode=false;
   this.router.navigate(['/Recipes'],{relativeTo:this.Arouter});
  }

  getForm(form){
    return form.controls.ingredient.controls;
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['../'],{relativeTo:this.Arouter})
  }

  onAddIngredient(){
    //this.recipeForm.get('ingredients').pus
    console.log(this.recipeForm);
   (<FormArray> this.recipeForm.controls['ingredient']).push(this.ingredientForm(undefined));
  }

  onDeleteIngredient(i){
    (<FormArray> this.recipeForm.controls['ingredient']).removeAt(i);
  }


}
