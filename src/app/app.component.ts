import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';
import { ScreenComponent } from './number-view/screen/screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonsComponent, ScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentNumber: number = 0;
}
