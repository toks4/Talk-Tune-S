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
            enum: ['Business', 'Comedy', 'News', 'Science', 'Sports', 'Culture', 'Education', 'Tech', 'Mindset', 'Health/Fitness',
                   'History', 'Arts', 'Tv/Film', 'Music', 'Fiction', 'True Crime', 'Religion/Spirituality' ],
          
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
