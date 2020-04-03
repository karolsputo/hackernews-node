const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "link-1",
    url: "www.google.com",
    description: "Search engine.",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews clone`,
    feed: () => links,
    link: (id) => links.find((link) => id === link.id) || null,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find((link) => args.id === link.id);
      const index = links.indexOf(link);
      const updatedLink = {
        id: link.id,
        url: args.url,
        description: args.description,
      };
      links[index] = updatedLink;
      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const link = links.find((link) => args.id === link.id);
      const index = links.indexOf(link);
      links.splice(index, 1);
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
