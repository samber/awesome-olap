<!--lint disable awesome-toc-->
<div align="center">

# Awesome OLAP [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A curated list of awesome open-source Online Analytical Processing <b>databases, frameworks, ressources, tools</b> and other awesomeness, for data engineers.

</div>

<!--lint disable awesome-list-item-->
- [OLAP Databases](#olap-databases)
  - [Real-time analytics](#real-time-analytics)
  - [Search engines](#search-engines)
  - [NewSQL](#newsql)
  - [Timeseries](#timeseries)
  - [Managed cloud services](#managed-cloud-services)
- [Storage engines](#storage-engines)
- [Data lake](#data-lake)
  - [File formats and serialization](#file-formats-and-serialization)
  - [Open table formats](#open-table-formats)
  - [Metastore](#metastore)
  - [Object Storage](#object-storage)
  - [Codecs, encoding and compression](#codecs-encoding-and-compression)
- [Brokers and distributed messaging](#brokers-and-distributed-messaging)
- [Ingestion and querying](#ingestion-and-querying)
  - [Stream processing](#stream-processing)
  - [Batch processing](#batch-processing)
  - [In-memory processing](#in-memory-processing)
  - [Distributed SQL processing](#distributed-sql-processing)
- [Scheduler](#scheduler)
- [Durable execution](#durable-execution)
- [ETL, ELT and reverse ETL](#etl-elt-and-reverse-etl)
- [Datasets](#datasets)
- [Benchmark](#benchmark)
- [Readings](#readings)
  - [Papers](#papers)
  - [Architecture](#architecture)
  - [Data modeling](#data-modeling)
  - [Index](#index)
  - [Vector similarity search](#vector-similarity-search)
  - [Vectorized query processing](#vectorized-query-processing)
  - [Querying](#querying)
  - [Transactions](#transactions)
  - [Consensus](#consensus)
  - [Challenging platforms](#challenging-platforms)
  - [Blogs to follow](#blogs-to-follow)
  - [More](#more)
- [People to follow](#people-to-follow)
- [Events](#events)
- [Communities](#communities)

## OLAP Databases

### Real-time analytics

The following columnar databases use a [shared-nothing architecture](https://en.wikipedia.org/wiki/Shared-nothing_architecture) and provide a sub-second response time. DDL, DML and DCL are operated via SQL. These databases also support tiering for long-term cold storage.

- [Apache Doris](https://doris.apache.org/) - MPP analytical database with MySQL-compatible interface, optimized for high-concurrency queries and real-time data ingestion.
- [Apache Druid](https://druid.apache.org/) - Real-time OLAP database optimized for streaming ingestion, time-series analytics, and sub-second queries on high-cardinality data.
- [Apache HBase](https://hbase.apache.org/) - Distributed, wide-column NoSQL database on top of HDFS, modeled after Google Bigtable.
- [Apache Pinot](https://pinot.apache.org/) - Distributed OLAP datastore for user-facing real-time analytics, designed for low-latency queries at high concurrency.
- [Clickhouse](https://clickhouse.com) - Column-oriented DBMS for online analytical processing, capable of processing billions of rows per second.
- [StarRocks](https://www.starrocks.io/) - MPP OLAP database with vectorized execution engine, optimized for real-time analytics and high-concurrency workloads.
- [Dremio](https://www.dremio.com/) - SQL lakehouse platform providing a semantic layer and query acceleration on top of data lakes.

### Search engines

- [Elasticsearch](https://www.elastic.co/) - Search and analytics engine based on Apache Lucene.
- [Meilisearch](https://www.meilisearch.com/) - Open source search engine, that aims to be a ready-to-go solution.
- [OpenSearch](https://opensearch.org/) - Apache 2.0 fork of Elasticsearch.
- [Quickwit](https://quickwit.io/) - Search engine on top of object storage, using shared-everything architecture.
- [Typesense](https://typesense.org/) - Оpen-source, typo-tolerant search engine optimized for instant search-as-you-type experiences and developer productivity.

### Hybrid OLAP/OLTP NewSQL (aka HTAP)
 
- [Citus](https://www.citusdata.com/) - PostgreSQL compatible distributed table.
- [TiDB](https://github.com/pingcap/tidb) - MySQL compatible SQL database that supports hybrid transactional and analytical processing workloads.

### Timeseries

- [Grafana Mimir](https://grafana.com/oss/mimir/) - Prometheus-compatible TSDB on top of object storage, horizontally scalable.
- [Prometheus](https://prometheus.io/) - Pull-based metrics collection and time series database, de facto standard for cloud-native monitoring.
- [TimeScaleDB](https://www.timescale.com/) - PostgreSQL-compatible TSDB with automatic partitioning and time-series-specific SQL extensions.
- [VictoriaMetrics](https://victoriametrics.com/) - Fast, cost-effective Prometheus-compatible TSDB with low memory and storage footprint.

### Managed cloud services

- [AWS Redshift](https://aws.amazon.com/redshift/) - Fully managed petabyte-scale data warehouse on AWS.
- [Azure Synapse Analytics](https://azure.microsoft.com/en-us/products/synapse-analytics) - Unified analytics service combining data integration, warehousing, and big data on Azure.
- [Databricks](https://www.databricks.com/) - Lakehouse platform combining data warehousing and ML, built on Delta Lake and Apache Spark.
- [Firebolt](https://www.firebolt.io/) - Cloud-native OLAP warehouse engineered for sub-second query performance at scale.
- [Google BigQuery](https://cloud.google.com/bigquery) - Serverless, pay-as-you-go data warehouse with built-in ML and BI capabilities.
- [Snowflake](https://www.snowflake.com/en/) - Cloud data platform with a decoupled storage and compute architecture, supporting multi-cloud deployments.
- [Tinybird](https://www.tinybird.co/) - Real-time analytics API platform built on ClickHouse.

## Data lake

The data lake approach (or "lakehouse") is a semi-structured schema that sits on top of object storage in the cloud.

It is composed of a few layers (from lower to higher level): codec, file format, table format + metastore, and the ingestion/query layer.

### File formats and serialization

These formats are popular for shared-everything databases, using object storage as a persistence layer. The data is organized in row or column, with strict schema definition. These files are immutable and offer partial reads (only headers, metadata, data page, etc). Mutation requires a new upload. Most formats support nested schema, codecs, compression, and data encryption. Index can be added to file metadata for faster processing.

A single file can weight between tens of MB to a few GB. Lots of small files require more merge operation. Larger files can be costly to update.

- [Apache Arrow Columnar Format](https://arrow.apache.org/docs/format/Columnar.html) - Columnar format for in-memory Apache Arrow processing.
- [Apache Avro](https://avro.apache.org/) - Row-oriented serialization for data streaming purpose.
- [Apache ORC](https://orc.apache.org/) - Column-oriented serialization for data storage purpose. Part of Hadoop platform.
- [Apache Parquet](https://parquet.apache.org/) - Column-oriented serialization for data storage purpose.
- [Apache Thrift](https://thrift.apache.org/) - Row-oriented serialization for RPC purpose.
- [Google Protobuf](https://protobuf.dev/) - Row-oriented serialization for RPC purpose.
- [Cap’n Proto](https://capnproto.org/) - Row-oriented serialization with zero-copy access, as fast as mmap.
- [Flatbuffer](https://flatbuffers.dev/) - Row-oriented serialization with zero-copy access, as fast as mmap.
- [Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html) - Centralized repository for validating row-oriented events. Part of Kafka and Confluent platform.

### Open table formats

Open table formats are abstraction layer on top of Avro/Parquet files, with support for ACID transaction, CDC, partitioning, mixed streaming/batching processing, schema evolution and mutation. Schema and statistics are stored in a metastore, data is persisted locally or in a remote/cloud object storage.

Open tables are a cost-effective datawarehouse for petabyte scale.

- [Apache Hive](https://hive.apache.org/) - SQL-based data warehouse and query engine on top of Hadoop, and the origin of the Hive Metastore used by modern table formats.
- [Apache Hudi](https://hudi.apache.org/) - Open table format with strong CDC and upsert support, designed for incremental data pipelines.
- [Apache Iceberg](https://iceberg.apache.org/) - Open table format for huge analytic datasets, with snapshot isolation, schema evolution, and partition pruning.
- [DeltaLake](https://delta.io/) - Open table format bringing ACID transactions and scalable metadata to Apache Spark and beyond.

Comparison:
- (2022) https://medium.com/geekculture/open-table-formats-delta-iceberg-hudi-732f682ec0bb
- (2023) https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/

👆 Warning: pre-2022 articles should be considered as out-of-date, as open table formats are evolving quickly.

### Metastore

- [AWS Glue](https://aws.amazon.com/glue/) - Serverless data integration service with a managed catalog for AWS data assets.
- [Databricks unity catalog](https://docs.databricks.com/en/data-governance/unity-catalog/index.html) - Unified governance layer for data and AI assets across the Databricks platform.
- [Hive Metastore](https://cwiki.apache.org/confluence/display/hive/design) - Component of Hadoop HiveServer2 that can be used standalone as a schema registry for table metadata.
- [Nessie](https://projectnessie.org/) - Git-like versioning catalog for data lakes, enabling branch and merge operations on Iceberg/Delta/Hudi tables.

### Object Storage

- [Apache HDFS](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html) - Hadoop distributed file system, the original large-scale storage layer for the big data ecosystem.
- [AWS S3](https://aws.amazon.com/s3/) - Highly durable and available object storage service, the dominant cloud storage backend for data lakes.
- [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) - Microsoft's massively scalable object storage for unstructured data.
- [GCP Cloud Storage](https://cloud.google.com/storage) - Google's unified object storage service for any amount of data.
- [Minio](https://min.io/) - S3-compatible self-hosted object storage, suitable for on-premise data lake deployments.

### Codecs, encoding and compression

- [Bit packing](https://kinematicsoup.com/news/2016/9/6/data-compression-bit-packing-101)
- [Brotli](https://en.wikipedia.org/wiki/Brotli)
- [Deflate](https://en.wikipedia.org/wiki/Deflate)
- [Delta](https://en.wikipedia.org/wiki/Delta_encoding)
- [Dictionary](https://www.linkedin.com/pulse/encodings-parquet-akhil-pathirippilly-mana/)
- [Gorilla](https://dl.acm.org/doi/10.14778/2824032.2824078)
- [LZ4](https://en.wikipedia.org/wiki/LZ4_(compression_algorithm))
- [RLE](https://www.linkedin.com/pulse/encodings-parquet-akhil-pathirippilly-mana)
- [Snappy](https://en.wikipedia.org/wiki/Snappy_(compression))
- [zstd](https://en.wikipedia.org/wiki/Zstd)

## Brokers and distributed messaging

- [Apache Kafka](https://kafka.apache.org/) - Distributed event streaming platform, the de facto standard for high-throughput data pipelines and event-driven architectures.
- [Apache Pulsar](https://pulsar.apache.org/) - Distributed messaging and streaming platform with multi-tenancy, geo-replication, and a decoupled storage layer.
- [NATS / JetStream](https://nats.io/) - Lightweight cloud-native messaging system; JetStream adds persistence, replay, and streaming semantics.
- [RabbitMQ Streams](https://www.rabbitmq.com/streams.html) - Persistent, append-only log streams for RabbitMQ, enabling high-throughput message replay and fan-out.
- [Redpanda](https://redpanda.com/) - Kafka-compatible streaming data platform written in C++, with no ZooKeeper dependency and lower latency.

## Ingestion and querying

### Stream processing

Process a set of data in real-time (or near-real-time), as it is being generated.

- [Akka Streams](https://doc.akka.io/docs/akka/current/stream/index.html) - Reactive stream processing library for JVM, built on the actor model.
- [Apache Beam](https://beam.apache.org/) - Unified SDK for cross-language stream and batch processing. Available in Go, Python, Java, Scala and TypeScript.
- [Apache Flink](https://flink.apache.org/) - Stateful stream processing with exactly-once semantics, supporting event time and out-of-order data.
- [Apache Kafka Streams](https://kafka.apache.org/documentation/streams/) - Lightweight stream processing library embedded in the Kafka client, no separate cluster required.
- [Apache Spark Streaming](https://spark.apache.org/streaming/) - Micro-batch stream processing on top of Spark, integrating with the broader Spark ecosystem.
- [Benthos](https://www.benthos.dev/) - Declarative stream processing toolkit in Go, with a wide connector library.
- [Materialize](https://materialize.com/) - Operational data warehouse that incrementally maintains SQL views over streaming data, always-fresh without recomputation.
- [RisingWave](https://risingwave.com/) - Distributed SQL streaming database (PostgreSQL-compatible) with sub-100ms end-to-end freshness and native Iceberg integration.

### Batch processing

Process periodically a large amount of data in a single batch.

- [Apache Spark](https://spark.apache.org/) - Distributed batch processing engine with in-memory computation, supporting SQL, ML, and graph workloads.
- [MapReduce](https://en.wikipedia.org/wiki/MapReduce) - Programming model for processing large datasets in parallel across a cluster; the foundation of the Hadoop ecosystem.

### In-memory processing

Non real-time SQL queries executed against a large database can be processed locally. This method might not fit into memory or lead to very long job duration.

- [Apache Arrow](https://arrow.apache.org/) - Low-level in-memory columnar data format with zero-copy access across languages via gRPC/IPC interfaces.
- [Apache Arrow DataFusion](https://arrow.apache.org/datafusion/) - High-level SQL and DataFrame query engine built on Apache Arrow, written in Rust.
- [chDB](https://github.com/chdb-io/chdb) - Embeddable in-process OLAP engine powered by ClickHouse, callable from Python without a server.
- [clickhouse-local](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local) - Lightweight CLI version of ClickHouse for running SQL queries against CSV, JSON, Parquet and other files.
- [delta-rs](https://github.com/delta-io/delta-rs) - Standalone DeltaLake driver for Python and Rust. Does not depend on Spark.
- [Delta Standalone](https://docs.delta.io/latest/delta-standalone.html) - Standalone DeltaLake driver for Java and Scala. Does not depend on Spark.
- [DuckDB](https://duckdb.org/) - In-process SQL OLAP query engine for Parquet, CSV, and JSON files. Built on Apache Arrow.
- [Pandas](https://pandas.pydata.org/) - Python DataFrame library for data analysis and manipulation, the standard for data science workflows.
- [Polars](https://pola.rs/) - High-performance DataFrame library written in Rust with a lazy query optimizer, significantly faster than Pandas.

### Distributed SQL processing

These SQL engines distribute SQL queries processing of very large database on a cluster. Support of ANSI SQL.

- [Apache Spark SQL](https://spark.apache.org/sql/) - Distributed SQL query engine that sit on top of Spark.
- [ksql](https://ksqldb.io/) - SQL interface for Kafka.
- [PrestoDB](https://prestodb.io/) - Distributed SQL query engine.
- [Trino](https://trino.io/) - Distributed SQL query engine. Fork of PrestoDB.

## Scheduler

These tools allow to orchestrate, schedule and monitor repetitive data transformations, in a workflow manner.

- [Apache Airflow](https://airflow.apache.org/) - Platform for programmatically authoring, scheduling, and monitoring data pipelines as DAGs.
- [Dagster](https://dagster.io/) - Data orchestration platform with an asset-centric approach, lineage tracking, and built-in observability.

## Durable execution

Durable execution frameworks guarantee that workflows survive process crashes, network failures, and infrastructure restarts by persisting execution state automatically.

- [Temporal](https://temporal.io/) - Durable workflow execution platform for building fault-tolerant pipelines and long-running data processes.

## ETL, ELT and reverse ETL

The popular acronym for Extracting, Transforming and Loading data. ELT performs data transformations directly within the data warehouse. Reverse ETL is the process of copying data from your datawarehouse to external tools or SaaS.

- [Airbyte](https://airbyte.com/) - Open-source ELT platform with 300+ pre-built connectors for syncing data to your warehouse.
- [Census](https://www.getcensus.com/) - Reverse ETL platform for syncing data warehouse data to CRMs, ad tools, and other SaaS.
- [dbt](https://www.getdbt.com/) - SQL-based transformation framework that runs inside your warehouse; the standard tool for the T in ELT.
- [RudderStack](https://www.rudderstack.com/) - Customer Data Platform providing a pipeline between a tracking plan, event transformation, and destination tools.

## Datasets

- [awesome-public-datasets](https://github.com/awesomedata/awesome-public-datasets)
- [CommonCrawl](https://commoncrawl.org/)
- [Criteo](https://ailab.criteo.com/download-criteo-1tb-click-logs-dataset/)
- [Entso-e](https://www.entsoe.eu/data/power-stats/)
- [GitHub Archives](https://www.gharchive.org/)
- [Kaggle](https://www.kaggle.com/) - Community sourced dataset.
- [NYCTaxy](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)

## Benchmark

- [Jepsen](https://jepsen.io/) - Distributed databases, queues and consensus protocols testing.
- [TPC family benchmarks](https://www.tpc.org/information/benchmarks5.asp) - For big data based database.

## Readings

### Papers

- [Apache Flink state management](https://www.vldb.org/pvldb/vol10/p1718-carbone.pdf)
- [Apache Parquet format](https://github.com/apache/parquet-format/)
- [Dremel paper](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/36632.pdf)
- [RDD](https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf)
- [RocksDB](https://research.facebook.com/publications/rocksdb-evolution-of-development-priorities-in-a-key-value-store-serving-large-scale-applications/)
- [Spanner paper](https://static.googleusercontent.com/media/research.google.com/en/us/archive/spanner-osdi2012.pdf)

### Architecture

- [CoW vs MoR](https://www.onehouse.ai/blog/comparing-apache-hudis-mor-and-cow-tables-use-cases-from-uber-and-shopee)
- [DAG](https://docs.getdbt.com/terms/dag)
- [Kappa architecture](https://milinda.pathirage.org/kappa-architecture.com/)
- [Lambda architecture](https://www.snowflake.com/guides/lambda-architecture)
- [Medallion architecture](https://dataengineering.wiki/Concepts/Medallion+Architecture)
- [Reactive programming](https://reactivex.io/)

### Data modeling

- [Schema evolution](https://www.databricks.com/blog/2019/09/24/diving-into-delta-lake-schema-enforcement-evolution.html)
- [CDC](https://en.wikipedia.org/wiki/Change_data_capture)

### Index

- [Partitioning](https://airbyte.com/data-engineering-resources/what-is-data-partitioning)
- [Data skipping](https://clickhouse.com/docs/en/optimize/skipping-indexes)
- [Statistics](https://cwiki.apache.org/confluence/display/Hive/StatsDev)
- [High cardinality](https://www.timescale.com/blog/what-is-high-cardinality-how-do-time-series-databases-influxdb-timescaledb-compare/)
- [HyperLogLog](https://engineering.fb.com/2018/12/13/data-infrastructure/hyperloglog/)
- [Bloom filters](https://systemdesign.one/bloom-filters-explained/)
- [Minmax](https://blog.cloudera.com/speeding-up-select-queries-with-parquet-page-indexes/)
- [Z-ordering](https://blog.cloudera.com/speeding-up-queries-with-z-order/)
- [Bitmap index](https://en.wikipedia.org/wiki/Bitmap_index)
- [Dense index](https://www.dremio.com/wiki/dense-index/)
- [Sparse index](https://www.dremio.com/wiki/sparse-index/)
- [Reverse index](https://en.wikipedia.org/wiki/Reverse_index)
- [N-gram](https://www.postgresql.org/docs/current/pgtrgm.html)
- [TF-IDF](https://medium.com/codex/document-indexing-using-tf-idf-189afd04a9fc)
- [LSM Tree](https://en.wikipedia.org/wiki/Log-structured_merge-tree)

### Vector similarity search

Algorithms and indexes:

- [ANN (approximate nearest neighbor)](https://en.wikipedia.org/wiki/Nearest_neighbor_search)
- [kNN (k nearest neighbor)](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
- [Faiss](https://faiss.ai/) - Facebook AI library for efficient similarity search and clustering of dense vectors.
- [HNSW](https://towardsdatascience.com/similarity-search-part-4-hierarchical-navigable-small-world-hnsw-2aad4fe87d37) - Hierarchical Navigable Small World graph index for approximate nearest neighbor search.

Dedicated vector databases:

- [Chroma](https://www.trychroma.com/) - Lightweight open-source vector database for AI/RAG applications, optimized for developer simplicity.
- [LanceDB](https://lancedb.github.io/lancedb/) - Embedded, serverless vector database built on the Lance columnar format (Apache Arrow-based).
- [Milvus](https://milvus.io/) - Distributed open-source vector database designed for billion-scale similarity search.
- [pgvector](https://github.com/pgvector/pgvector) - Open-source vector similarity search extension for PostgreSQL.
- [Qdrant](https://qdrant.tech/) - High-performance vector search engine written in Rust, with rich payload filtering and production-grade reliability.
- [Weaviate](https://weaviate.io/) - AI-native vector database with built-in vectorization modules, hybrid search, and GraphQL/REST APIs.

### Vectorized query processing

- [Apache Arrow vectorized execution](https://www.youtube.com/watch?v=JIZGDdbtowg)
- [Apache Arrow SIMD parallel processing](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data)
- [Cockroach vectorized JOIN](https://faculty.cc.gatech.edu/~jarulraj/courses/4420-f20/slides/cockroachdb.pdf)
- [Latency comparison numbers](https://gist.github.com/hyunsik/d2df09cffc7c81a5546b4540c9865f0e#file-latency_comparison_numbers-txt)

### Querying

- [Cost Based Optimization](https://www.databricks.com/blog/2017/08/31/cost-based-optimizer-in-apache-spark-2-2.html)
- [Sampling](https://www.analyticsvidhya.com/blog/2021/09/a-complete-guide-on-sampling-techniques/)
- [GraphX](https://amplab.cs.berkeley.edu/wp-content/uploads/2014/02/graphx.pdf)

### Transactions

- [ACID properties](https://en.wikipedia.org/wiki/ACID)
- [Serializable transaction](https://www.cockroachlabs.com/docs/stable/demo-serializable)

### Consensus

- [Paxos](https://www.youtube.com/watch?v=d7nAGI_NZPk)
- [Raft](https://thesecretlivesofdata.com/raft/)

### Challenging platforms

- [Datadog event store](https://www.datadoghq.com/blog/engineering/introducing-husky/)
- [Cloudflare logging](https://blog.cloudflare.com/http-analytics-for-6m-requests-per-second-using-clickhouse/)

### Blogs to follow

- [Engineering at Meta](https://engineering.fb.com/)
- [Engineering at Criteo](https://medium.com/criteo-engineering)
- [Engineering at Uber](https://www.uber.com/en-US/blog/engineering/)
- [Engineering at Airbnb](https://medium.com/airbnb-engineering)
- [Databricks](https://www.databricks.com/blog/category/engineering)
- [Towards Data Science](https://towardsdatascience.com/)

### More

- https://www.moderndatastack.xyz/
- https://books.japila.pl/
- https://jepsen.io/analyses
- https://github.com/aphyr/distsys-class

## People to follow

| Name | Description | GitHub | Twitter/X | LinkedIn | Bluesky |
|------|-------------|--------|-----------|----------|---------|
| Alexey Milovidov | Co-founder and CTO of ClickHouse | [alexey-milovidov](https://github.com/alexey-milovidov) | [@fdooch123](https://x.com/fdooch123) | [in/alexey-milovidov-clickhouse](https://www.linkedin.com/in/alexey-milovidov-clickhouse) | |
| Hannes Mühleisen | Co-creator of DuckDB, CEO of DuckDB Labs | [hannes](https://github.com/hannes) | [@hfmuehleisen](https://x.com/hfmuehleisen) | [in/hfmuehleisen](https://www.linkedin.com/in/hfmuehleisen) | [bsky](https://bsky.app/profile/hannes.muehleisen.org) |
| Mark Raasveldt | Co-creator of DuckDB | [Mytherin](https://github.com/Mytherin) | [@mraasveldt](https://x.com/mraasveldt) | [in/mark-raasveldt-256b9a70](https://www.linkedin.com/in/mark-raasveldt-256b9a70) | [bsky](https://bsky.app/profile/markraasveldt.bsky.social) |
| Wes McKinney | Creator of pandas, co-creator of Apache Arrow and Parquet | [wesm](https://github.com/wesm) | [@wesmckinn](https://x.com/wesmckinn) | [in/wesmckinn](https://www.linkedin.com/in/wesmckinn/) | [bsky](https://bsky.app/profile/wesmckinney.com) |
| Martin Traverso | Creator of Presto and Trino, CTO at Starburst | [martint](https://github.com/martint) | [@mtraverso](https://x.com/mtraverso) | [in/traversomartin](https://www.linkedin.com/in/traversomartin/) | |
| Matei Zaharia | Creator of Apache Spark, co-founder and CTO of Databricks | [mateiz](https://github.com/mateiz) | [@matei_zaharia](https://x.com/matei_zaharia) | [in/mateizaharia](https://www.linkedin.com/in/mateizaharia/) | |
| Jacques Nadeau | Co-creator of Apache Arrow, Apache Drill, and Dremio | [jacques-n](https://github.com/jacques-n) | | [in/jacquesnadeau](https://www.linkedin.com/in/jacquesnadeau/) | [bsky](https://bsky.app/profile/jdata.bsky.social) |
| Andrew Lamb | PMC member for Apache Arrow, DataFusion, and Parquet | [alamb](https://github.com/alamb) | [@andrewlamb1111](https://x.com/andrewlamb1111) | [in/andrewalamb](https://www.linkedin.com/in/andrewalamb/) | [bsky](https://bsky.app/profile/andrewlamb1111.bsky.social) |
| Andy Grove | PMC member of Apache Arrow and DataFusion. Author of "How Query Engines Work" | [andygrove](https://github.com/andygrove) | | [in/andygrove](https://www.linkedin.com/in/andygrove/) | [bsky](https://bsky.app/profile/andygrove.io) |
| Tristan Handy | Founder and CEO of dbt Labs | [jthandy](https://github.com/jthandy) | [@jthandy](https://x.com/jthandy) | [in/tristanhandy](https://www.linkedin.com/in/tristanhandy) | [bsky](https://bsky.app/profile/jthandy.bsky.social) |
| Fokko Driesprong | PMC member on Apache Avro, Airflow, Druid, Iceberg, and Parquet | [Fokko](https://github.com/Fokko) | [@_Fokko](https://x.com/_Fokko) | [in/fokkodriesprong](https://www.linkedin.com/in/fokkodriesprong) | |
| Gian Merlino | Co-founder and CTO of Imply, co-creator of Apache Druid | [gianm](https://github.com/gianm) | [@gianmerlino](https://x.com/gianmerlino) | [in/gianmerlino](https://www.linkedin.com/in/gianmerlino) | |
| Phil Eaton | Database and systems engineer, writer on database internals | [eatonphil](https://github.com/eatonphil) | [@eatonphil](https://x.com/eatonphil) | [in/eatonphil](https://www.linkedin.com/in/eatonphil/) | [bsky](https://bsky.app/profile/eatonphil.bsky.social) |

## Events

- [Databricks Data+AI Summit](https://www.databricks.com/dataaisummit) - The world's largest data, analytics, and AI conference.
- [Snowflake Summit](https://www.snowflake.com/summit/) - Annual conference for data and AI practitioners.
- [Confluent Current](https://current.confluent.io/) - The Data Streaming Event focused on Apache Kafka and real-time data streaming.
- [Data Council](https://www.datacouncil.ai/) - Technical conference on data engineering, infrastructure, and analytics.
- [dbt Summit](https://www.getdbt.com/dbt-summit) - The world's largest gathering of dbt users and analytics engineering practitioners.
- [Flink Forward](https://www.flink-forward.org/) - Conference dedicated to real-time stream processing and Apache Flink.
- [Community Over Code](https://communityovercode.org/) - The Apache Software Foundation's official conference (formerly ApacheCon).
- [VLDB](https://vldb.org/) - Premier academic conference on Very Large Data Bases.
- [ACM SIGMOD/PODS](https://sigmod.org/) - Leading international forum for database researchers and practitioners.

## Communities

### Generalist

- [r/dataengineering](https://www.reddit.com/r/dataengineering/) - The largest Reddit community for data engineering discussions (300k+ members).
- [r/databasedevelopment](https://www.reddit.com/r/databasedevelopment/) - Subreddit for database internals, query engines, and storage systems (10k+ members).
- [DataTalks.Club](https://datatalks.club/slack.html) - Global Slack community for data practitioners covering data engineering, ML, and MLOps.
- [Big Data Hebdo](https://bigdatahebdo.com/) - French-language Slack community and podcast covering big data, data engineering, and analytics.
- [Software Internals](https://eatonphil.com/discord.html) - Discord community by Phil Eaton focused on database internals, compilers, and distributed systems (9k+ members).
- [Locally Optimistic](https://locallyoptimistic.com/community/) - Curated Slack community for current and aspiring analytics leaders.

### Tool-specific

- [dbt Community](https://www.getdbt.com/community/join-the-community) - 100,000+ member Slack workspace for analytics engineering and modern data stack discussions.
- [ClickHouse Community Slack](https://clickhouse.com/slack) - Active Slack workspace for ClickHouse users and developers.
- [DuckDB Discord](https://discord.gg/duckdb) - Discord server for DuckDB users covering Q&A, performance tuning, and feature discussions.
- [Trino Community Slack](https://trino.io/community.html) - 13,000+ members discussing the Trino distributed SQL query engine.
- [Apache Druid Community](https://druid.apache.org/community/) - Slack workspace and mailing lists for Apache Druid users and committers.
- [Apache Pinot Community](https://pinot.apache.org/community/) - Community Slack for real-time distributed OLAP datastore users.

## 🤝 Contributing

[Contributions of any kind welcome, just follow the guidelines](CONTRIBUTING.md)!

## 👤 Contributors

![Contributors](https://contrib.rocks/image?repo=samber/awesome-olap)

## 💫 Show your support

Give a ⭐️ if this project helped you!

[![GitHub Sponsors](https://img.shields.io/github/sponsors/samber?style=for-the-badge)](https://github.com/sponsors/samber)

## 📝 License

Copyright © 2023 [Samuel Berthe](https://github.com/samber).

This project is [MIT](./LICENSE) licensed.
