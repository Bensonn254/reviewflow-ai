import { describe, it, expect } from 'vitest';
import { mapGoogleReview, extractReviewId, parseRating, parseText, parseReviewerName, parseTime } from '../../supabase/functions/sync-reviews/mapping';

describe('mapGoogleReview utilities (v2)', () => {
  it('extracts id from name path', () => {
    const raw = { name: 'accounts/123/locations/456/reviews/rv789' };
    expect(extractReviewId(raw)).toBe('rv789');
  });

  it('parses rating variants', () => {
    expect(parseRating({ starRating: 5 })).toBe(5);
    expect(parseRating({ rating: 4 })).toBe(4);
    expect(parseRating({ review: { starRating: 3 } })).toBe(3);
  });

  it('parses text from nested fields', () => {
    expect(parseText({ comment: 'Great' })).toBe('Great');
    expect(parseText({ review: { comment: 'Nice' } })).toBe('Nice');
    expect(parseText({})).toBe('');
  });

  it('parses reviewer name', () => {
    expect(parseReviewerName({ reviewer: { displayName: 'Alice' } })).toBe('Alice');
    expect(parseReviewerName({ author: 'Bob' })).toBe('Bob');
  });

  it('parses time into ISO string or null', () => {
    const now = new Date().toISOString();
    expect(parseTime({ createTime: now })).toBe(now);
    expect(parseTime({})).toBeNull();
  });

  it('maps a full review object', () => {
    const raw = {
      name: 'accounts/1/locations/2/reviews/rv1',
      reviewer: { displayName: 'Charlie' },
      starRating: 5,
      comment: 'Excellent',
      createTime: '2023-01-01T00:00:00Z',
    };
    const mapped = mapGoogleReview(raw, 'biz1');
    expect(mapped.id).toBe('rv1');
    expect(mapped.business_id).toBe('biz1');
    expect(mapped.reviewer_name).toBe('Charlie');
    expect(mapped.rating).toBe(5);
    expect(mapped.review_text).toBe('Excellent');
    expect(mapped.review_time).toBe('2023-01-01T00:00:00.000Z');
    expect(mapped.raw).toBe(raw);
  });
});
