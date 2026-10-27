import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', { level: 1 });
    this.editAction = page.getByRole('link', { name: 'Edit Article' }).first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
  async assertArticleTagsAreVisible(tags) {
    await test.step(`Assert the article has correct tags`, async () => {
      for (const tag of tags) {
        await expect(this.page.getByText(tag, { exact: true })).toBeVisible();
      }
    });
  }

  async assertArticleTagsAreNotVisible(tags) {
    await test
    .step(`Assert the article does not have removed tags`, async () => {
      for (const tag of tags) {
        await expect(this.page.getByText(tag, { exact: true })).toBeHidden();
      }
    });
  }

  async reload() {
    await test.step(`Reload the article page`, async () => {
      await this.page.reload();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click on the 'Edit Article' link`, async () => {
      await this.editAction.click();
    });
  }
}
