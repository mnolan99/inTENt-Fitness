// Lambda Function for Intent Fitness Alexa Skill by Martin Nolan

const Alexa = require("ask-sdk-core");

const invocationName = "intent fitness";
const MAX_NUMBER = 13; // This is the max number of audio streams in the meditation section (14 sounds)
const MAX_TIPS = 24; // This is the max number of tips in the tips array (25)
const MAX_SHORT_TIPS = 13; // This is the max number of tips that is displayed on visual output devices such as an Echo Show

// Array of tips that are read of at the end of a session
const tips = [
    "to ensure good health, eat lightly, breathe deeply, live moderately, cultivate cheerfulness, and maintain an interest in life.",
    "to keep the body in good health is a duty, otherwise we will not be able to keep the mind strong and clear.",
    "do something today that your future self will thank you for.",
    "exercising before going to bed makes your muscles burn more calories during the night.",
    "a mid-day nap improves your memory and reduces the chances of developing heart diseases.",
    "if you\’re feeling anxious and stressed, eat a melon. Melons help relieve anxiety and stress, plus they boost your metabolism.",
    "drink two cups of cold water before a meal, as this boosts metabolism by up to 30%.",
    "drinking a lot of water during the day helps you sleep better at night.",
    "a cold shower can help relieve depression and also helps keep your skin and hair healthier.",
    "the first day of the week defines your thinking patterns for the rest of the week. It\’s best to exercise on Mondays to ensure a healthy routine.",
    "your body can stand almost anything. It\’s your mind that you have to convince.",
    "fitness is like a relationship. You can\’t cheat and expect it to work.",
    "do something today that your future self will thank you for.",
    "life begins at the end of your comfort zone.",
    "the difference between try, and triumph is a little \‘umph\’.",
    "don\’t count the days, make the days count.",
    "when you feel like quitting, think about why you started.",
    "all progress takes place outside the comfort zone.",
    "success starts with self-discipline.",
    "the only bad workout is the one that didn\’t happen.",
    "rome wasn\’t built in a day. Work hard and good results will come.",
    "motivation is what gets you started. Habit is what keeps you going.",
    "fitness is not about being better than someone else. It\’s about being better than you used to be.",
    "the pain you feel today will be the strength you feel tomorrow.",
    "age is no barrier. It\’s a limitation you put on your mind."
];

// Array of tips that are displayed to a user on visual output devices such as an Echo Show
const shortTips = [
    "drinking a lot of water during the day helps you sleep better at night.",
    "the pain you feel today will be the strength you feel tomorrow.",
    "age is no barrier. It\’s a limitation you put on your mind.",
    "do something today that your future self will thank you for.",
    "life begins at the end of your comfort zone.",
    "the difference between try, and triumph is a little \‘umph\’.",
    "don\’t count the days, make the days count.",
    "when you feel like quitting, think about why you started.",
    "all progress takes place outside the comfort zone.",
    "success starts with self-discipline.",
    "the only bad workout is the one that didn\’t happen.",
    "rome wasn\’t built in a day. Work hard and good results will come.",
    "motivation is what gets you started. Habit is what keeps you going.",
    "do something today that your future self will thank you for.",
];

// Array of streams for meditation and guided breathing sessions, including the mp3, artwork and background urls hosted on dropbox
const STREAMS = [{
        token: '50',
        url: 'https://dl.dropboxusercontent.com/s/upfu94qv08zvej4/Birds%201.mp3?dl=1',
        metadata: {
            title: 'Birds',
            subtitle: 'Unwind with relaxing bird sounds.',
            art: {
                sources: [{
                    contentDescription: 'Yellow Bird on Sakura Tree',
                    url: 'https://dl.dropboxusercontent.com/s/bace03559m40xgp/Birds%201%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Beach Setting',
                    url: 'https://dl.dropboxusercontent.com/s/x09l1kz72e25sj0/Birds%201%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '51',
        url: 'https://dl.dropboxusercontent.com/s/wxjx1vzgrfpyre1/Birds%202.mp3?dl=1',
        metadata: {
            title: 'Birds',
            subtitle: 'Unwind with relaxing bird sounds',
            art: {
                sources: [{
                    contentDescription: 'Blue, Yellow & Green Macaw Parrots',
                    url: 'https://dl.dropboxusercontent.com/s/yjudmzklumsed8u/Birds%202%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Beach Setting',
                    url: 'https://dl.dropboxusercontent.com/s/cdqalm4yndc4tl4/Birds%202%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '52',
        url: 'https://dl.dropboxusercontent.com/s/hubdjihvr4j6oaz/Fire%201.mp3?dl=1',
        metadata: {
            title: 'Fire',
            subtitle: 'Unwind with relaxing fire sounds.',
            art: {
                sources: [{
                    contentDescription: 'Person Standing in Front of Fire',
                    url: 'https://dl.dropboxusercontent.com/s/yzt60blskso3o4v/Fire%201%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Campfire on a Peaceful Night',
                    url: 'https://dl.dropboxusercontent.com/s/fx9luegdkef41u0/Fire%201%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },

        },
    },
    {
        token: '53',
        url: 'https://dl.dropboxusercontent.com/s/y4gl9wydq3p3w49/Fire%202.mp3?dl=1',
        metadata: {
            title: 'Fire',
            subtitle: 'Unwind with relaxing fire sounds.',
            art: {
                sources: [{
                    contentDescription: 'Campfire on Beach',
                    url: 'https://dl.dropboxusercontent.com/s/dpla0hanksge31f/Fire%202%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Large Campfire',
                    url: 'https://dl.dropboxusercontent.com/s/eerj64fh6efrx5l/Fire%202%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '54',
        url: 'https://dl.dropboxusercontent.com/s/2etc239foprjth3/Ocean%20Waves%201.mp3?dl=1',
        metadata: {
            title: 'Ocean Waves',
            subtitle: 'Unwind with relaxing ocean sounds.',
            art: {
                sources: [{
                    contentDescription: 'Underwater Coral & Fish',
                    url: 'https://dl.dropboxusercontent.com/s/kwby3v5ze5i5wzj/Ocean%20Waves%201%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Beach Setting',
                    url: 'https://dl.dropboxusercontent.com/s/5ib3qpk7lfbv0or/Ocean%20Waves%201%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '55',
        url: 'https://dl.dropboxusercontent.com/s/2etc239foprjth3/Ocean%20Waves%201.mp3?dl=1',
        metadata: {
            title: 'Ocean Waves',
            subtitle: 'Unwind with relaxing ocean sounds.',
            art: {
                sources: [{
                    contentDescription: 'Person Floating in Clear Sea',
                    url: 'https://dl.dropboxusercontent.com/s/rkib3k4d47sfn30/Ocean%20Waves%202%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Cathedral Cove, New Zealand',
                    url: 'https://dl.dropboxusercontent.com/s/9eqqtafdp49q4zk/Ocean%20Waves%202%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '56',
        url: 'https://dl.dropboxusercontent.com/s/pv2nanox5bco5yz/Rain%20on%20Car%201.mp3?dl=1',
        metadata: {
            title: 'Rain on a Car',
            subtitle: 'Unwind with relaxing rain sounds.',
            art: {
                sources: [{
                    contentDescription: 'Raindrops on Window',
                    url: 'https://dl.dropboxusercontent.com/s/7de0ugrzhr814s5/Rain%20on%20Car%201%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Raindrops on Car Window & Wingmiror',
                    url: 'https://dl.dropboxusercontent.com/s/4qixiqplj8brnc3/Rain%20on%20Car%201%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },

        },
    },
    {
        token: '28',
        url: 'https://dl.dropboxusercontent.com/s/4lrf6lmu48smicd/Rain%20on%20Car%202.mp3?dl=1',
        metadata: {
            title: 'Rain on a Car',
            subtitle: 'Unwind with relaxing rain sounds.',
            art: {
                sources: [{
                    contentDescription: 'Raining in a Busy City Centre',
                    url: 'https://dl.dropboxusercontent.com/s/crtbd66hyl9s7h6/Rain%20on%20Car%202%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person Holding an Umbrealla in the Rain',
                    url: 'https://dl.dropboxusercontent.com/s/jbtql4ziklq5zal/Rain%20on%20Car%202%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '29',
        url: 'https://dl.dropboxusercontent.com/s/fht51t9j3kgw4n5/Rain%201.mp3?dl=1',
        metadata: {
            title: 'Rain',
            subtitle: 'Unwind with relaxing rain sounds.',
            art: {
                sources: [{
                    contentDescription: 'Raining in a Busy City Centre',
                    url: 'https://dl.dropboxusercontent.com/s/bgl88dh5ios65ox/Rain%201%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Raindrops on a House Window',
                    url: 'https://dl.dropboxusercontent.com/s/8neu6qhwiek3ghg/Rain%201%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '57',
        url: 'https://dl.dropboxusercontent.com/s/9zyj0trqr9cmyld/Rain%202.mp3?dl=1',
        metadata: {
            title: 'Rain',
            subtitle: 'Unwind with relaxing rain sounds.',
            art: {
                sources: [{
                    contentDescription: 'Person Holding an Umbrealla in the Rain',
                    url: 'https://dl.dropboxusercontent.com/s/rp81ukbi9rovkse/Rain%202%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person Holding an Umbrealla in the Rain',
                    url: 'https://dl.dropboxusercontent.com/s/g92gt4gv4uuy21u/Rain%202%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '31',
        url: 'https://dl.dropboxusercontent.com/s/13ry4fyas82ra1b/Tranquility.mp3?dl=1',
        metadata: {
            title: 'Tranquility',
            subtitle: 'Unwind with lo-fi beats.',
            art: {
                sources: [{
                    contentDescription: 'Peaceful Costal Setting',
                    url: 'https://dl.dropboxusercontent.com/s/gjpl9w3081xv2dy/Tranquility%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Neon Sign at Dock',
                    url: 'https://dl.dropboxusercontent.com/s/4zys450vwttq21d/Tranquility%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '58',
        url: 'https://dl.dropboxusercontent.com/s/e7uuqxprbj4zgi9/Crusing%20Along.mp3?dl=1',
        metadata: {
            title: 'Cruising Along',
            subtitle: 'Unwind with lo-fi beats.',
            art: {
                sources: [{
                    contentDescription: 'Person Walking Along Peaceful Road',
                    url: 'https://dl.dropboxusercontent.com/s/0gtje9gp927pzhz/Cruising%20Along%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'City Landscape from Afar',
                    url: 'https: //dl.dropboxusercontent.com/s/6ybrf5u3gi4mvle/Cruising%20Along%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '59',
        url: 'https://dl.dropboxusercontent.com/s/8k9c3d9zq25s7mi/Tropical.mp3?dl=1',
        metadata: {
            title: 'Tropical',
            subtitle: 'Unwind with lo-fi beats.',
            art: {
                sources: [{
                    contentDescription: 'Person Walking Along Peaceful Road',
                    url: 'https://dl.dropboxusercontent.com/s/0gtje9gp927pzhz/Cruising%20Along%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'City Landscape from Afar',
                    url: 'https://dl.dropboxusercontent.com/s/6ybrf5u3gi4mvle/Cruising%20Along%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '60',
        url: 'https://dl.dropboxusercontent.com/s/9qp1jlb5ekdmv8x/Mindulness%20of%20Breath.mp3?dl=1',
        metadata: {
            title: 'Mindfulness of Breath',
            subtitle: 'Unwind with guided breathing.',
            art: {
                sources: [{
                    contentDescription: 'Person Meditating on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/91xamz50kw2hq07/Mindfulness%20of%20Breath%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Mountain Setting',
                    url: 'https://dl.dropboxusercontent.com/s/64cx88vu84h8vgp/Mindfulness%20of%20Breath%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '61',
        url: 'https://dl.dropboxusercontent.com/s/sq6jozp5jgs90f5/Mountain%20Meditation.mp3?dl=1',
        metadata: {
            title: 'Mountain Meditation',
            subtitle: 'Unwind with guided breathing.',
            art: {
                sources: [{
                    contentDescription: 'Person Looking Out Onto Mountains',
                    url: 'https://dl.dropboxusercontent.com/s/3hgvgt7p993i4hl/Mountain%20Meditation%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Mountain Setting',
                    url: 'https://dl.dropboxusercontent.com/s/p2gziee71smrb6a/Mountain%20Meditation%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '62',
        url: 'https://dl.dropboxusercontent.com/s/frk3icyx985z8iv/Wisdom%20Meditation.mp3?dl=1',
        metadata: {
            title: 'Wisdom Meditation',
            subtitle: 'Unwind with guided breathing.',
            art: {
                sources: [{
                    contentDescription: 'Person Meditating on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/91xamz50kw2hq07/Mindfulness%20of%20Breath%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Mountain Setting',
                    url: 'https://dl.dropboxusercontent.com/s/64cx88vu84h8vgp/Mindfulness%20of%20Breath%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '63',
        url: 'https://dl.dropboxusercontent.com/s/glgxe6k3x9p02hk/Healing%20Meditation.mp3?dl=1',
        metadata: {
            title: 'Healing Meditation',
            subtitle: 'Unwind with guided breathing.',
            art: {
                sources: [{
                    contentDescription: 'Person Looking Out Onto Mountains',
                    url: 'https://dl.dropboxusercontent.com/s/3hgvgt7p993i4hl/Mountain%20Meditation%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Mountain Setting',
                    url: 'https://dl.dropboxusercontent.com/s/p2gziee71smrb6a/Mountain%20Meditation%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '64',
        url: 'https://dl.dropboxusercontent.com/s/y3486bc94aygb3i/Confidence%20Meditation.mp3?dl=1',
        metadata: {
            title: 'Confidence Meditation',
            subtitle: 'Unwind with guided breathing.',
            art: {
                sources: [{
                    contentDescription: 'Person Meditating on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/91xamz50kw2hq07/Mindfulness%20of%20Breath%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Peaceful Mountain Setting',
                    url: 'https://dl.dropboxusercontent.com/s/64cx88vu84h8vgp/Mindfulness%20of%20Breath%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
];

const ranShortTips = Math.floor(Math.random() * MAX_SHORT_TIPS); // Allocate a random tip to be displayed to the user

// Array of streams for workout sessions, including the mp3, artwork and background urls hosted on dropbox
const WORKOUT_STREAMS = [{
        token: '41',
        url: 'https://dl.dropboxusercontent.com/s/rqywb6ju66a4zih/Lower%20Workout%201.mp3?dl=1',
        metadata: {
            title: 'Lower Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '42',
        url: 'https://dl.dropboxusercontent.com/s/w56g4zdtpi2uli2/Lower%20Workout%202.mp3?dl=1',
        metadata: {
            title: 'Lower Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '43',
        url: 'https://dl.dropboxusercontent.com/s/zky4kh1c4il8g7c/Upper%20Workout%201.mp3?dl=1',
        metadata: {
            title: 'Upper Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },
    {
        token: '44',
        url: 'https://dl.dropboxusercontent.com/s/77caww8qstf0vtv/Upper%20Workout%202.mp3?dl=1',
        metadata: {
            title: 'Upper Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },

    {
        token: '45',
        url: 'https://dl.dropboxusercontent.com/s/m3q5tcoudvstc8m/Full%20Workout%201.mp3?dl=1',
        metadata: {
            title: 'Full Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },

    {
        token: '46',
        url: 'https://dl.dropboxusercontent.com/s/2ibuyml5edc55ai/Full%20Workout%202.mp3?dl=1',
        metadata: {
            title: 'Full Body Workout',
            subtitle: 'Remember, ' + shortTips[ranShortTips],
            art: {
                sources: [{
                    contentDescription: 'Person Working out With Weights',
                    url: 'https://dl.dropboxusercontent.com/s/1vwi8ozqs590shh/Workout%20Art.jpg?dl=1',
                    widthPixels: 512,
                    heightPixels: 512,
                }, ],
            },
            backgroundImage: {
                sources: [{
                    contentDescription: 'Person on a Beach',
                    url: 'https://dl.dropboxusercontent.com/s/wrwqn5j4ldgu2l7/Workout%20Back.jpg?dl=1',
                    widthPixels: 1200,
                    heightPixels: 800,
                }, ],
            },
        },
    },

];

//Intent Handlers =============================================


// Intent to stop audio playback
const PlaybackStoppedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'PlaybackController.PauseCommandIssued' ||
            handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
    },
    handle(handlerInput) {
        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective();

        return handlerInput.responseBuilder
            .getResponse();
    },
};

// Intent to start audio playback
const PlaybackStartedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
    },
    handle(handlerInput) {
        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

        return handlerInput.responseBuilder
            .getResponse();
    },
};

// Built-in Stop & Cancel Intent
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            );
    },


    handle(handlerInput) {
        const ranTips = Math.floor(Math.random() * MAX_TIPS);

        let say = 'Thank you for using ' + invocationName + '. Remember, ' + tips[ranTips] + ' Have a great day!';

        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective();

        return handlerInput.responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

// Built-in Pause Intent Handler
const AMAZON_PauseIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {

        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective();

        return handlerInput.responseBuilder
            .withShouldEndSession(true)
            .getResponse();
    },
};

// Built-in ShuffleOff Intent Handler
const AMAZON_ShuffleOffIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ShuffleOffIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to turn shuffle on or off.';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);


        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Intent to allow the user to ask Alexa to repeat what she just said
const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        let say = 'If I could remember what I said, I would repeat';

        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (attributes.lastResult) {
            say = 'I said, ' + attributes.lastResult;
        }

        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    }
};

// Built-in ShuffleOn Intent Handler
const AMAZON_ShuffleOnIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ShuffleOnIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to turn shuffle on or off.';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);



        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in LoopOff Intent Handler
const AMAZON_LoopOffIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.LoopOffIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to turn loop on or off.';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);



        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in LoopOn Intent Handler
const AMAZON_LoopOnIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.LoopOnIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to turn loop on or off.';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);



        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in StartOver Intent Handler
const AMAZON_StartOverIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StartOverIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to start the audio again.';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);



        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in Help Intent
const AMAZON_HelpIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sure, I can help. This skill allows you to get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);

        return responseBuilder
            .speak(say)
            .reprompt('Sorry, I didn\'t quite get that. This skill allows you to get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?')
            .getResponse();
    },
};

// Built-in Intent to Resume Audio
const AMAZON_ResumeIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'I am not yet able to resume the audio that you played previously. You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);


        return responseBuilder
            .speak(say)
            .reprompt('Sorry, I didn\'t quite get that. You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?')
            .getResponse();
    },
};

// Lists all the sounds the user can listen to
const GetSoundsList_Intent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getSoundTypes';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'You can listen to bird sounds, as well as rain, fire, ocean waves, rain on a car, or lo-fi chilled sounds. Which will it be?';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);

        return responseBuilder
            .speak(say)
            .reprompt('Sorry, I didn\'t quite get that. You can listen to bird sounds, as well as rain, fire, ocean waves, rain on a car, or lo-fi chilled sounds. Which will it be?')
            .getResponse();
    },
};

// Built-in Previous Intent Handler
const AMAZON_PreviousIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.PreviousIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to get the previous audio';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);

        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in Next Intent Handler
const AMAZON_NextIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NextIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Sorry, I am not yet able to get the next audio';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);


        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// Built-in Navigate Home Intent
const AMAZON_NavigateHomeIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak('Sorry, I didn\'t quite get that. You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?')
            .reprompt()
            .getResponse();
    },
};

// Built-in Fallback Intent
const AMAZON_FallbackIntent_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        return responseBuilder
            .speak('Sorry, I didn\'t quite get that.')
            .reprompt()
            .getResponse();
    },
};

// GetSound Intent to allow users to get a sound so they can meditate and follow guided breathing sessions
const getSounds_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getSounds';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;

        // Generate random numbers to allocate a specific sound or allow user to choose a random sound
        const ranSong = Math.floor(Math.random() * MAX_NUMBER);
        const ranBirds = Math.floor(Math.random() * 2); // 0 and 1
        const ranFire = Math.floor((Math.random() * 2) + 2); // 2 and 3
        const ranOcean = Math.floor((Math.random() * 2) + 4); // 4 and 5 
        const ranRainonCar = Math.floor((Math.random() * 2) + 6); // 6 and 7
        const ranRain = Math.floor((Math.random() * 2) + 8); // 8 and 9
        const ranLoFi = Math.floor((Math.random() * 3) + 10); //10, 11 and 12

        // Allocate sounds to index in stream array
        const sBirds = STREAMS[ranBirds];
        const sFire = STREAMS[ranFire];
        const sOcean = STREAMS[ranOcean];
        const sRainonCar = STREAMS[ranRainonCar];
        const sRain = STREAMS[ranRain];
        const sLoFi = STREAMS[ranLoFi];
        const sRandom = STREAMS[ranSong];
        const sMindofBreath = STREAMS[13];
        const sMountBreathing = STREAMS[14];
        const sWisdomBreathing = STREAMS[15];
        const sHealingBreathing = STREAMS[16];
        const sConfidenceBreathing = STREAMS[17];

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }

        let say = '';
        let slotValues = getSlotValues(request.intent.slots);

        // Play sounds depending on the user input and slot values
        if (slotValues && slotValues.sound) {
            if (slotValues.sound.heardAs == 'birds' || slotValues.sound.heardAs == 'bird') {
                say = 'Great choice! I will play bird sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sBirds.url, sBirds.token, 0, null, sBirds.metadata);
            }

            else if (slotValues.sound.heardAs == 'fire' || slotValues.sound.heardAs == 'crackling') {
                say = 'Great choice! I will play fire sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sFire.url, sFire.token, 0, null, sFire.metadata);
            }

            else if (slotValues.sound.heardAs == 'ocean waves' || slotValues.sound.heardAs == 'ocean' || slotValues.sound.heardAs == 'waves' || slotValues.sound.heardAs == 'ocean wave') {
                say = 'Great choice! I will play ocean sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sOcean.url, sOcean.token, 0, null, sOcean.metadata);
            }

            else if (slotValues.sound.heardAs == 'rain on car' || slotValues.sound.heardAs == 'raining on a car' || slotValues.sound.heardAs == 'rain on a car' || slotValues.sound.heardAs == 'raining on car') {
                say = 'Great choice! I will play rain on a car sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sRainonCar.url, sRainonCar.token, 0, null, sRainonCar.metadata);
            }

            else if (slotValues.sound.heardAs == 'rain' || slotValues.sound.heardAs == 'rain drop' || slotValues.sound.heardAs == 'rain drops') {
                say = 'Great choice! I will play rain sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sRain.url, sRain.token, 0, null, sRain.metadata);
            }

            else if (slotValues.sound.heardAs == 'chill' || slotValues.sound.heardAs == 'chilled' || slotValues.sound.heardAs == 'relaxing') {
                say = 'Great choice! I will play chilled lo-fi sounds for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sLoFi.url, sLoFi.token, 0, null, sLoFi.metadata);
            }

            else if (slotValues.sound.heardAs == 'random') {
                say = 'Great choice! I will choose a random relaxing sound to play for you.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sRandom.url, sRandom.token, 0, null, sRandom.metadata);
            }
            else if (slotValues.sound.heardAs == 'mountain' || slotValues.sound.heardAs == 'mountain meditation' || slotValues.sound.heardAs == 'session one') {
                say = 'Great choice!';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sMountBreathing.url, sMountBreathing.token, 0, null, sMountBreathing.metadata);
            }
            else if (slotValues.sound.heardAs == 'mindfulness of breath' || slotValues.sound.heardAs == 'mindfulness' || slotValues.sound.heardAs == 'breath' || slotValues.sound.heardAs == 'session one') {
                say = 'Great choice!';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sMindofBreath.url, sMindofBreath.token, 0, null, sMindofBreath.metadata);
            }
            else if (slotValues.sound.heardAs == 'wisdom meditation' || slotValues.sound.heardAs == 'wisdom' || slotValues.sound.heardAs == 'session three') {
                say = 'Great choice!';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sWisdomBreathing.url, sWisdomBreathing.token, 0, null, sWisdomBreathing.metadata);
            }
            else if (slotValues.sound.heardAs == 'healing meditation' || slotValues.sound.heardAs == 'healing' || slotValues.sound.heardAs == 'session four') {
                say = 'Great choice!';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sHealingBreathing.url, sHealingBreathing.token, 0, null, sHealingBreathing.metadata);
            }
            else if (slotValues.sound.heardAs == 'confidence meditation' || slotValues.sound.heardAs == 'confidence' || slotValues.sound.heardAs == 'session five') {
                say = 'Great choice!';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sConfidenceBreathing.url, sConfidenceBreathing.token, 0, null, sConfidenceBreathing.metadata);
            }
        }

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);

        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// GetMode Intent to allow user to choose to meditate, follow guided breathing sessions or workout
const getMode_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getMode';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }

        let say = '';
        let slotValues = getSlotValues(request.intent.slots);

        // Choose a mode, depending on user input and slot validation
        if (slotValues && slotValues.mode) {
            if (slotValues.mode.heardAs == 'meditation' || slotValues.mode.heardAs == 'meditate' || slotValues.mode.heardAs == 'meditating' || slotValues.mode.heardAs == 'ten minute meditate' || slotValues.mode.heardAs == 'ten minute meditation') {
                say = 'Sure! We will get started with a meditation session. You can choose to listen to sounds such as birds, rain, fire and waves. You can also say random and I will choose a sound for you. What would you like to listen to?';
            }
            else if (slotValues.mode.heardAs == 'workout' || slotValues.mode.heardAs == 'exercise' || slotValues.mode.heardAs == 'ten minute workout' || slotValues.mode.heardAs == 'ten minute exercise') {
                say = 'Sure! We will get started with a workout session. You can choose a light, moderate or intense workout. Which intensity level would you like?';
            }
            else if (slotValues.mode.heardAs == 'guided breathing' || slotValues.mode.heardAs == 'breathing' || slotValues.mode.heardAs == 'ten minute guided breathing' || slotValues.mode.heardAs == 'ten minute breathing') {
                say = 'Sure! We will get started with a guided breathing session. You can choose either Mindfulness of Breath, Mountain Meditation, Wisdom Meditation, Healing Meditation, or Confidence Meditation to start different sessions. Which will it be?';
            }
        }

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);
        return responseBuilder
            .speak(say)
            .reprompt('Sorry, I didn\'t quite get that. You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?')
            .getResponse();
    },
};

// GetTarget Intent to allow user to choose an area of their body to workout
const getTargetArea_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getTargetArea';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();

        }

        const ranLower = Math.floor(Math.random() * 2); // 0 and 1
        const ranUpper = Math.floor((Math.random() * 2) + 2); // 2 and 3
        const ranFull = Math.floor((Math.random() * 2) + 4); // 4 and 5 

        // Allocate workout audio files to index of workout stream array
        const sLower1 = WORKOUT_STREAMS[ranLower];
        const sUpper1 = WORKOUT_STREAMS[ranUpper];
        const sFull1 = WORKOUT_STREAMS[ranFull];

        let say = '';

        let slotValues = getSlotValues(request.intent.slots);

        // Follow an upper body, lower body or full body workout and play the audio stream depending on user input and slot validaiton
        if (slotValues && slotValues.area) {
            if (slotValues.area.heardAs == 'upper body' || slotValues.area.heardAs == 'upper' || slotValues.area.heardAs == 'arms' || slotValues.area.heardAs == 'chest') {
                say = 'Great choice! We will get started with an upper body workout.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sUpper1.url, sUpper1.token, 0, null, sUpper1.metadata);
            }

            else if (slotValues.area.heardAs == 'lower body' || slotValues.area.heardAs == 'lower' || slotValues.area.heardAs == 'legs') {
                say = 'Great choice! We will get started with a lower body workout.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sLower1.url, sLower1.token, 0, null, sLower1.metadata);
            }

            else if (slotValues.area.heardAs == 'full body' || slotValues.area.heardAs == 'full' || slotValues.area.heardAs == 'whole' || slotValues.area.heardAs == 'whole body') {
                say = 'Great choice! We will get started with a full body workout.';
                handlerInput.responseBuilder
                    .addAudioPlayerPlayDirective('REPLACE_ALL', sFull1.url, sFull1.token, 0, null, sFull1.metadata);
            }

        }

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);

        return responseBuilder
            .speak(say)
            .getResponse();
    },
};

// GetTarget Intent to allow user to choose an intensity level for their workout
const getIntensity_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'getIntensity';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;

        // delegate to Alexa to collect all the required slots 
        const currentIntent = request.intent;
        if (request.dialogState && request.dialogState !== 'COMPLETED') {
            return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent)
                .getResponse();
        }
        let say = '';



        // Allocate an intensity level depending on the users input and slot validation
        let slotValues = getSlotValues(request.intent.slots);
        if (slotValues && slotValues.intensity) {
            if (slotValues.intensity.heardAs == 'vigorous' || slotValues.intensity.heardAs == 'intense' || slotValues.intensity.heardAs == 'difficult' || slotValues.intensity.heardAs == 'hard') {
                say = 'Great choice! An intense workout will really get you sweating! Perform each exercise as fast as you can, doing as many reps as you can within the time. Between each exercise, push yourself to have a short rest time, making sure you still stay hydrated. You can choose to target your lower body, upper body, or complete a full body workout. Which will it be?';
            }
            else if (slotValues.intensity.heardAs == 'moderate' || slotValues.intensity.heardAs == 'regular' || slotValues.intensity.heardAs == 'medium' || slotValues.intensity.heardAs == 'average') {
                say = 'Great choice! A moderate workout will kick up your heart rate and burn more calories, all while making you sweat. Between each exercise, push yourself to reduce your rest time. You can choose to target your lower body, upper body, or complete a full body workout. Which will it be?';
            }
            else if (slotValues.intensity.heardAs == 'light' || slotValues.intensity.heardAs == 'easy' || slotValues.intensity.heardAs == 'easier') {
                say = 'Great choice! For a light workout, use a normal, comfortable pace and make sure you rest and drink water between each exercise. You can choose to target your lower body, upper body, or complete a full body workout. Which will it be?';
            }
        }

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);
        return responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};

// Built-in Launch request to start the application
const LaunchRequest_Handler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Hello' + ' and welcome to ' + invocationName + '! You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?';

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.lastResult = say;
        handlerInput.attributesManager.getSessionAttributes(attributes);


        return responseBuilder
            .speak(say)
            .reprompt('Sorry, I didn\'t quite get that. You can get started with a quick 10 minute workout, unwind with 10 minutes of meditation or follow a 10 minute guided breathing session. Which will it be?')
            .getResponse();
    },
};

// Built-in Session End request
const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

// Helper function to get slot values from user and validate them
function getSlotValues(filledSlots) {
    const slotValues = {};

    Object.keys(filledSlots).forEach((item) => {
        const name = filledSlots[item].name;
        if (filledSlots[item] &&
            filledSlots[item].resolutions &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case 'ER_SUCCESS_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        ERstatus: 'ER_SUCCESS_MATCH'
                    };
                    break;
                case 'ER_SUCCESS_NO_MATCH':
                    slotValues[name] = {
                        heardAs: filledSlots[item].value,
                        resolved: '',
                        ERstatus: 'ER_SUCCESS_NO_MATCH'
                    };
                    break;
                default:
                    break;
            }
        }
        else {
            slotValues[name] = {
                heardAs: filledSlots[item].value || '', // may be null 
                resolved: '',
                ERstatus: ''
            };
        }
    }, this);
    return slotValues;
}

// Exports handler function and setup =================================================
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_HelpIntent_Handler,
        AMAZON_NavigateHomeIntent_Handler,
        PlaybackStoppedIntentHandler,
        AMAZON_FallbackIntent_Handler,
        AMAZON_PauseIntent_Handler,
        GetSoundsList_Intent_Handler,
        PlaybackStartedIntentHandler,
        getSounds_Handler,
        AMAZON_ShuffleOffIntent_Handler,
        getMode_Handler,
        getTargetArea_Handler,
        AMAZON_LoopOnIntent_Handler,
        AMAZON_ShuffleOnIntent_Handler,
        AMAZON_LoopOffIntent_Handler,
        LaunchRequest_Handler,
        getIntensity_Handler,
        SessionEndedHandler,
        RepeatIntentHandler,
        AMAZON_StartOverIntent_Handler,
        AMAZON_NextIntent_Handler,
        AMAZON_PreviousIntent_Handler,
        AMAZON_ResumeIntent_Handler,
        CancelAndStopIntentHandler,
    )
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
