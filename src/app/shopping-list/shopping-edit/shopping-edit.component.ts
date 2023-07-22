import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') slForm: NgForm = new NgForm([], []);
    subscription: Subscription = new Subscription();
    editMode: boolean = false;
    editedItemIndex:  number = 0;
    editedItem: Ingredient = new Ingredient('', 0);
    
    constructor(private shoppingListService: ShoppingListService) {

    }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditing.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.shoppingListService.getIngredient(index);
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(form: NgForm) {
        const formValues = form.value;
        const newIngredient = new Ingredient(formValues.name, formValues.amount);
        if(this.editMode)
            this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
        else
            this.shoppingListService.addIngredient(newIngredient);
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.editMode = false;
        this.slForm.reset();
    }

    onDeleteItem() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

}