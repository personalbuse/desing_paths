import chalk from "chalk";
import ora from "ora";
import boxen from "boxen";
import gradient from "gradient-string";
import figlet from "figlet";
import { delay } from "./delay.js";

export const COLORS = {
  primary: "#00d2ff",
  secondary: "#3a7bd5",
  success: "#00ff87",
  warning: "#f09819",
  error: "#ff512f",
  info: "#60efff",
  accent: "#a18cd1",
};

const primaryGradient = gradient(COLORS.primary, COLORS.secondary);

export async function printSlow(
  text: string,
  speed: number = 20,
): Promise<void> {
  for (const char of text) {
    process.stdout.write(char);
    await delay(speed);
  }
  console.log();
}

export function printStep(text: string): void {
  console.log(`${chalk.hex(COLORS.primary)(">")} ${chalk.white(text)}`);
}

export function printSuccess(text: string): void {
  console.log(`${chalk.hex(COLORS.success)("V")} ${chalk.white(text)}`);
}

export function printInfo(text: string): void {
  console.log(`${chalk.hex(COLORS.info)("i")} ${chalk.dim(text)}`);
}

export function printWarning(text: string): void {
  console.log(`${chalk.hex(COLORS.warning)("!")} ${chalk.yellow(text)}`);
}

export async function printTitle(text: string): Promise<void> {
  return new Promise((resolve) => {
    figlet(text, { font: "Small" }, (_err, data) => {
      if (data) {
        console.log("\n" + primaryGradient.multiline(data));
      } else {
        console.log("\n" + chalk.bold.hex(COLORS.primary)(text));
      }
      console.log(chalk.hex(COLORS.secondary)("-".repeat(50)) + "\n");
      resolve();
    });
  });
}

export async function showSpinner(
  text: string,
  duration: number = 800,
): Promise<void> {
  const spinner = ora({
    text: chalk.dim(text),
    color: "cyan",
    spinner: "dots",
  }).start();

  await delay(duration);
  spinner.succeed(chalk.white(`${text} OK`));
}

export function printDivider(): void {
  console.log(chalk.dim("-".repeat(50)));
}

export function printExplanation(title: string, text: string): void {
  console.log(
    boxen(chalk.white(text), {
      title: chalk.hex(COLORS.accent).bold(` [ ${title} ] `),
      titleAlignment: "left",
      padding: 1,
      margin: { top: 1, bottom: 1 },
      borderStyle: "round",
      borderColor: COLORS.accent,
    }),
  );
}

export function clearScreen(): void {
  process.stdout.write('\x1B[2J\x1B[H');
}

export function printCodeBlock(code: string, label: string = "CODE"): void {
  console.log(
    boxen(chalk.hex("#abb2bf")(code), {
      title: chalk.hex(COLORS.info).bold(` < ${label} > `),
      padding: 0,
      margin: { top: 1, bottom: 1 },
      borderStyle: "single",
      borderColor: "#4b5263",
      backgroundColor: "#282c34",
    }),
  );
}
