import { test } from '@playwright/test';
import { CreateArticlePage } from '../../pages/article/CreateArticlePage';

export async function createNewArticle(page, article) {
  const createArticlePage = new CreateArticlePage(page);
  await test.step(`Create new article`, async () => {
    await createArticlePage.fillTitleField(article.title);
    await createArticlePage.fillDescriptionField(article.description);
    await createArticlePage.fillTextField(article.text);

    for (const tag of article.tags) {
      await createArticlePage.fillTagsField(tag);
    }

    await createArticlePage.clickPublishArticleButton();
  });
}
