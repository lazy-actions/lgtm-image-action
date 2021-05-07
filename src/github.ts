import * as github from '@actions/github';
import * as core from '@actions/core';

export function isReviewApproval(): boolean {
  const {review} = github.context.payload;
  if (!review) {
    core.warning('This event trigger is not pull_request_review');
    return false;
  }

  return review.state === 'approved';
}

export async function postComment(token: string, body: string): Promise<void> {
  const prNumber = getPrNumber();
  const octokit = github.getOctokit(token);
  await octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    body
  });
}

function getPrNumber(): number {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
    throw new Error('Could not get pull request context');
  }

  const prNumber = pullRequest.number;
  if (!prNumber) {
    throw new Error('Could not get pull request number');
  }

  return prNumber;
}
