import { delay, printStep, printInfo, printCodeBlock, printTitle, printExplanation, showSpinner } from '../utils/index.js';
class CafeSimple {
    getDescription() {
        return 'Cafe simple';
    }
    getCost() {
        return 5.0;
    }
}
class CafeDecorator {
    constructor(cafe) {
        this.cafe = cafe;
    }
}
class LecheDecorator extends CafeDecorator {
    getDescription() {
        return this.cafe.getDescription() + ' + leche';
    }
    getCost() {
        return this.cafe.getCost() + 2.0;
    }
}
class AzucarDecorator extends CafeDecorator {
    getDescription() {
        return this.cafe.getDescription() + ' + azucar';
    }
    getCost() {
        return this.cafe.getCost() + 1.0;
    }
}
class VainillaDecorator extends CafeDecorator {
    getDescription() {
        return this.cafe.getDescription() + ' + vainilla';
    }
    getCost() {
        return this.cafe.getCost() + 1.5;
    }
}
export class DecoratorDemo {
    async mostrarInterfazYClases() {
        printCodeBlock(`
interface Cafe {
  getDescription(): string;
  getCost(): number;
}

class LecheDecorator extends CafeDecorator {
  getCost() { return this.cafe.getCost() + 2.0; }
}`, 'Decorator Pattern Structure');
    }
    async execute() {
        await printTitle('DECORATOR');
        printExplanation('Concepto', 'Permite anadir responsabilidades a un objeto dinamicamente sin afectar a otros objetos.');
        await delay(800);
        await this.mostrarInterfazYClases();
        await delay(1500);
        printStep('Paso 1: Iniciamos con un Cafe Simple');
        let miCafe = new CafeSimple();
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
        printExplanation('Uso Practico', 'Es una alternativa flexible a la herencia para extender funcionalidad.');
    }
}
