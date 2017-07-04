import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import schema from './graphql';
const app = express();

mongoose.connect('mongodb://localhost:27017/testing');
const db = mongoose.connection
db.on('error', () => console.log("Failed to connect to database."))
	.once('open', () => console.log("Connected to database."))

app.get('/', (req, res) => {
  res.send("Hello; Wold, this is a GraphQL API.");
});

// GraphQL API endpoint
app.use('/graphql', graphqlHTTP(() => ({
  schema,
  graphiql: true,
  pretty: true
})))

app.listen(3000, () => {
  console.log('GraphQL server running at port 3000...')
})