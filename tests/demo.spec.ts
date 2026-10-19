import { test, expect } from "@playwright/test";

for (const width of [360, 768, 1440]) {
  test(`navigation et responsive à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const [path, title] of [
      ["/", "Prêt à faire des étincelles ?"],
      ["/ma-seance", "Ma séance"],
      ["/mes-matieres", "Mes matières"],
      ["/mes-progres", "Mes progrès"],
      ["/mes-defis", "Mes défis"],
      ["/studio-avatar", "Studio Avatar"],
    ]) {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        title,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    if (width < 850) {
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
      await page
        .getByRole("navigation", { name: "Navigation mobile", exact: true })
        .getByRole("link", { name: "Mes progrès" })
        .click();
      await expect(
        page.getByRole("button", { name: "Ouvrir le menu" }),
      ).toHaveAttribute("aria-expanded", "false");
    } else {
      await page
        .getByRole("navigation", { name: "Navigation principale" })
        .getByRole("link", { name: "Mes progrès" })
        .click();
    }
    await expect(
      page.getByRole("heading", { name: "Mes progrès", exact: true }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("catalogue : recherche, état vide, présélection et redémarrage", async ({
  page,
}) => {
  await page.goto("/mes-matieres");
  await page
    .getByLabel("Rechercher une matière ou une notion")
    .fill("EQUATIONS");
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await page.getByLabel("Matière", { exact: true }).selectOption("francais");
  await expect(
    page.getByRole("heading", { name: "Aucune matière trouvée" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Réinitialiser les filtres" }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(3);
  await page
    .getByRole("link", {
      name: "Explorer Les équations en Mathématiques",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("radio", { name: /Mathématiques/ }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Continuer", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Ouvrir ma séance" }),
  ).toBeDisabled();
  await page.getByRole("radio", { name: "Comprendre une notion" }).check();
  await page.getByRole("button", { name: "Ouvrir ma séance" }).click();
  await page.getByRole("button", { name: "Voir un indice" }).click();
  await expect(page.locator("#session-hint")).toBeVisible();
  await page.getByRole("button", { name: "Voir le bilan démo" }).click();
  await page.getByRole("button", { name: "Nouvelle séance" }).click();
  await expect(page.locator("input:checked")).toHaveCount(0);
  await expect(page).toHaveURL("/ma-seance");
});

test("paramètre invalide et indice réinitialisé après changement de matière", async ({
  page,
}) => {
  await page.goto("/ma-seance?matiere=inconnue");
  await expect(
    page.getByRole("button", { name: "Continuer", exact: true }),
  ).toBeDisabled();
  await page.getByRole("radio", { name: /Mathématiques/ }).check();
  await page.getByRole("button", { name: "Continuer", exact: true }).click();
  await page.getByRole("radio", { name: "Revoir l’essentiel" }).check();
  await page.getByRole("button", { name: "Ouvrir ma séance" }).click();
  await page.getByRole("button", { name: "Voir un indice" }).click();
  await page.getByRole("button", { name: "Objectif", exact: true }).click();
  await page.getByRole("button", { name: "Matière", exact: true }).click();
  await page.getByRole("radio", { name: /Sciences/ }).check();
  await page.getByRole("button", { name: "Continuer", exact: true }).click();
  await page.getByRole("button", { name: "Ouvrir ma séance" }).click();
  await expect(page.locator("#session-hint")).toBeHidden();
});

test("progrès : données accessibles et cohérentes", async ({ page }) => {
  await page.goto("/mes-progres");
  await page.getByText("Voir les données du graphique").click();
  await expect(page.getByRole("table")).toBeVisible();
  const values = await page.locator("tbody td").allTextContents();
  expect(values.reduce((sum, value) => sum + Number(value), 0)).toBe(155);
  await expect(page.getByRole("progressbar")).toHaveCount(3);
});

test("défis : filtres et liens vers les rubriques", async ({ page }) => {
  await page.goto("/mes-defis");
  await expect(page.locator(".challenge-detail")).toHaveCount(3);
  await page.getByRole("button", { name: "Terminés", exact: true }).click();
  await expect(page.locator(".challenge-detail")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Terminés", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "En cours", exact: true }).click();
  await expect(page.locator(".challenge-detail")).toHaveCount(2);
  await page.getByRole("link", { name: "Ouvrir le studio" }).click();
  await expect(
    page.getByRole("heading", { name: "Studio Avatar", exact: true }),
  ).toBeVisible();
});

test("avatar : aperçu, options, aléatoire, reset et rechargement", async ({
  page,
}) => {
  await page.goto("/studio-avatar");
  await page.getByRole("radio", { name: "Turquoise", exact: true }).check();
  await page.getByRole("radio", { name: "Clin d’œil", exact: true }).check();
  await page.getByRole("radio", { name: "Étoile", exact: true }).check();
  await expect(
    page.getByRole("img", { name: /Compagnon Turquoise, Clin d’œil, Étoile/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Surprends-moi" }).click();
  await expect(page.locator("input:checked")).toHaveCount(3);
  await page.getByRole("button", { name: "Réinitialiser l’avatar" }).click();
  await expect(
    page.getByRole("radio", { name: "Bleu électrique" }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Sourire", exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", { name: "Petite feuille" }),
  ).toBeChecked();
  await page.getByRole("radio", { name: "Violet", exact: true }).check();
  await page.reload();
  await expect(
    page.getByRole("radio", { name: "Bleu électrique" }),
  ).toBeChecked();
});

test("une route inconnue propose un retour à l’accueil", async ({ page }) => {
  await page.goto("/page-inconnue");
  await expect(
    page.getByRole("heading", { name: "On a perdu le fil." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Revenir à l’accueil" }).click();
  await expect(page).toHaveURL("/");
});
