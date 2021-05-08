# LGTM Image Action

![lgtm](./img/logo.png)

## Feature

Post LGTM image when reviewer approves pull request.<br>
The image is randomly selected from [LGTMoon](https://lgtmoon.herokuapp.com/).

## Inputs

### jobs.<job_id>.steps.with

|Key|Required|Type|Default Value|Description|
|:--:|:--:|:--:|:--:|:--|
|repo-token|true|string|N/A|${{ secrets.GITHUB_TOKEN }}|
|favorite-image|false|string (comma separated)|''|Your favorite image urls. If not, choose randomly from [LGTMoon](https://lgtmoon.herokuapp.com/)|

## Example

### Basic

```yaml
name: Auto LGTM Image Submitter

on:
  pull_request_review:
    types: [submitted]

jobs:
  build:
    if: ${{ github.event.review.state == 'approved' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: lazy-actions/lgtm-image-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### Use your favorite LGTM image

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: lazy-actions/lgtm-image-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          favorite-image: 'https://your.favorite/image1.png,https://your.favorite/image2.png'
```
