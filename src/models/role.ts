import { Schema, model } from "mongoose";
import { Role } from "../utilities/types";

const RolSchema = new Schema<Role>({
  rol: {
    type: String,
    required: [true, 'Rol is required']
  }
})

export default model('Role', RolSchema);