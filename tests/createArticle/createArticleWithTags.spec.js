import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  viewArticlePage = new ViewArticlePage(page);
  article = generateNewArticleData(3);
  const user = generateNewUserData();

  await signUpUser(page, user);
});

test('Create an article with tags', async ({ page }) => {
  await homePage.clickNewArticleLink();
  await createNewArticle(page, article);

  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTextIsVisible(article.text);
  await viewArticlePage.assertArticleTagsAreVisible(article.tags);
});
