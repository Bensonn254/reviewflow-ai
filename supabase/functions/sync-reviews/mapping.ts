export function extractReviewId(raw: any) {
  if (!raw) return undefined;
  // Common patterns: name: 'accounts/.../locations/.../reviews/{id}'
  if (typeof raw.name === 'string') {
    const parts = raw.name.split('/');
    return parts[parts.length - 1];
  }
  // Other possible fields
  return raw.reviewId || raw.review_id || raw.id || raw.review?.reviewId || raw.review?.id;
}

export function parseRating(raw: any) {
  if (!raw) return undefined;
  return raw.starRating || raw.rating || raw.review?.starRating || raw.review?.rating || undefined;
}

export function parseText(raw: any) {
  if (!raw) return '';
  return (
    raw.comment ||
    raw.text ||
    raw.review?.comment ||
    raw.review?.text ||
    (typeof raw.review === 'string' ? raw.review : '') ||
    ''
  );
}

export function parseReviewerName(raw: any) {
  if (!raw) return '';
  return (
    raw.reviewer?.displayName ||
    raw.reviewer?.name ||
    raw.author ||
    raw.reviewer?.profile ||
    ''
  );
}

export function parseTime(raw: any) {
  if (!raw) return null;
  const t = raw.createTime || raw.create_time || raw.review?.createTime || raw.review?.create_time;
  if (!t) return null;
  try {
    const d = new Date(t);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch {
    return null;
  }
}

export function mapGoogleReview(raw: any, businessId: any) {
  const id = extractReviewId(raw) || `${businessId}-${Math.random().toString(36).slice(2, 9)}`;
  const rating = parseRating(raw);
  const review_text = parseText(raw);
  const reviewer_name = parseReviewerName(raw);
  const review_time = parseTime(raw) || new Date().toISOString();

  return {
    id,
    business_id: businessId,
    reviewer_name,
    rating,
    review_text,
    review_time,
    source: 'google',
    raw,
  };
}

export default mapGoogleReview;
