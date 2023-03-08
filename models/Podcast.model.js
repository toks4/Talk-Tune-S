const { Schema, model } = require("mongoose");

const podcastSchema = new Schema(
    {
        podcastname: {
            type: String,
            required: [true, 'Podcast name is required.'],
        },
        podcastdescription: {
            type: String,
            
        },
        podcastcategory: {
            type: [String],
            enum: ['business', 'comedy', 'news', 'science', 'relationship', 'travel',
                   'sports', 'culture', 'education', 'tech', 'mindset', 'health/fitness',
                   'history', 'art', 'meditation' ],
          
        },
        podcastimage: {
            type: String, 
            required: true,
        },
        podcastaudio: {
            type: String,
        },
        episodename: {
            type: String,
        },
        episodedescription: {
            type: String,
        },
        creatorname: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        creatordescription: {
            type: String,
        },
        
},
);

const Podcast = model("Podcast", podcastSchema);

module.exports = Podcast;
