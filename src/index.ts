import * as core from '@actions/core';
import * as lgtm from './lgtm';
import {isReviewApproval, postComment} from './github';

async function run(): Promise<void> {
  if (!isReviewApproval()) {
    core.info('Review state is not approved.');
    return;
  }

  const token = core.getInput('repo-token', {required: true});
  const favoriteImageUrls = core
    .getInput('favorite-image')
    .split(',')
    .filter(Boolean);

  const imageUrls = favoriteImageUrls.length
    ? favoriteImageUrls
    : await lgtm.extractUrls();
  const imageUrl = lgtm.select(imageUrls);
  const body = lgtm.toMarkdown(imageUrl);
  await postComment(token, body);
}

run().catch((error) => core.setFailed(error.message));
