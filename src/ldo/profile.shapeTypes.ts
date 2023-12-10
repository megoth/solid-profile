import { ShapeType } from "ldo";
import { profileSchema } from "./profile.schema";
import { profileContext } from "./profile.context";
import { SolidProfile } from "./profile.typings";

/**
 * =============================================================================
 * LDO ShapeTypes profile
 * =============================================================================
 */

/**
 * SolidProfile ShapeType
 */
export const SolidProfileShapeType: ShapeType<SolidProfile> = {
  schema: profileSchema,
  shape: "https://ldo.js.org/shapes/solid-profile.ttl#SolidProfile",
  context: profileContext,
};
