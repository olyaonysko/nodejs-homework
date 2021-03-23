const User = require("./schemas/users");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const create = async ({ email, password, subscription, name, avatarURL }) => {
  const user = new User({ email, password, subscription, name, avatarURL });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateSubscriptionUser = async (id, subscription) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { subscription },
    {
      new: true,
    }
  );
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateSubscriptionUser,
  updateAvatar,
};
