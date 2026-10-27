import { test } from '@playwright/test';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { HomePage } from '../../src/ui/pages/HomePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

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

test('Remove the article text for the existing article', async () => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertTextFieldHasValue(article.text);

  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateArticleButtonWithoutWaiting();

  await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
