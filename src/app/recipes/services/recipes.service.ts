import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/services/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

    recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>;

    private recipes: Recipe[] = [
		new Recipe("Test recipe", "A Sample Test Recipe", "https://media.istockphoto.com/id/1190036539/photo/pasta-casserole-with-tomatoes-and-mozzarella-cheese-in-a-cast-iron-pan.jpg?b=1&s=170667a&w=0&k=20&c=iPbpz032rVCcSLZ3VEk3vE27XTr1B46cL2l3TTWxHJ4=", [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
		new Recipe("Test 1 recipe", "A Sample Test 1 Recipe", "data:image/jpeg;base64,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", [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
	];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeByID(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    constructor(private shoppingListService: ShoppingListService) { }

}