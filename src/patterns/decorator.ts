import { 
  delay, 
  printStep, 
  printInfo, 
  printCodeBlock, 
  printTitle, 
  printExplanation,
  showSpinner 
} from '../utils/index.js';

interface Cafe {
  getDescription(): string;
  getCost(): number;
}

class CafeSimple implements Cafe {
  public getDescription(): string {
    return 'Cafe simple';
  }

  public getCost(): number {
    return 5.0;
  }
}

abstract class CafeDecorator implements Cafe {
  protected cafe: Cafe;
  constructor(cafe: Cafe) {
    this.cafe = cafe;
  }
  public abstract getDescription(): string;
  public abstract getCost(): number;
}

class LecheDecorator extends CafeDecorator {
  public getDescription(): string {
    return this.cafe.getDescription() + ' + leche';
  }
  public getCost(): number {
    return this.cafe.getCost() + 2.0;
  }
}

class AzucarDecorator extends CafeDecorator {
  public getDescription(): string {
    return this.cafe.getDescription() + ' + azucar';
  }
  public getCost(): number {
    return this.cafe.getCost() + 1.0;
  }
}

class VainillaDecorator extends CafeDecorator {
  public getDescription(): string {
    return this.cafe.getDescription() + ' + vainilla';
  }
  public getCost(): number {
    return this.cafe.getCost() + 1.5;
  }
}

export class DecoratorDemo {
  private async mostrarInterfazYClases(): Promise<void> {
    printCodeBlock(`
interface Cafe {
  getDescription(): string;
  getCost(): number;
}

class LecheDecorator extends CafeDecorator {
  getCost() { return this.cafe.getCost() + 2.0; }
}`, 'Decorator Pattern Structure');
  }

  public async execute(): Promise<void> {
    await printTitle('DECORATOR');

    printExplanation(
      'Concepto',
      'Permite anadir responsabilidades a un objeto dinamicamente sin afectar a otros objetos.'
    );
    
    await delay(800);
    await this.mostrarInterfazYClases();
    
    await delay(1500);
    
    printStep('Paso 1: Iniciamos con un Cafe Simple');
    let miCafe: Cafe = new CafeSimple();
    await showSpinner('Preparando cafe base...', 800);
    printInfo(`Estado: ${miCafe.getDescription()} | Costo total: $${miCafe.getCost().toFixed(2)}`);

    await delay(1000);
    printStep('Paso 2: Decoramos con Leche');
    miCafe = new LecheDecorator(miCafe);
    await showSpinner('Infusionando leche...', 1000);
    printInfo(`Estado: ${miCafe.getDescription()} | Costo total: $${miCafe.getCost().toFixed(2)}`);

    await delay(1000);
    printStep('Paso 3: Decoramos con Azucar');
    miCafe = new AzucarDecorator(miCafe);
    await showSpinner('Endulzando...', 600);
    printInfo(`Estado: ${miCafe.getDescription()} | Costo total: $${miCafe.getCost().toFixed(2)}`);

    await delay(1000);
    printStep('Paso 4: Decoramos con Vainilla');
    miCafe = new VainillaDecorator(miCafe);
    await showSpinner('Toque final...', 800);
    printInfo(`Resultado Final: ${miCafe.getDescription()}`);
    printInfo(`Costo final: $${miCafe.getCost().toFixed(2)}`);

    printExplanation(
      'Uso Practico',
      'Es una alternativa flexible a la herencia para extender funcionalidad.'
    );
  }
}
