export const features = [
    "Zero Downtime",
    "Auto deployments",
    "Persistant disk support",
    "SSH Access",
    "Logs & metrics",
    "Scaling",
    "Instant Rollbacks"
]

export const plans = [
    {
        name:"Hobby", // t4g nano = 6$
        price:8,
        ram:"512 MB",
        cpu:2
    },
    {
        name:"Basic", //  t4g small = 8$
        price:15,
        ram:"2 GB",
        cpu:2
    },
    {
        name:"Plus", // t4g medium = 16$
        price:30,
        ram:"4 GB",
        cpu:2
    },
    {
        name:"Pro", // c6g extra large = 62$
        price:75,
        ram:"8 GB",
        cpu:4
    },
    {
        name:"Extra", // t4g extra large = 65$
        price:99,
        ram:"16 GB",
        cpu:4
    },
    {
        name:"Ultra", // t4g double extra large = 130$
        price:150,
        ram:"32 GB",
        cpu:8
    },
    {
        name:"Hyper", // C6G Quadruple Extra Large = 248$
        price:300,
        ram:"32 GB",
        cpu:16
    },
    {
        name:"Apex", // M6G Quadruple Extra Large = 295$
        price:350,
        ram:"64 GB",
        cpu:16
    },
    {
        name:"Divine", // INF1 6xlarge = 905$
        price:999,
        ram:"48 GB",
        cpu:24,
        gpu:"4 GPU's"
    },
]
