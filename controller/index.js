const { nanoid } = require("nanoid");
const urlModel = require("../models/url-shorter.model");

const handlecreateurl = async (req, res) => {
  try {
    const { url } = req.body;

    const shortId = nanoid(8);

    const shorturlCreate = await urlModel.create({
      shortid: shortId,
      redirect_url: url,
      visitorHistory: [],
    });
    shorturlCreate.save();
    return res.status(201).send({ msg: "url is shorted", shorturlCreate });
  } catch (error) {
    return res
      .statu(500)
      .send({ msg: "something went wrong with handlecreateurl", error });
  }
};

const handlegeturl = async (req, res) => {
  try {
    const shortId = req.params.id;

    const geturls = await urlModel.findOneAndUpdate(
      { shortid: shortId },
      {
        $push: {
          visitorHistory: { timestamps: Date.now() },
        },
      }
    );

    return res.redirect(geturls.redirect_url);
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "something went wrong with handlegeturl", error });
  }
};

const handlegetanalytics = async (req, res) => {
  try {
    const shortid = req.params.id;

    const analytics = await urlModel.findOne({ shortid });
    console.log(analytics);
    return res.status(200).send({
      totalanalytics: analytics.visitorHistory.length,
      visitor: analytics.visitorHistory,
    });
  } catch (error) {
    return res
      .status(501)
      .send("Something went wrong with Analytics function ");
  }
};

module.exports = { handlecreateurl, handlegeturl, handlegetanalytics };
