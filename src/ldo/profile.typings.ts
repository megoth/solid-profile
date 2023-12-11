import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for profile
 * =============================================================================
 */

/**
 * SolidProfile Type
 */
export interface SolidProfile {
  "@id"?: string;
  "@context"?: ContextDefinition;
  type:
    | {
        "@id": "Person";
      }
    | {
        "@id": "Person2";
      };
  fn?: string;
  hasPhoto?: {
    "@id": string;
  }[];
  name?: string;
  homepage?: string;
  knows?: {
    "@id": string;
  }[];
  inbox?: {
    "@id": string;
  };
  preferencesFile?: {
    "@id": string;
  };
  storage?: {
    "@id": string;
  }[];
  account?: {
    "@id": string;
  };
  oidcIssuer?: {
    "@id": string;
  };
  privateTypeIndex?: {
    "@id": string;
  };
  publicTypeIndex?: {
    "@id": string;
  };
}
