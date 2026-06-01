# ADR 002 — Three Database Strategy

**Date:** 2026-05-30
**Status:** Accepted

## Context
Platform has three distinct data workloads: relational content/user data, high-volume analytics events, and ephemeral cache data.

## Decision
Use PostgreSQL + MongoDB + Redis, one per workload.

## Reasons
- PostgreSQL: ACID guarantees for user accounts and content
- MongoDB: schema flexibility for analytics events; efficient time-series aggregation
- Redis: sub-millisecond reads; native TTL support for automatic cache expiry

## Trade-offs
- Three systems to operate and monitor
- Mitigated by clear ownership boundaries and Docker Compose local setup
