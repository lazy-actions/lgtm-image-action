import * as github from '@actions/github';
import {isReviewApproval} from '../src/github';

describe('Check whether review approved event', () => {
  test('Pull request open', () => {
    github.context.payload = {
      action: 'opened',
      pull_request: {
        number: 1
      }
    };
    expect(isReviewApproval()).toBe(false);
  });

  test('Review comment', () => {
    github.context.payload = {
      action: 'submitted',
      review: {
        state: 'commented'
      },
      pull_request: {
        number: 1
      }
    };
    expect(isReviewApproval()).toBe(false);
  });

  test('Pull request review is approved', () => {
    github.context.payload = {
      action: 'submitted',
      review: {
        state: 'approved'
      },
      pull_request: {
        number: 1
      }
    };
    expect(isReviewApproval()).toBe(true);
  });
});
