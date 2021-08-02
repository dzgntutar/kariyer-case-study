const es = require("elasticsearch");

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";

const index = "kariyer";
const type = "kariyerstore";

const esclient = new es.Client({
  host: elasticUrl,
});

const esAction = {
  index: {
    _index: index,
    _type: type,
  },
};

function checkConnection() {
  return new Promise(async (resolve) => {
    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;
    while (!isConnected) {
      try {
        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;
      } catch (_) {}
    }
    resolve(true);
  });
}

async function createIndex(index) {
  try {
    await esclient.indices.create({ index });
    console.log(`index yaratıldı ${index}`);
  } catch (err) {
    console.error(`HAta index yaratılamadı ${index}:`);
    console.error(err);
  }
}

async function setWordsMapping() {
  try {
    const schema = {
      properties: {
        title: {
          type: "text",
        },
        order: {
          type: "integer",
        },
      },
    };

    await esclient.indices.putMapping({
      index,
      type,
      include_type_name: true,
      body: schema,
    });

    console.log("Mapping başarılı bir şekilde oluşturuldu");
  } catch (err) {
    console.error("Hata!! Mapping oluşturulurken hata meydana geldi");
    console.error(err);
  }
}

async function populateDatabase() {
  const illegalWords = [
    {
      title: "Hayvan",
      order: 1,
    },
    {
      title: "kendini bilmez",
      order: 2,
    },
    {
      title: "işe yaramaz",
      order: 3,
    },
  ];

  for (i = 0; i < illegalWords.length; i++) {
    const resdocumnet = await insertDoc(index, i + 1, type, illegalWords[i]);
  }
}

const insertDoc = async function (indexName, _id, mappingType, data) {
  return await esclient.index({
    index: indexName,
    type: mappingType,
    id: _id,
    body: data,
  });
};

module.exports = {
  esclient,
  setWordsMapping,
  checkConnection,
  createIndex,
  index,
  type,
  populateDatabase,
};
