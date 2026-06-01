# ADR 003 — Cache-Aside over Write-Through

**Date:** 2026-05-31
**Status:** Accepted

## Context
Content feed is read-heavy. Needed a caching strategy that reduces DB load without risking stale data on writes.

## Decision
Use cache-aside (lazy loading) with explicit invalidation on writes.

## Reasons
- Only caches data that is actually requested
- Invalidation on write keeps cache consistent
- Simple to reason about — cache is always a copy of DB, never the source of truth

## Trade-offs
- First request after invalidation always hits the DB (cold start)
- Acceptable because publishes are infrequent compared to reads
