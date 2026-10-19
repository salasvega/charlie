import { test, expect } from "@playwright/test";
const storageKey = "charlie.studio-avatar.v1";

test("Studio : apparences préparées liées, arrière-plan et remise à zéro", async ({
  page,
}) => {
  await page.goto("/studio-avatar");
  await page
    .getByRole("button", { name: "Personnalisation", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Personnalisation", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("radio", {
      name: "Coiffure : Cheveux longs et hoodie bleu nuit",
      exact: true,
    })
    .check();
  await expect(
    page.getByRole("radio", {
      name: "Visage : Cheveux longs et hoodie bleu nuit",
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", {
      name: "Tenue : Cheveux longs et hoodie bleu nuit",
      exact: true,
    }),
  ).toBeChecked();
  await page
    .getByRole("radio", { name: "Arrière-plan : Bibliothèque", exact: true })
    .check();
  await expect(
    page.getByRole("img", {
      name: /Charlie Humain, Cheveux longs et hoodie bleu nuit, Bibliothèque/,
    }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Réinitialiser", exact: true })
    .click();
  await expect(
    page.getByRole("radio", {
      name: "Visage : Chignon brun et hoodie violet",
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", {
      name: "Arrière-plan : Bureau Charlie",
      exact: true,
    }),
  ).toBeChecked();
});

test("Studio : sauvegarde explicite de la configuration, sans message ni profil", async ({
  page,
}) => {
  await page.goto("/studio-avatar");
  await page
    .getByRole("radio", {
      name: "Visage : Lunettes et chemise violette",
      exact: true,
    })
    .check();
  await page
    .getByRole("radio", { name: "Arrière-plan : Atelier végétal", exact: true })
    .check();
  await page.getByRole("radio", { name: /Dynamique/ }).check();
  await page.getByRole("radio", { name: "Soutenu", exact: true }).check();
  const encouragement = page.getByLabel("Niveau d’encouragement", {
    exact: true,
  });
  await encouragement.focus();
  await encouragement.press("End");
  for (let step = 0; step < 20; step++) await encouragement.press("ArrowLeft");
  await page
    .getByLabel("Pose des questions pour me faire réfléchir", { exact: true })
    .uncheck();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull();
  await page
    .getByRole("button", { name: "Enregistrer mon avatar", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "sur cet appareil uniquement",
  );
  await page.reload();
  await expect(
    page.getByRole("radio", {
      name: "Visage : Lunettes et chemise violette",
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByRole("radio", {
      name: "Arrière-plan : Atelier végétal",
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByLabel("Niveau d’encouragement", { exact: true }),
  ).toHaveValue("80");
  await expect(
    page.getByLabel("Pose des questions pour me faire réfléchir", {
      exact: true,
    }),
  ).not.toBeChecked();
  const stored = await page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    storageKey,
  );
  expect(stored).not.toHaveProperty("message");
  expect(stored).not.toHaveProperty("name");
  expect(stored.teaching[0]).toBe(false);
  await page.getByRole("button", { name: "Voir plus d’avatars" }).click();
  await page
    .getByRole("button", { name: "Oublier la sauvegarde locale" })
    .click();
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull();
});

test("Studio : configuration corrompue ignorée sans casser la page", async ({
  page,
}) => {
  await page.addInitScript(
    (key) =>
      localStorage.setItem(
        key,
        JSON.stringify({ version: 1, style: "human", appearance: 999 }),
      ),
    storageKey,
  );
  await page.goto("/studio-avatar");
  await expect(
    page.getByRole("heading", { name: "Studio Avatar", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("incompatible");
  await expect(
    page.getByRole("radio", {
      name: "Visage : Chignon brun et hoodie violet",
      exact: true,
    }),
  ).toBeChecked();
});

test("Studio : erreur de stockage annoncée sans fausse confirmation", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("quota simulé");
    };
  });
  await page.goto("/studio-avatar");
  await page
    .getByRole("button", { name: "Enregistrer mon avatar", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("indisponible");
  await expect(page.getByRole("status")).not.toContainText("Avatar enregistré");
});

test("Studio : voix indisponible honnêtement et aucun message envoyé", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") posts.push(request.url());
  });
  await page.addInitScript(() => {
    if ("speechSynthesis" in window)
      Object.defineProperty(window.speechSynthesis, "getVoices", {
        value: () => [],
      });
  });
  await page.goto("/studio-avatar");
  await page
    .getByRole("button", { name: "Prévisualiser ma voix", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    /Aucune voix locale|pas disponible/,
  );
  await page
    .getByRole("button", { name: "Aide-moi en maths", exact: true })
    .click();
  await expect(page.getByRole("log")).toContainText("Réponse préparée");
  await page
    .getByLabel("Message de test local")
    .fill("Mon idée de démonstration");
  await page
    .getByRole("button", { name: "Tester mon message localement" })
    .click();
  await expect(page.getByRole("log")).toContainText(
    "aucune réponse personnalisée",
  );
  expect(
    await page.evaluate((key) => localStorage.getItem(key), storageKey),
  ).toBeNull();
  expect(posts).toEqual([]);
});

for (const width of [360, 390, 768, 1024, 1366, 1536]) {
  test(`Studio : responsive et navigation à ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/studio-avatar");
    await expect(
      page.getByRole("heading", { name: "Studio Avatar", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("radio", { name: "Mascotte", exact: true }).check();
    await expect(
      page.getByRole("img", { name: /Charlie Mascotte/ }),
    ).toBeVisible();
    if (width <= 850) {
      await page.getByRole("button", { name: "Ouvrir le menu" }).click();
      await page
        .getByRole("navigation", { name: "Navigation mobile", exact: true })
        .getByRole("link", { name: "Accueil", exact: true })
        .click();
    } else
      await page
        .getByRole("navigation", { name: "Navigation principale" })
        .getByRole("link", { name: "Accueil", exact: true })
        .click();
    await expect(
      page.getByRole("heading", { name: /Bonjour Nina/ }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}
