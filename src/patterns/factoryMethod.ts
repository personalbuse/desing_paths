import { 
  delay, 
  printInfo, 
  printSuccess, 
  printCodeBlock, 
  printTitle, 
  printExplanation,
  showSpinner,
  printStep
} from '../utils/index.js';

interface Transporte {
  deliver(): Promise<void>;
}

class Camion implements Transporte {
  public async deliver(): Promise<void> {
    await showSpinner('Camion: Cargando mercancia...', 800);
    await showSpinner('Camion: Viajando por carretera...', 1200);
    printSuccess('Entregado por carretera con exito.');
  }
}

class Barco implements Transporte {
  public async deliver(): Promise<void> {
    await showSpinner('Barco: Cargando contenedores...', 1000);
    await showSpinner('Barco: Navegando...', 1500);
    printSuccess('Entregado por mar con exito.');
  }
}

abstract class Logistica {
  protected abstract createTransporte(): Transporte;

  public async planificarEntrega(): Promise<void> {
    printInfo('Sistema de Logistica iniciado.');
    await delay(500);
    const transporte = this.createTransporte();
    printStep(`Transporte asignado: ${transporte.constructor.name}`);
    await delay(500);
    await transporte.deliver();
  }
}

class LogisticaTerrestre extends Logistica {
  protected createTransporte(): Transporte {
    return new Camion();
  }
}

class LogisticaMaritima extends Logistica {
  protected createTransporte(): Transporte {
    return new Barco();
  }
}

export class FactoryMethodDemo {
  private async mostrarFactoryCode(): Promise<void> {
    printCodeBlock(`
abstract class Logistica {
  protected abstract createTransporte(): Transporte;
  
  public async planificarEntrega() {
    const transporte = this.createTransporte();
    await transporte.deliver();
  }
}`, 'Factory Method Blueprint');
  }

  public async execute(): Promise<void> {
    await printTitle('FACTORY METHOD');

    printExplanation(
      'Concepto',
      'Permite que las subclases decidan que clase instanciar, evitando dependencias directas.'
    );
    
    await delay(800);
    await this.mostrarFactoryCode();
    
    await delay(1500);
    printStep('Escenario A: Pedido Nacional (Terrestre)');
    const terrestre = new LogisticaTerrestre();
    await terrestre.planificarEntrega();

    await delay(1500);
    printStep('Escenario B: Pedido Internacional (Maritimo)');
    const maritimo = new LogisticaMaritima();
    await maritimo.planificarEntrega();

    printExplanation(
      'Ventaja',
      'Independiza al codigo cliente de las clases concretas que debe instanciar.'
    );
  }
}
