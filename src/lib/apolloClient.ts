import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import getServerSession from 'next-auth'
// import { authConfig } from "../../backendLib/authOptions";

// const session = getServerSession(authConfig);
// const auth = await session.auth();

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            authorization: process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string,
        },
    }),
    cache: new InMemoryCache(),
});

export default client;