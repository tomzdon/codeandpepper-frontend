import { ApolloClient, InMemoryCache } from '@apollo/client';

const apiUrl = process.env.REACT_APP_API_URL;
const awsUrl = process.env.REACT_APP_AWS_URL;
const awsApiKey = process.env.REACT_APP_API_KEY;
const isAWS = process.env.REACT_APP_ISAWS;

export const apolloClient = new ApolloClient({
  uri: isAWS ? awsUrl : apiUrl,
  headers: {
    'X-Api-Key': `${isAWS ? awsApiKey : ''}`,
  },
  cache: new InMemoryCache(),
});
