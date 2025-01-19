import Property from "../models/property.model.js";
import uploadImage from "../utils/cloudinary.js";

export const uploadProperty = async (req, res) => {
  try {
    const user = req.user;
    const {
      title,
      description,
      price,
      propertyType,

      status,
    } = req.body;

    const location = JSON.parse(req.body.location);
    const features = JSON.parse(req.body.features);

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !propertyType ||
      !status ||
      !features
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required of the property" });
    }

    let imagesUrl = [];
    for (let file of req.files) {
      let path = `${file.destination}${file.filename}`;
      let imageUrl = await uploadImage(path);

      if (!imageUrl) {
        return res.status(500).json({ message: "Error uploading image" });
      }

      imagesUrl.push(imageUrl);
    }

    const property = await Property.create({
      title,
      description,
      price,
      location,
      propertyType,
      status,
      features,
      images: imagesUrl,
      owner: user._id,
      isActive: true,
    });

    return res
      .status(201)
      .json({ message: "Property uploaded successfully", data: property });
  } catch (error) {
    console.log("Error uploading property: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      isActive: true,
    }).select(
      "title description price location.city propertyType status images"
    );

    res
      .status(200)
      .json({ message: "Properties fetched successfully", data: properties });
  } catch (error) {
    console.log("Error getting properties: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userProperties = async (req, res) => {
  const { _id } = req.user;
  try {
    const userProperties = await Property.find({ owner: _id }).select(
      "title description price location.city propertyType status images"
    );

    if (!userProperties) {
      return res.status(404).json({ message: "User has no properties" });
    }

    res.status(200).json({
      message: "User properties fetched successfully",
      data: userProperties,
    });
  } catch (error) {
    console.log("Error getting user properties: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertyInfo = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Property ID is required" });
    }

    const propertyInfo = await Property.findById(id);

    if (!propertyInfo) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Property info fetched successfully",
      data: propertyInfo,
    });
  } catch (error) {
    console.log("Error getting property info: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { title, description, price, status, isActive } = req.body;

    const id = req.params.id;

    if (!title && !description && !price && !status && !isActive) {
      return res
        .status(400)
        .json({ message: "At least one field is required" });
    }

    if (title) {
      await Property.findByIdAndUpdate(id, { title });
    }

    if (description) {
      await Property.findByIdAndUpdate(id, { description });
    }

    if (price) {
      await Property.findByIdAndUpdate(id, { price });
    }

    if (status) {
      await Property.findByIdAndUpdate(id, { status });
    }

    if (isActive) {
      await Property.findByIdAndUpdate(id, { isActive });
    }

    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.log("Error updating property: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;

    await Property.findByIdAndDelete(id);

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.log("Error deleting property: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
