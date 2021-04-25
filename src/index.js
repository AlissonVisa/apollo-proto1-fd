import {ApolloServer} from "apollo-server";
const {buildFederatedSchema} = require('@apollo/federation');


import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen(process.env.GRAPHQL_PORT || 4001).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    console.log("Module disposed");
  });
}
