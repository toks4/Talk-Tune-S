const { Schema, model } = require("mongoose");

const podcastSchema = new Schema(
    {
        podcastname: {
            type: String,
        },
        podcastdescription: {
            type: String,
            
        },
        podcastcategory: {
            type: [String],
            enum: ['business', 'comedy', 'news', 'science', 'sports', 'culture', 'education', 'tech', 'mindset', 'health/fitness',
                   'history', 'arts', 'tv/film', 'music', 'fiction', 'truecrime', 'religion/spirituality' ],
          
        },
        podcastimage: {
            type: String, 
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
        reviews: [{type: Schema.Types.ObjectId,
            ref: 'Reviews'}]
        
},
);

const Podcast = model("Podcast", podcastSchema);

module.exports = Podcast;
