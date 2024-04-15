const mongoose = require("mongoose"); //""안에 그냥 있는건 node_modules에서 가져오는것

const UserSchema = mongoose.Schema(
  {
    //몽구스에서 스키마(데이터 정보)를 가져와서
    username: {
      type: String,
      required: true,
    },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    age: Number,
    email: String,
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema); //모델에 담아서 "user"에 저장한다. (컬렉션 만듬)

module.exports = { User }; //저장된것을 exports한다.
