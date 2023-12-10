import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * profileContext: JSONLD Context for profile
 * =============================================================================
 */
export const profileContext: ContextDefinition = {
  type: {
    "@id": "@type",
  },
  Person: "http://schema.org/Person",
  Person2: "http://xmlns.com/foaf/0.1/Person",
  fn: {
    "@id": "http://www.w3.org/2006/vcard/ns#fn",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  hasPhoto: {
    "@id": "http://www.w3.org/2006/vcard/ns#hasPhoto",
    "@type": "@id",
    "@container": "@set",
  },
  name: {
    "@id": "http://xmlns.com/foaf/0.1/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  homepage: {
    "@id": "http://xmlns.com/foaf/0.1/homepage",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  knows: {
    "@id": "http://xmlns.com/foaf/0.1/knows",
    "@type": "@id",
    "@container": "@set",
  },
  inbox: {
    "@id": "http://www.w3.org/ns/ldp#inbox",
    "@type": "@id",
  },
  preferencesFile: {
    "@id": "http://www.w3.org/ns/pim/space#preferencesFile",
    "@type": "@id",
  },
  storage: {
    "@id": "http://www.w3.org/ns/pim/space#storage",
    "@type": "@id",
    "@container": "@set",
  },
  account: {
    "@id": "http://www.w3.org/ns/solid/terms#account",
    "@type": "@id",
  },
  oidcIssuer: {
    "@id": "http://www.w3.org/ns/solid/terms#oidcIssuer",
    "@type": "@id",
  },
  privateTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#privateTypeIndex",
    "@type": "@id",
  },
  publicTypeIndex: {
    "@id": "http://www.w3.org/ns/solid/terms#publicTypeIndex",
    "@type": "@id",
  },
};
