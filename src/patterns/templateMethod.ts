import { 
  delay, 
  printStep, 
  printInfo, 
  printSuccess, 
  printSlow, 
  printCodeBlock, 
  printTitle, 
  printExplanation,
  showSpinner
} from '../utils/index.js';

/**
 * Clase abstracta Bebida que define el plantilla para preparar bebidas
 */
abstract class Bebida {
  async preparar(): Promise<void> {
    await showSpinner('Hirviendo agua...', 1000);
    await this.agregarIngrediente();
    await this.servir();
    printSuccess('Bebida preparada exitosamente');
    await printSlow('- Listo para consumir -', 40);
  }

  protected abstract agregarIngrediente(): Promise<void>;

  protected async servir(): Promise<void> {
    await showSpinner('Sirviendo en taza...', 800);
  }
}

class Cafe extends Bebida {
  protected async agregarIngrediente(): Promise<void> {
    await showSpinner('Agregando cafe molido...', 1200);
    printInfo('Mezclando para obtener aroma...');
    await delay(500);
  }
}

class Te extends Bebida {
  protected async agregarIngrediente(): Promise<void> {
    await showSpinner('Agregando hojas de te...', 800);
    await showSpinner('Infundiendo...', 1500);
    printInfo('Retirando hojas...');
    await delay(400);
  }
}

export class TemplateMethodDemo {
  private async mostrarClaseAbstracta(): Promise<void> {
    printCodeBlock(`
abstract class Bebida {
  async preparar(): Promise<void> {
    await this.hervirAgua();
    await this.agregarIngrediente(); // Paso delegado
    await this.servir();
  }
  protected abstract agregarIngrediente(): Promise<void>;
}`, 'Abstract Class: Bebida');
  }

  public async execute(): Promise<void> {
    await printTitle('TEMPLATE METHOD');

    printExplanation(
      'Concepto',
      'Define el esqueleto de un algoritmo en una operacion, delegando algunos pasos a las subclases.'
    );
    
    await delay(800);
    await this.mostrarClaseAbstracta();
    
    await delay(1500);
    printStep('Ejemplo 1: Preparando un Cafe');
    const cafe = new Cafe();
    await cafe.preparar();
    
    await delay(1000);
    printStep('Ejemplo 2: Preparando un Te');
    const te = new Te();
    await te.preparar();

    printExplanation(
      'Beneficio',
      'Permite que las subclases redefinan ciertos pasos de un algoritmo sin cambiar su estructura.'
    );
  }
}
