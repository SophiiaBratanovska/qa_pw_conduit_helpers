import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.tagsField = page.getByPlaceholder('Enter tags');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      const updateResponse = this.page.waitForResponse(
        response =>
          response.request().method() === 'PUT' &&
          response.url().includes('/api/articles/'),
      );
      await this.updateArticleButton.click();
      await updateResponse;
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillTagsField(tag) {
    await test.step(`Fill the 'Tags' field`, async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async assertTitleFieldHasValue(title) {
    await test
    .step(`Assert the 'Title' field has value '${title}'`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async assertDescriptionFieldHasValue(description) {
    await test
    .step(`Assert the 'Description' field has value '${description}'`,
       async () => {
      await expect(this.descriptionField).toHaveValue(description);
    });
  }

  async assertTextFieldHasValue(text) {
    await test.step(`Assert the 'Text' field has value '${text}'`, async () => {
      await expect(this.textField).toHaveValue(text);
    });
  }

  getRemoveTagButton(tag) {
    return this.page.getByText(tag, { exact: true }).locator('i');
  }

  async clickRemoveTagButton(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      await this.getRemoveTagButton(tag).click();
    });
  }

  async clickUpdateArticleButtonWithoutWaiting() {
    await test
    .step(`Click the 'Update Article' button Without Waiting`, async () => {
      await this.updateArticleButton.click();
    });
  }
}
