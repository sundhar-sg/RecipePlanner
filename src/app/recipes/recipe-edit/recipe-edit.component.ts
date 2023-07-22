import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number = 0;
    editMode: boolean = false;
    recipeEditForm: FormGroup = new FormGroup('');
  
    get recipeControls() {
      return (this.recipeEditForm.get('ingredients') as FormArray).controls
    }
  
    constructor(private route: ActivatedRoute,
                private recipeService: RecipesService,
                private router: Router) {
    }
  
    ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
          }
        );
    }
  
    onSubmit() {
      // const newRecipe = new Recipe(
      //   this.recipeForm.value['name'],
      //   this.recipeForm.value['description'],
      //   this.recipeForm.value['imagePath'],
      //   this.recipeForm.value['ingredients']);
      if (this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
      } else {
        this.recipeService.addRecipe(this.recipeEditForm.value);
      }
      this.onCancel();
    }
  
    onAddIngredient() {
      (<FormArray>this.recipeEditForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        })
      );
    }
  
    onDeleteIngredient(index: number) {
      (<FormArray>this.recipeEditForm.get('ingredients')).removeAt(index);
    }
  
    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  
    private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray<any>([]);
  
      if (this.editMode) {
        const recipe = this.recipeService.getRecipeByID(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      }
  
      this.recipeEditForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
      });
    }
  
  }