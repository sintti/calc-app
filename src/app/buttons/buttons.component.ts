import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { InputService } from '../input.service';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [NgFor, ButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  buttonTextList: string[] = [
    '💀',
    'C',
    '%',
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    ',',
    '0',
    '±',
    '=',
  ];
  private inputService = inject(InputService);
  calculationInput = this.inputService.calculation;

  handleClick($event: MouseEvent) {
    const button = $event.target as HTMLButtonElement;
    const command: string | undefined = button.textContent?.toString();

    if (command) {
      this.inputService.handleInput(command);
    }
  }
}
