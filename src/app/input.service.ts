import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  private currentInput = signal<string>('');
  private lastResult = signal<string>('');
  private resultCalculated = false;

  calculation = this.currentInput.asReadonly();

  constructor() {}

  handleInput(command: string) {
    const commandIsNotNumber = command
      ? isNaN(Number(command.charAt(0)))
      : true;
    const lastInputIsNotNumber = command
      ? isNaN(
          Number(this.currentInput().charAt(this.currentInput().length - 1))
        )
      : false;
    const commandIsEqualSign = command === '=';
    const commandIsClearAll = command === '💀';
    const commandIsClearLast = command === 'C';

    if (this.resultCalculated && !commandIsNotNumber) {
      this.clearAll();
    }

    if (commandIsClearAll) {
      this.clearAll();
    }

    if (commandIsClearLast) {
      if (this.lastResult()) {
        this.currentInput.set(this.lastResult());
        return;
      } else {
        this.currentInput.set('');
        return;
      }
    }

    if (commandIsEqualSign) {
      this.calculate();
      return;
    }

    if (!this.currentInput() && commandIsNotNumber) {
      console.log('Calculation input: ', this.currentInput());

      console.log('First input must be a number');

      return;
    }

    if (commandIsNotNumber && lastInputIsNotNumber) {
      console.log('Last input must be number');
      return;
    }

    this.currentInput.update((current) => current.concat(command));
  }

  calculate() {
    const cleanedInput = this.currentInput().replace(/\s+/g, '');

    if (!/^[0-9+\-*/]+$/.test(cleanedInput)) {
      console.log('Syöte sisältää virheellisiä merkkejä');
      this.clearAll();
      return null;
    }

    // Pilkotaan syöte numeroihin ja operaattoreihin
    const parts = cleanedInput.split(/([+\-*/])/);

    // Ensimmäinen vaihe: käsitellään kertolaskut ja jakolaskut
    let intermediateParts: (string | number)[] = [];
    let currentNumber = Number(parts[0]);

    if (isNaN(currentNumber)) {
      console.log('Virheellinen syöte alussa');
      return null;
    }

    for (let i = 1; i < parts.length; i += 2) {
      const operator = parts[i];
      const nextNumber = Number(parts[i + 1]);

      if (isNaN(nextNumber)) {
        console.log('Syöte sisältää virheellisiä numeroita');
        return null;
      }

      // Käsitellään kertolaskut ja jakolaskut heti
      if (operator === '*') {
        currentNumber *= nextNumber;
      } else if (operator === '/') {
        currentNumber /= nextNumber;
      } else {
        // Jos operaattori ei ole kertolasku/jakolasku, lisätään osat välimuistiin
        intermediateParts.push(currentNumber, operator);
        currentNumber = nextNumber;
      }
    }

    // Lisää viimeinen käsitelty numero intermediateParts-taulukkoon
    intermediateParts.push(currentNumber);

    // Toinen vaihe: käsitellään yhteen- ja vähennyslaskut
    let sum = Number(intermediateParts[0]);

    for (let i = 1; i < intermediateParts.length; i += 2) {
      const operator = intermediateParts[i] as string;
      const nextNumber = intermediateParts[i + 1] as number;

      if (operator === '+') {
        sum += nextNumber;
      } else if (operator === '-') {
        sum -= nextNumber;
      }
    }
    this.currentInput.set(sum.toString());
    this.lastResult.set(sum.toString());
    return;
  }

  clearAll() {
    this.currentInput.set('');
    this.lastResult.set('');
    return;
  }
}
