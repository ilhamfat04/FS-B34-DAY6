// import model here
const { user } = require("../../models")

// import package here
const Joi = require("joi")

exports.register = async (req, res) => {
  // code here
  try {
    const data = req.body

    // return console.log(data);

    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(5).required(),
      status: Joi.string().required()
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.status(400).send({
        status: "error",
        message: error.details[0].message
      })
    }

    const newUser = await user.create({
      name: data.name,
      email: data.email,
      password: data.password,
      status: data.status
    })

    res.status(200).send({
      status: "success"
    })
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // code here
};
