import inquirer from 'inquirer';
import chalk from 'chalk';
import { delay, printTitle, showSpinner, clearScreen, printSuccess, printInfo, } from './utils/index.js';
import { TemplateMethodDemo } from './patterns/templateMethod.js';
import { DecoratorDemo } from './patterns/decorator.js';
import { FactoryMethodDemo } from './patterns/factoryMethod.js';
class DemoApp {
    constructor() {
        this.hasShownSplash = false;
    }
    async showSplashScreen() {
        if (this.hasShownSplash)
            return;
        clearScreen();
        await printTitle('PATTERN EXPLORER');
        console.log(chalk.dim('Interactive Design Patterns Educational Tool'));
        console.log(chalk.dim('v1.0.0\n'));
        await delay(1000);
        this.hasShownSplash = true;
    }
    async mainMenu() {
        let exit = false;
        // Show splash screen only ONCE at start
        await this.showSplashScreen();
        while (!exit) {
            // Don't clear every time, just show the menu
            // Or if we clear, do it without delays if it's not the first time
            if (this.hasShownSplash) {
                clearScreen();
                await printTitle('PATTERN EXPLORER');
            }
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'Seleccione un patron para explorar:',
                    choices: [
                        { name: 'Template Method (Algoritmos)', value: 'template' },
                        { name: 'Decorator (Funcionalidad Dinamica)', value: 'decorator' },
                        { name: 'Factory Method (Creacion de Objetos)', value: 'factory' },
                        new inquirer.Separator(),
                        { name: 'Salir', value: 'exit' }
                    ]
                }
            ]);
            const choice = answers.choice;
            if (choice === 'exit') {
                exit = true;
                printInfo('Cerrando aplicacion...');
                await delay(500);
                continue;
            }
            await this.runDemo(choice);
            const confirmAnswer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'back',
                    message: 'Desea volver al menu principal?',
                    default: true
                }
            ]);
            if (!confirmAnswer.back)
                exit = true;
        }
        clearScreen();
        printSuccess('Gracias por usar Pattern Explorer');
    }
    async runDemo(pattern) {
        clearScreen();
        switch (pattern) {
            case 'template':
                await showSpinner('Cargando modulo Template Method...');
                const templateDemo = new TemplateMethodDemo();
                await templateDemo.execute();
                break;
            case 'decorator':
                await showSpinner('Cargando modulo Decorator...');
                const decoratorDemo = new DecoratorDemo();
                await decoratorDemo.execute();
                break;
            case 'factory':
                await showSpinner('Cargando modulo Factory Method...');
                const factoryDemo = new FactoryMethodDemo();
                await factoryDemo.execute();
                break;
        }
    }
    async start() {
        try {
            await this.mainMenu();
        }
        catch (error) {
            console.error('\n' + chalk.red('Error critico:'), error.message || error);
        }
    }
}
// Main entry point
async function main() {
    const app = new DemoApp();
    await app.start();
}
main().catch(console.error);
