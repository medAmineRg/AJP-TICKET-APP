import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "should contain 2 character at least!"],
      maxLength: [20, "was too long"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [2, "should contain 2 character at least!"],
      maxLength: [20, "was too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: [8, "should contain 2 character at least!"],
      // select: false,
    },
    role: {
      roleName: {
        type: String,
        required: true,
      },
      menus: [
        {
          menuName: {
            type: String,
          },
          permissions: [],
          // subMenu: [
          //   {
          //     menuName: {
          //       type: String,
          //       default: null,
          //     },
          //     permissions: [],
          //   },
          // ],
        },
      ],
    },
  },
  { timestamps: true }
);

userSchema.statics.emailExistence = function (email) {
  return this.findOne({ email });
};

const User = models.User || model("User", userSchema);

export default User;
