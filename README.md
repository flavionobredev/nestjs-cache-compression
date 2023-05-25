# Cache and Compression with NestJS

## Description

This is a sample project to demonstrate how to use cache and compression in NestJS.

## Execution

```bash
docker compose up -d
```

## Endpoints

### GET /api/world-cup/results

```bash
curl -i -X GET http://localhost:3000/api/world-cup/results
```

## Benchmark

```bash
# 100 items: results for console.log in compression
before compression length 9401
after compression length 210
```
