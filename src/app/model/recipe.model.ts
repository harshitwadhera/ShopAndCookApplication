import { Ingredient } from './ingredient.model';

export class Recipe {
  public id:String;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredient:Ingredient[];

    Recipe(){
      
    }
    constructor(id:string,name: string, desc: string, imagePath: string,ingredients : Ingredient[]) {
      this.id = id;
      this.name = name;
      this.description = desc;
      this.imagePath = imagePath;
      this.ingredient=ingredients;
    }
  }
  