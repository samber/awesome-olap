# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## PRs

ALWAYS create a new branch with your proposed changes. Thank you!

## Adding a new Item

- Try to fit your item into an existing section. [Open a suggestion](https://github.com/samber/awesome-olap/issues/new) to start a discussion about any new sections.
- Add a new item in alphabetical order within the section.
- If a duplicate item exists, discuss why the new item should replace it.
- Check your spelling & grammar.
- The item must follow this format:
  ```
  - [item name](https link) - Description beginning with capital, ending in period.
  ```

## Tool submission template

When opening an issue or PR to add a new tool, please provide:

| Field | Example |
|---|---|
| **Tool name** | ClickHouse |
| **URL** | https://clickhouse.com |
| **One-line description** | Column-oriented DBMS for online analytical processing, capable of processing billions of rows per second. |
| **Target section** | Real-time analytics |
| **Why it belongs here** | Widely adopted columnar OLAP database, used by thousands of teams for sub-second analytics on event and log data. |

## What makes a good entry

- The tool must be actively maintained (last commit or release within the past 12 months).
- The description should explain *what the tool does* and *when you would use it*, not just its marketing tagline.
- Prefer open-source tools. Closed-source / commercial tools are welcome if they are widely adopted and free to evaluate.
