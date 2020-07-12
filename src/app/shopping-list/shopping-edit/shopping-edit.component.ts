import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/model/ingredient.model';
import { ShoppingListService } from 'src/app/service/shoppingList.service';
import { AppModule } from 'src/app/app.module';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppngForm :NgForm;
  shoppingEditForm: any;
  ingredients :Ingredient;
  form: NgForm;
  name:String;
  editMode: boolean=false;
  editIndex: number=-1;
 // @Output() ingredients = new EventEmitter<Ingredient>();

  constructor(private fb:FormBuilder,private shopService:ShoppingListService) { 

    this.shoppingEditForm = fb.group({
      'nameInput':['',Validators.required],
      'amountInput':['',Validators.required]
    })
  }

  ngOnInit(): void {

    if(this.shopService.shoppingListEdit != undefined){
      this.shopService.shoppingListEdit.subscribe(
        (index:number) => {
          this.editMode=true;
          this.editIndex=index;
          this.ingredients= this.shopService.getIngredientsWithIndex(index);
          this.shoppngForm.setValue({
            name:this.ingredients.name,
            amount:this.ingredients.amount
          }) 
  
      });

    }
   
    
  }

  onAddItem(){
    
    if (this.shoppingEditForm.valid) {
     // this.ingredients = ;
     this.shopService.addIngredients(new Ingredient(this.shoppingEditForm.controls.nameInput.value,this.shoppingEditForm.controls.amountInput.value));
  //this.ingredients.emit();
      
    }
  }

  onSubmit(form:NgForm){
   
   if(form.valid && !this.editMode){
    this.shopService.addIngredients(new Ingredient(form.value.name ,form.value.amount));
   }else if(form.valid && this.editMode){
    this.shopService.updateIngtredient(this.editIndex,new Ingredient(form.value.name ,form.value.amount))
    this.editMode=false;
   }
   this.shoppngForm.reset();
     // this.ingredients = ;
    
  //this.ingredients.emit();
      
   
  }

  onClear(){
    this.editMode=false;
    this.shoppngForm.reset();
    
  }

  onDelete(){
    this.onClear();
    if(this.editIndex!= -1){
      this.shopService.deleteIngreDient(this.editIndex);
    }
    this.editIndex = -1;
    }
   

}
