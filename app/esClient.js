const es = require("elasticsearch");

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";

const esClient = new es.Client({
  host: elasticUrl,
});

module.exports = esClient;
