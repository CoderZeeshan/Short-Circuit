const videoData = [
    {
        platformName: "Kling AI",
        category: "video",

        pricePerMonthINR: 956.90,
        creditsIncluded: 660,

        pricingSourceUrl:
            "https://kling.ai/blog/kling-video-3-0-credit-cost-guide",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Standard Mode",
                creditsPerGeneration: 30,
                outputSeconds: 5,
                outputResolution: "720p",
                audio: false
            },
            {
                option: "highest",
                modelName: "Professional Mode",
                creditsPerGeneration: 180,
                outputSeconds: 15,
                outputResolution: "4K",
                audio: true
            }
        ],

        qualityScore: 9.2,

        qualitySources: [],

        notesOrCaveats:
            "Standard plan: 660 monthly credits. 720p generation uses 6 credits/sec; 1080p uses 8 credits/sec. The lowest comparison uses 5 sec at 720p.",

        isEstimate: false,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    },


    {
        platformName: "Runway",
        category: "video",

        pricePerMonthINR: 1435.35,
        creditsIncluded: 625,

        pricingSourceUrl:
            "https://help.runwayml.com/hc/en-us/articles/15124877443219-How-do-credits-work",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Gen-4 Video Turbo",
                creditsPerGeneration: 25,
                outputSeconds: 5,
                outputResolution: "1280x720",
                audio: false
            },
            {
                option: "highest",
                modelName: "Gen-4.5",
                creditsPerGeneration: 120,
                outputSeconds: 10,
                outputResolution: "1280x720",
                audio: false
            }
        ],

        qualityScore: 9.2,

        qualitySources: [],

        notesOrCaveats:
            "Standard plan provides 625 monthly credits. Gen-4 Turbo uses 5 credits/sec. Gen-4.5 uses 12 credits/sec.",

        isEstimate: false,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    },


    {
        platformName: "Pika",
        category: "video",

        pricePerMonthINR: 2679.32,
        creditsIncluded: 700,

        pricingSourceUrl:
            "https://pika.art/pricing",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Pika 2.5",
                creditsPerGeneration: 24,
                outputSeconds: 10,
                outputResolution: "480p",
                audio: false
            },
            {
                option: "highest",
                modelName: "Pika 2.5",
                creditsPerGeneration: 80,
                outputSeconds: 10,
                outputResolution: "1080p",
                audio: false
            }
        ],

        // KEEP THIS EXACTLY AS REQUESTED
        qualityScore: 7.2,

        qualitySources: [],

        notesOrCaveats:
            "Current official Standard plan is $28/month billed yearly and includes 700 monthly video credits. Pika 2.5 text/image-to-video uses 24 credits for 10 sec at 480p and 80 credits for 10 sec at 1080p.",

        isEstimate: false,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    },


    {
        platformName: "Veo 3.1",
        category: "video",

        // Google AI Pro India
        pricePerMonthINR: 1950,
        creditsIncluded: 1000,

        pricingSourceUrl:
            "https://support.google.com/flow/answer/16526234",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Veo 3.1 Lite",
                creditsPerGeneration: 10,
                outputSeconds: 8,
                outputResolution: "1080p",
                audio: true
            },
            {
                option: "highest",
                modelName: "Veo 3.1 Quality",
                creditsPerGeneration: 100,
                outputSeconds: 8,
                outputResolution: "1080p",
                audio: true
            }
        ],

        qualityScore: 9.6,

        qualitySources: [],

        notesOrCaveats:
            "Google AI Pro in India costs ₹1,950/month and includes 1,000 Google Flow credits. Veo 3.1 Lite costs 10 credits per 8-second generation for non-Ultra subscribers. Veo 3.1 Quality costs 100 credits per 8-second generation. Exact native output resolution is not specified in the current Flow credit table.",

        isEstimate: false,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    },


    {
        platformName: "Seedance 2.0",
        category: "video",

        pricePerMonthINR: 3818.03,
        creditsIncluded: 1500,

        pricingSourceUrl:
            "USER_PROVIDED_SOURCE",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Seedance 2.0",
                creditsPerGeneration: 60,
                outputSeconds: 10,
                outputResolution: "480p",
                audio: true
            },
            {
                option: "highest",
                modelName: "Seedance 2.0",
                creditsPerGeneration: 700,
                outputSeconds: 10,
                outputResolution: "4K",
                audio: true
            }
        ],

        qualityScore: 9.2,

        qualitySources: [],

        notesOrCaveats:
            "Monthly plan and credit figures are based on the provider previously selected by the team. Verify this provider before final submission because Seedance pricing varies by provider.",

        isEstimate: true,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    },


    {
        platformName: "Luma",
        category: "video",

        pricePerMonthINR: 955.94,
        creditsIncluded: 3200,

        pricingSourceUrl:
            "https://lumalabs.ai/learning-hub/ray3-faq",

        generationOptions: [
            {
                option: "lowest",
                modelName: "Ray3.14 Draft",
                creditsPerGeneration: 40,
                outputSeconds: 10,
                outputResolution: "Draft",
                audio: false
            },
            {
                option: "highest",
                modelName: "Ray3.14",
                creditsPerGeneration: 800,
                outputSeconds: 10,
                outputResolution: "1080p",
                audio: false
            }
        ],

        qualityScore: 8.4,

        qualitySources: [],

        notesOrCaveats:
            "Lite web plan is $9.99/month and includes 3,200 credits. Ray3.14 Draft uses 40 credits for 10 seconds. Ray3.14 1080p uses 800 credits for 10 seconds.",

        isEstimate: false,

        comparisonBasis:
            "Equivalent INR cost for exactly 10 seconds"
    }
];

module.exports = videoData;