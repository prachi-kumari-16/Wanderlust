const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
      url: String,
      filename: String,
    },
    // image: {
    //     type: String,
    //     default: "https://images.unsplash.com/photo-1679754767470-d0dda4882da2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlYWNoJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" ,

    //     set: (v) => 
    //         v === "" 
    //             ? "https://images.unsplash.com/photo-1679754767470-d0dda4882da2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlYWNoJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" 
    //             : v,
    // },

    // image: {
    //     filename: String,
    //     url: String
    // },


//     image: {
//   type: String,
//   default:
//     "https://images.unsplash.com/photo-1679754767470-d0dda4882da2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlYWNoJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
//   set: function (value) {
//     if (typeof value === "object" && value.url) {
//       return value.url;
//     } else if (typeof value === "string" && value.trim() !== "") {
//       return value;
//     }
//     return this.image; // fallback to existing value
//   },
// },

    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
   
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
     await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


