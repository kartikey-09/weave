// Controller: workforceController.js
const WorkforceModel = require("../../models/workforce/workforce");

exports.createWorkforce = async (req, res) => {
  try {
    console.log("object");
    const {pronoun, imgUrlModelDBId, name, designation, description } = req.body;
    console.log(imgUrlModelDBId)
    const data = await WorkforceModel.create({
      pronoun,
      imgUrlModelDBId,
      name,
      designation,
      description,
    });

    return res
    .status(200)
    .json({ success: true, message: "Data saved successfully.", data });
  } catch (err) {
    console.log("hi", err);
  }
};

exports.fetchAllWorkforce = async (req, res) => {
  const data = await WorkforceModel.find({}).populate("imgUrlModelDBId");

  return res
    .status(200)
    .json({ success: true, message: "Data Fetched successfully.", data });
};

exports.updateWorkforce = async (req, res) => {
  const { dbId } = req.params;
  const { imgUrlModelDBId, name, designation, description } = req.body;

  const data = await WorkforceModel.findByIdAndUpdate(
    dbId,
    {
      imgUrlModelDBId,
      name,
      designation,
      description,
    },
    { new: true }
  ).populate("imgUrlModelDBId");

  return res
    .status(200)
    .json({ success: true, message: "Update Successful.", data });
};

exports.deleteWorkforce = async (req, res) => {
  const { dbId } = req.params;

  await WorkforceModel.findByIdAndDelete(dbId);

  return res
    .status(200)
    .json({ success: true, message: "Deletion Successful." });
};
