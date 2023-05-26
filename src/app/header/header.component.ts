import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    navbarCollapsed = true;
    @Output() featureSelected = new EventEmitter<string>();

    toggleNavbarCollapsing() {
        this.navbarCollapsed = !this.navbarCollapsed;
    }

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }
}