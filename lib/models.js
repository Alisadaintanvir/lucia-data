import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  email: String,
});

const sessionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const contactsV5Schema = new Schema({
  _id: String,
  _index: String,
  _type: String,
  _score: Number,
  _source: mongoose.Schema.Types.Mixed,
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const ContactsV5 =
  mongoose.models.Contacts_V5 ||
  mongoose.model("Contacts_V5", contactsV5Schema);
