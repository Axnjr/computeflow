// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
export async function rewrites() {
    return [
        {
            source: '/api/execute',
            destination: 'https://1ad2rray9g.execute-api.ap-south-1.amazonaws.com/stage1/execute', // Proxy to Backend
        },
    ];
}


export async function headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
}


