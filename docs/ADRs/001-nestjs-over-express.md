# ADR 001 — NestJS over Express

**Date:** 2026-05-30
**Status:** Accepted

## Context
Needed a Node.js backend framework that demonstrates enterprise patterns relevant to a broadcaster's engineering team.

## Decision
Use NestJS rather than raw Express.

## Reasons
- Built-in dependency injection maps directly to testable, modular code
- Decorators make intent explicit
- First-class TypeORM, Mongoose, and Passport.js integrations
- OpenAPI/Swagger generation is built in

## Trade-offs
- Higher abstraction than Express
- Steeper learning curve for developers unfamiliar with Angular-style DI
