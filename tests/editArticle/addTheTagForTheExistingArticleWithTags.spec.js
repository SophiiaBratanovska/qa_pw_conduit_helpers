import { test } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let viewArticlePage;
let homePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  const user = generateNewUserData();
  await signUpUser(page, user);

  await homePage.clickNewArticleLink();
  article = generateNewArticleData(3);
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTagsAreVisible(article.tags);
});

test('Add the tag for the existing article with tags', async () => {
  await viewArticlePage.clickEditArticleLink();
  const newTags = generateNewArticleData(1).tags;
  for (const tag of newTags) {
    await createArticlePage.fillTagsField(tag);
  }
  await createArticlePage.clickUpdateArticleButton();
  // Bug: the article page does not show the tags until it is reloaded
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTagsAreVisible([
    ...article.tags,
    ...newTags,
  ]);
});
