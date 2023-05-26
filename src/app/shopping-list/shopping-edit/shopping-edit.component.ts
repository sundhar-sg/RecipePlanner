import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild('nameInput') nameInputRef: ElementRef = new ElementRef(null);
    @ViewChild('amountInput') amountInputRef: ElementRef = new ElementRef(null);
    @Output() ingredientAdded = new EventEmitter<Ingredient>();
    @Output() ingredientRemoved = new EventEmitter<void>();
    constructor() {

    }

    ngOnInit() {

    }

    onAddItem() {
        const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
        this.ingredientAdded.emit(newIngredient);
    }

    onDeleteItem() {
        this.ingredientRemoved.emit();
    }

    onClearFields() {
        this.nameInputRef.nativeElement.value = '';
        this.amountInputRef.nativeElement.value = '';
    }
}