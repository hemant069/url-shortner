const { nanoid } = require("nanoid");
const urlModel = require("../models/url-shorter.model");

const handlecreateurl = async (req, res) => {
  try {
    const { url } = req.body;

    if (url) {
      const shortId = nanoid(8);

      const shorturlCreate = await urlModel.create({
        shortid: shortId,
        redirect_url: url,
        visitorHistory: [],
        createdBy: req.user._id,
      });
      shorturlCreate.save();
      return res.render("Home", { shortId });
      // return res.status(201).send({ msg: "url is shorted", shorturlCreate });
    } else {
      res.status(500).send({ msg: "url is not present" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "something went wrong with handlecreateurl", error });
  }
};

const handlegeturl = async (req, res) => {
  try {
    const id = req.params.id;

    const geturls = await urlModel.findOneAndUpdate(
      { shortid: id },
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
