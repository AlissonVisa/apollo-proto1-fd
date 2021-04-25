import {gql} from "apollo-server";

export default gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  
  input PersonFieldNullable {
    nameNotNull: Boolean,
    lastNameNotNull: Boolean
  }
  
  type Query {
    persons(filter: PersonFieldNullable): [Person]
  }
  
  type Person @key(fields: "_id") {
    _id: ID!,
    name: String,
    lastName: String,
    active: Boolean
  }
`;
