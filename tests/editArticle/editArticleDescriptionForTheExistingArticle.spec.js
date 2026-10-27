import { test } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';

let viewArticlePage;
let createArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  createArticlePage = new CreateArticlePage(page);
  article = generateNewArticleData();
  const user = generateNewUserData();

  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
});

test('Edit the article description for the existing article', async () => {
  const newDescription = generateNewArticleData().description;

  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertDescriptionFieldHasValue(article.description);
  await createArticlePage.fillDescriptionField(newDescription);
  await createArticlePage.clickUpdateArticleButton();
  // Bug: the article page does not show the description
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertDescriptionFieldHasValue(newDescription);
});
