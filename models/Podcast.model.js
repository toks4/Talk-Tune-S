const { Schema, model } = require("mongoose");

const podcastSchema = new Schema(
    {
        podcastname: {
            type: String,
            required: [true, 'Podcast name is required.'],
        },
        podcastdescription: {
            type: String,
            required: true,
        },
        podcastcategory: {
            type: [String],
            enum: ['business', 'comedy', 'news', 'science', 'relationship', 'travel',
                   'sports', 'culture', 'education', 'tech', 'mindset', 'health/fitness',
                   'history', 'art', 'meditation' ],
            required: true,
        },
        podcastimage: {
            type: String, 
            required: true,
        },
        podcastaudio: {
            type: String,
            required: true,
        },
        episodename: {
            type: Number,
            required: true,
        },
        episodedescription: {
            type: String,
            required: true,
        },
        creatorname: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Creator name is required.'],
        },
        creatordescription: {
            type: String,
        },
        
},
);

const Podcast = model("Podcast", podcastSchema);

module.exports = Podcast;
