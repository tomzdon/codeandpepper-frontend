import {ApolloClient, InMemoryCache} from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: 'https://imwlqzyzdjfhlkiytqyhn6zwnu.appsync-api.us-east-1.amazonaws.com/graphql',
    headers: {
        'X-Api-Key': 'da2-lmb3biqsxjdkznr74m3qgywlsi'
    },
    cache: new InMemoryCache()
})



