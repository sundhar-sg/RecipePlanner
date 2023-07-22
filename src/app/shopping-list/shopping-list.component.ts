import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[] = [];
    private idChangedSub: Subscription = new Subscription();

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.idChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
            (ingredientsArr: Ingredient[]) => {
                this.ingredients = ingredientsArr;
            }
        );
    }

    ngOnDestroy(): void {
        this.idChangedSub.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

    onIngredientRemoved() {
        this.ingredients.splice(this.ingredients.length - 1, 1);
    }
}