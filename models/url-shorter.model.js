const { default: mongoose } = require("mongoose");

const urlShortnerSchema = mongoose.Schema(
  {
    shortid: { type: String },
    redirect_url: { type: String, unique: true },
    visitorHistory: [{ timestamps: { type: Number } }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("url", urlShortnerSchema);

module.exports = urlModel;
