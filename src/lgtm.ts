import fetch from 'node-fetch';

interface LgtmoonPayload {
  images: [
    {
      url: string;
      isConverted: boolean;
    }
  ];
}

export async function extractUrls(): Promise<string[]> {
  const res = await fetch('https://lgtmoon.dev/api/images/recent');
  const payload: LgtmoonPayload = await res.json();
  return payload.images.map((x) => x.url);
}

export function select(urls: string[]): string {
  return urls[Math.floor(Math.random() * urls.length)];
}

export function toMarkdown(url: string): string {
  return `![LGTM](${url})`;
}
