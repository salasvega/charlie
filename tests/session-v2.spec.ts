import { test, expect } from "@playwright/test";

test("V2 : conversation dominante, réponse locale et aides préparées", async ({
  page,
}) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") external.push(request.url());
  });
  await page.goto("/ma-seance");
  await expect(
    page.getByRole("heading", { name: "Exercice 1 · Fonctions" }),
  ).toBeVisible();
  await expect(
    page.getByText("Conversation scénarisée · sans IA"),
  ).toBeVisible();
  await page
    .getByLabel("Ta réponse de démonstration")
    .fill("Je remplace x par 3.");
  await page
    .getByRole("button", { name: "Afficher ma réponse localement" })
    .click();
  await expect(page.getByRole("log")).toContainText("Je remplace x par 3.");
  await expect(page.getByRole("log")).toContainText(
    "ne corrige pas ta réponse",
  );
  await expect(page.getByLabel("Ta réponse de démonstration")).toHaveValue("");
  await page.getByRole("button", { name: "Voir un indice" }).click();
  await expect(page.locator("#session-hint")).toBeVisible();
  await page.getByRole("button", { name: "Masquer l’indice" }).click();
  await expect(page.locator("#session-hint")).toBeHidden();
  await page.getByRole("button", { name: "Autre indice", exact: true }).click();
  await expect(page.getByRole("log")).toContainText("Commence par 3²");
  await page
    .getByRole("button", { name: "Voir la méthode", exact: true })
    .click();
  await expect(page.getByRole("log")).toContainText("Recopie l’expression");
  expect(external).toEqual([]);
});

test("V2 : calculatrice bornée, division par zéro et fermeture clavier", async ({
  page,
}) => {
  await page.goto("/ma-seance");
  await page.getByRole("button", { name: "Calculatrice", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Premier nombre").fill("9");
  await dialog.getByLabel("Opération", { exact: true }).selectOption("×");
  await dialog.getByLabel("Deuxième nombre").fill("3");
  await dialog.getByRole("button", { name: "Calculer", exact: true }).click();
  await expect(dialog.getByRole("status")).toHaveText("27");
  await dialog.getByLabel("Opération", { exact: true }).selectOption("/");
  await dialog.getByLabel("Deuxième nombre").fill("0");
  await dialog.getByRole("button", { name: "Calculer", exact: true }).click();
  await expect(dialog.getByRole("status")).toContainText("division par zéro");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("V2 : notes locales, couleurs, onglets, annulation et rechargement", async ({
  page,
}) => {
  await page.goto("/ma-seance");
  const note = page.getByLabel("Brouillon — notes locales");
  await note.fill("Mon calcul local");
  await page.getByRole("button", { name: "Bleu", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Bleu", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Effacer les notes de cet onglet" })
    .click();
  await expect(note).toHaveValue("");
  await page
    .getByRole("button", { name: "Annuler la dernière modification" })
    .click();
  await expect(note).toHaveValue("Mon calcul local");
  await page.getByRole("button", { name: "Rétablir la modification" }).click();
  await expect(note).toHaveValue("");
  await page.getByRole("tab", { name: "Calculs", exact: true }).click();
  await page.getByLabel("Calculs — notes locales").fill("2 × 9");
  await page.getByRole("tab", { name: "Brouillon", exact: true }).click();
  await expect(note).toHaveValue("");
  await page.reload();
  await expect(note).toHaveValue(/f\(0\)/);
});

for (const width of [360, 390, 768, 1024, 1366, 1536]) {
  test(`V2 : composition sans débordement à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/ma-seance");
    await expect(
      page.getByRole("heading", { name: "Exercice 1 · Fonctions" }),
    ).toBeVisible();
    if (width <= 850) {
      await page
        .getByRole("button", { name: "Outils pédagogiques", exact: true })
        .click();
      await expect(
        page.getByRole("button", { name: "Fiche de cours", exact: true }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Fiche de cours", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toContainText("fonction");
      await page.keyboard.press("Escape");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
