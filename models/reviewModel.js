import  mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: {
        type: String,
        required: true
      },
      teacherId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "teacher"
      },
      rating: {
        type: Number,
        required: [true, "please provide a rating"],
      },
      reviewString: {
        type: String,
        required: [true, "please provide a review"],
      },
      
})

const Reviews = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export default Reviews;