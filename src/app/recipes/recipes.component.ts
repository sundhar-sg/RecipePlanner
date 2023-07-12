import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipesService]
})
export class RecipesComponent implements OnInit {
  
    selectedRecipeFromList: Recipe | undefined;

    constructor(private recipesService: RecipesService) {}

    ngOnInit(): void {
        this.recipesService.recipeSelected.subscribe(
            (recipe: Recipe) => {
                this.selectedRecipeFromList = recipe;
            }
        );
    }
}