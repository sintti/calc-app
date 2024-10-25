import { Component, inject, input } from '@angular/core';
import { InputService } from '../../input.service';

@Component({
  selector: 'app-screen',
  standalone: true,
  imports: [],
  templateUrl: './screen.component.html',
  styleUrl: './screen.component.scss',
})
export class ScreenComponent {
  private inputService = inject(InputService);
  calculationInput = this.inputService.calculation;
}
