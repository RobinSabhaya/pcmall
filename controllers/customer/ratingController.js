const ratingModel = require("../../db/models/ratingSchema");
const ratingService = require("../../src/services/rating.service");
const fileService = require("../../src/services/file.service");
const { FILES_FOLDER } = require("../../src/helper/constant.helper");
const ratingController = () => {
  return {
    async getRating(req, res) {
      try {
        const { product } = req.query;
        const ratingData = await ratingModel.find({ product }).populate({
          path: "user",
        });
        return res.status(200).json({
          status: 200,
          data: ratingData,
        });
      } catch (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    },
    async postRating(req, res) {
      try {
        const { id } = req.params;
        const { message, rating } = req.body;
        const productImages = [];

        // Files add to req body object
        req?.files?.forEach((file) => {
          const fileNewName = fileService.generateFileName(file);
          productImages.push(fileNewName);
          req.body[file.fieldname] = fileNewName;
        });

        const saveFile = async (file) => {
          await fileService.saveFiles([
            {
              fileUploadType: "multiple",
              fileName: req.body[file.fieldname],
              fileMainFolder: "rating",
              subFolderName: "product",
              idFolder: id,
              fileBuffer: file.buffer,
              fileMimeType: file.mimetype,
            },
          ]);
        };

        await Promise.all(req?.files?.map(saveFile));

        await ratingService.createRating({
          product: id,
          // user: req.user._id,
          rating,
          message,
          images: productImages,
        });
        // if (req.xhr) {
        return res.status(201).json({
          status: 201,
          message: "Rating created successfully",
        });
        // } else {
        //   return res.status(302).redirect(`/singleproduct/${id}`); //Redirect to same page
        // }
      } catch (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
    },
  };
};

module.exports = ratingController;
