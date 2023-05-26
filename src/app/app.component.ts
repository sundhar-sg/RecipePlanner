import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RecipePlanner';
  loadedFeature = 'recipes';

  onNavigate(event: string) {
    this.loadedFeature = event;
  }

  ngOnInit() {

  }
}
