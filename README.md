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

- [Apache Doris](https://doris.apache.org/)
- [Apache Druid](https://druid.apache.org/)
- [Apache HBase](https://hbase.apache.org/)
- [Apache Pinot](https://pinot.apache.org/)
- [Clickhouse](https://clickhouse.com)
- [StarRocks](https://www.starrocks.io/)

### Search engines

- [Elasticsearch](https://www.elastic.co/) - Search and analytics engine based on Apache Lucene.
- [Meilisearch](https://www.meilisearch.com/) - Open source search engine, that aims to be a ready-to-go solution.
- [OpenSearch](https://opensearch.org/) - Apache 2.0 fork of Elasticsearch.
- [Quickwit](https://quickwit.io/) - Search engine on top of object storage, using shared-everything architecture.
- [Typesense](https://typesense.org/) - Оpen-source, typo-tolerant search engine optimized for instant search-as-you-type experiences and developer productivity.

### NewSQL
 
- [Citus](https://www.citusdata.com/) - PostgreSQL compatible distributed table.
- [TiDB](https://github.com/pingcap/tidb) - MySQL compatible SQL database that supports hybrid transactional and analytical processing workloads.

### Timeseries

- [Grafana Mimir](https://grafana.com/oss/mimir/) - Prometheus compatible TSDB on top of object storage.
- [TimeScaleDB](https://www.timescale.com/) - PostgreSQL compatible TSDB.

### Managed cloud services

- [AWS Redshift](https://aws.amazon.com/redshift/)
- [Azure Synapse Analytics](https://azure.microsoft.com/en-us/products/synapse-analytics)
- [Databricks](https://www.databricks.com/)
- [Firebolt](https://www.firebolt.io/)
- [Google Big Query](https://cloud.google.com/bigquery)
- [Snowflake](https://www.snowflake.com/en/)

## Data lake

The data lake approach (or "lakehouse") is a semi-structured schema that sit on top of object storage in the cloud.

It is composed of a few layers (from lower to higher level): codec, file format, table format + metastore, and the ingestion/query layer.

### File formats and serialization

These formats are popular for shared-everything databases, using object storage as persistence layer. The data is organized in row or column, with strict schema definition. These files are immutable and offer partial reads (only headers, metadata, data page, etc). Mutation require a new upload. Most formats support nested schema, codecs, compression and data encryption. Index can be added to file metadata for faster processing.

A single file can weight between tens of MB to a few GB. Lot of small files require more merge operation. Larger files can be costly to update.

- [Apache Arrow Columnar Format](https://arrow.apache.org/docs/format/Columnar.html) - Columnar format for in-memory Apache Arrow processing.
- [Apache Avro](https://avro.apache.org/) - Row-oriented serialization for data streaming purpose.
- [Apache ORC](https://orc.apache.org/) - Column-oriented serialization for data storage purpose. Part of Hadoop platform.
- [Apache Parquet](https://parquet.apache.org/) - Column-oriented serialization for data storage purpose.
- [Apache Thrift](https://thrift.apache.org/) - Row-oriented serialization for RPC purpose.
- [Google Protobuf](https://protobuf.dev/) - Row-oriented serialization for RPC purpose.
- [Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html) - Centralized repository for validating row-oriented events. Part of Kafka and Confluent platform.

### Open table formats

Open table formats are abstraction layer on top of Avro/Parquet files, with support for ACID transaction, CDC, partitioning, mixed streaming/batching processing, schema evolution and mutation. Schema and statistics are stored in a metastore, data is persisted locally or in a remote/cloud object storage.

Open tables are a cost-effective datawarehouse for petabyte scale.

- [Apache Iceberg](https://iceberg.apache.org/)
- [Apache Hive](https://hive.apache.org/)
- [Apache Hudi](https://hudi.apache.org/)
- [DeltaLake](https://delta.io/)

Comparison:
- (2022) https://medium.com/geekculture/open-table-formats-delta-iceberg-hudi-732f682ec0bb
- (2023) https://aws.amazon.com/blogs/big-data/choosing-an-open-table-format-for-your-transactional-data-lake-on-aws/

👆 Warning: pre-2022 articles should be considered as out-of-date, as open table formats are evolving quickly.

### Metastore

- [AWS Glue](https://aws.amazon.com/glue/)
- [Databricks unity catalog](https://docs.databricks.com/en/data-governance/unity-catalog/index.html)
- [Hive Metastore](https://cwiki.apache.org/confluence/display/hive/design) - Component of Hadoop HiveServer2, that can be used standalone.
- [Nessie](https://projectnessie.org/)

### Object Storage

- [Apache HDFS](https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html) - Hadoop distributed file system.
- [AWS S3](https://aws.amazon.com/s3/)
- [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs)
- [GCP Cloud Storage](https://cloud.google.com/storage)
- [Minio](https://min.io/) - S3 compatible and self-hosted object storage.

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

- [Apache Kafka](https://kafka.apache.org/)
- [Apache Pulsar](https://pulsar.apache.org/)
- [Rabbitmq Streams](https://www.rabbitmq.com/streams.html)

## Ingestion and querying

### Stream processing

Process a set of data in real-time (or near-real-time), as it is being generated.

- [Apache Beam](https://beam.apache.org/) - Unified SDK for cross language stream processing. Available in Go, Python, Java, Scala and Typescript.
- [Apache Flink](https://flink.apache.org/) - Stateful stream processing.
- [Apache Kafka stream](https://kafka.apache.org/documentation/streams/) - Stream processing.
- [Apache Spark streaming](https://spark.apache.org/streaming/) - Stream processing on top of Spark.
- [Akka stream](https://doc.akka.io/docs/akka/current/stream/index.html) - Stream processing.
- [Benthos](https://www.benthos.dev/) - Go stream processing.

### Batch processing

Process periodically a large amount of data in a single batch.

- [Apache Spark](https://spark.apache.org/)
- [MapReduce](https://en.wikipedia.org/wiki/MapReduce)

### In-memory processing

Non real-time SQL queries executed against a large database can be processed locally. This method might not fit into memory or lead to very long job duration.

- [Apache Arrow](https://arrow.apache.org/) - Low-level in-memory data processing. Zero-copy data manipulation for any language, via gRPC/IPC interfaces.
- [Apache Arrow Datafusion](https://arrow.apache.org/datafusion/) - High level SQL interface for Apache Arrow.
- [delta-rs](https://github.com/delta-io/delta-rs) - Standalone DeltaLake driver for Python and Rust. Do not depend on Spark.
- [Delta Standalone](https://docs.delta.io/latest/delta-standalone.html) - Standalone DeltaLake driver for Java and Scala. Do not depend on Spark.
- [DuckDB](https://duckdb.org/) - In-process SQL query engine for processing Parquet files. Built on top of Apache Arrow.
- [Pandas](https://pandas.pydata.org/) - Python data analysis and manipulation tool.
- [clickhouse-local](https://clickhouse.com/docs/en/operations/utilities/clickhouse-local) - Lightweight CLI version of Clickhouse for running SQL queries against CSV, JSON, Parquet, etc files.

### Distributed SQL processing

These SQL engines distribute SQL queries processing of very large database on a cluster. Support of ANSI SQL.

- [Apache Spark SQL](https://spark.apache.org/sql/) - Distributed SQL query engine that sit on top of Spark.
- [ksql](https://ksqldb.io/) - SQL interface for Kafka.
- [PrestoDB](https://prestodb.io/) - Distributed SQL query engine.
- [Trino](https://trino.io/) - Distributed SQL query engine. Fork of PrestoDB.

## Scheduler

These tools allow to orchestrate, schedule and monitor repetitive data transformations, in a workflow manner.

- [Apache Airflow](https://airflow.apache.org/)
- [Dagster](https://dagster.io/)

## ETL, ELT and reverse ETL

The popular acronym for Extracting, Transforming and Loading data. ELT performs data transformations directly within the data warehouse. Reverse ETL is the process of copying data from your datawarehouse to external tools or SaaS.

- [Airbyte](https://airbyte.com/) - ELT.
- [Census](https://www.getcensus.com/) - Reverse ETL.
- [RudderStack](https://www.rudderstack.com/) - Customer Data Platform. Pipeline between a tracking plan, event transformation, and destination tools (datawarehouse or SaaS).

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

- [ANN (approximate nearest neighbor)](https://en.wikipedia.org/wiki/Nearest_neighbor_search)
- [kNN (k nearest neighbor)](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm)
- [Faiss](https://faiss.ai/)
- [HNSW](https://towardsdatascience.com/similarity-search-part-4-hierarchical-navigable-small-world-hnsw-2aad4fe87d37)

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

// TODO

## Events

// TODO

## Communities

// TODO

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
