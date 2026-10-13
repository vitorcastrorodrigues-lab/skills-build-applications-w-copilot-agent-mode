export function extractCollection(payload, resource) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    throw new TypeError(`The ${resource} API response must be an array or an object.`);
  }

  for (const key of [resource, 'results', 'data', 'items']) {
    if (Object.hasOwn(payload, key)) {
      return extractCollection(payload[key], resource);
    }
  }

  throw new TypeError(`The ${resource} API response does not contain a supported collection.`);
}
