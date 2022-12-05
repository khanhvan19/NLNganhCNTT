const { Types } = require("mongoose");
const Menu = require("../models/Menu");

exports.createOneMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create({ ...req.body, sub: [] });
    res.status(200).json({
      status: "success",
      data: { menu },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json({
      status: "success",
      results: menus.length,
      data: menus,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getSubMenu = async (req, res, next) => {
  try {
    const subMenu = await Menu.findById(req.params.id).select("sub");
    res.status(200).send(subMenu.sub);
  } catch (error) {
    req.json(error);
  }
};

exports.updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(menu);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    res.status(200).send(menu);
  } catch (error) {
    res.json(error);
  }
};
exports.addSubMenu = async (req, res, next) => {
  try {
    console.log(req.body);
    const menu = await Menu.findOneAndUpdate(
      { name: req.params.parent },
      {
        $push: {
          sub: {
            name:req.body.name,
            show:req.body.show,
          }
        },
      }
    );
    res.status(200).send(menu);
  } catch (error) {
    res.json(error);
  }
};
exports.updateSubMenu = async (req, res, next) => {
  try {
    console.log(req.body);
    const menu = await Menu.findOneAndUpdate(
      { name: req.params.parent },
      {
        $set: {
          ["sub.$[element].name"]: req.body.name,
          ["sub.$[element].show"]: req.body.show,
        },
      },
      {
        arrayFilters: [
          {
            "element._id": Types.ObjectId(req.body._id),
          },
        ],
      }
    );
    res.status(200).send(menu);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteSubMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findOneAndUpdate(
        { name: req.params.parent },
        {
          $pull: {
            sub: {
              _id: req.params.id
            }
          },
        }
      );
    res.status(200).send(menu);
  } catch (error) {
    res.json(error);
  }
};
