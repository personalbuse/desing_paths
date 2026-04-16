import { delay, printInfo, printSuccess, printCodeBlock, printTitle, printExplanation, showSpinner, printStep } from '../utils/index.js';
class Camion {
    async deliver() {
        await showSpinner('Camion: Cargando mercancia...', 800);
        await showSpinner('Camion: Viajando por carretera...', 1200);
        printSuccess('Entregado por carretera con exito.');
    }
}
class Barco {
    async deliver() {
        await showSpinner('Barco: Cargando contenedores...', 1000);
        await showSpinner('Barco: Navegando...', 1500);
        printSuccess('Entregado por mar con exito.');
    }
}
class Logistica {
    async planificarEntrega() {
        printInfo('Sistema de Logistica iniciado.');
        await delay(500);
        const transporte = this.createTransporte();
        printStep(`Transporte asignado: ${transporte.constructor.name}`);
        await delay(500);
        await transporte.deliver();
    }
}
class LogisticaTerrestre extends Logistica {
    createTransporte() {
        return new Camion();
    }
}
class LogisticaMaritima extends Logistica {
    createTransporte() {
        return new Barco();
    }
}
export class FactoryMethodDemo {
    async mostrarFactoryCode() {
        printCodeBlock(`
abstract class Logistica {
  protected abstract createTransporte(): Transporte;
  
  public async planificarEntrega() {
    const transporte = this.createTransporte();
    await transporte.deliver();
  }
}`, 'Factory Method Blueprint');
    }
    async execute() {
        await printTitle('FACTORY METHOD');
        printExplanation('Concepto', 'Permite que las subclases decidan que clase instanciar, evitando dependencias directas.');
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
        printExplanation('Ventaja', 'Independiza al codigo cliente de las clases concretas que debe instanciar.');
    }
}
