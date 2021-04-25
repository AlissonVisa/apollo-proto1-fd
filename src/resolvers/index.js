import {argsToArgsConfig} from "graphql/type/definition";

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(function (err) {
  console.log("mongodb connected");
  db = client.db("maindb"); //mongodb database name
});

const fetchPersonById = async function (id) {
  let value = await db.collection('Person').findOne({_id: id}).then(res => {
    return res
  });
  return value
};

const findAllFiltered = async function (parent, args, context, info) {
  let where = {};
  if(args.filter) {
    let nullables = [];
    let nameNotNull = args.filter.nameNotNull ? {name: {$ne: null}} : undefined;
    if(nameNotNull) nullables.push(nameNotNull);
    let lastNameNotNull = args.filter.lastNameNotNull ? {lastName: {$ne: null}} : undefined;
    if(lastNameNotNull) nullables.push(lastNameNotNull);
    if(nullables.length > 1) where = {$and: nullables};
    else if(nullables.length == 1) where = nullables[0];
    console.log(JSON.stringify(where));
  }
  let values = await db.collection('Person').find(where).toArray().then(res => {
    return res
  });
  return values
};

export default {
  Query: {
    persons: async (parent, args, context, info) => {
      return findAllFiltered(parent, args, context, info)
    },
    Person: {
      __resolveReference(person){
        return fetchPersonById(person._id)
      }
    }
  }
};