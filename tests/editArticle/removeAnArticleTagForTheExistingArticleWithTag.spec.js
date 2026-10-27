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
  article = generateNewArticleData(1);
  await createNewArticle(page, article);
  await viewArticlePage.assertArticleTagsAreVisible(article.tags);
});

test('Remove an article tag for the existing article with tag', async () => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.clickRemoveTagButton(article.tags[0]);
  await createArticlePage.clickUpdateArticleButton();
  await viewArticlePage.reload();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);
  await viewArticlePage.assertArticleTagsAreNotVisible(article.tags);
});
