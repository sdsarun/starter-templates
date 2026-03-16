export const HEALTH_INDICATORS = {
  DATABASE: 'database',
  MEMORY_HEAP: 'memory_heap',
  MEMORY_RSS: 'memory_rss',
  DISK: 'disk',
} as const;

export const HEALTH_THRESHOLDS = {
  MEMORY_HEAP_BYTES: 300 * 1024 * 1024, // 300MB
  MEMORY_RSS_BYTES: 512 * 1024 * 1024, // 512MB
  DISK_THRESHOLD_PERCENT: 0.9, // 90%
  DISK_PATH: '/',
} as const;
