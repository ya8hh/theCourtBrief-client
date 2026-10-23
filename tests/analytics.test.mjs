import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validMeasurementId, initializeAnalytics, trackPage } from '../src/lib/analytics.ts';

test('only valid GA4 identifiers enable analytics', () => {
  assert.equal(validMeasurementId(' G-ABC1234567 '), 'G-ABC1234567');
  for (const id of [undefined, '', 'GTM-ABC123', 'G-ABC"<script>', 'UA-12345']) assert.equal(validMeasurementId(id), null);
});
test('one initialization, one event per navigation, no query data', () => {
  const target = {};
  initializeAnalytics(target, 'G-ABC1234567');
  initializeAnalytics(target, 'G-ABC1234567');
  assert.equal(target.dataLayer.length, 2);
  assert.equal(target.dataLayer[1][2].send_page_view, false);
  assert.equal(target.dataLayer[1][2].allow_google_signals, false);
  trackPage(target, 'https://courtroomdigest.com', '/', 'Latest', 'https://example.com/source?private=secret#fragment');
  trackPage(target, 'https://courtroomdigest.com', '/', 'Latest', '');
  trackPage(target, 'https://courtroomdigest.com', '/judgments/test', 'Article', '');
  assert.equal(target.dataLayer.length, 4);
  assert.equal(target.dataLayer[2][2].page_referrer, 'https://example.com/source');
  assert.equal(target.dataLayer[3][2].page_location, 'https://courtroomdigest.com/judgments/test');
  trackPage(target, 'https://courtroomdigest.com', '/', 'Latest', '');
  assert.equal(target.dataLayer.length, 5);
});
