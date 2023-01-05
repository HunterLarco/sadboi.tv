import type { BroadcastEventFieldPolicy } from '@generated/graphql/typedPolicies';

const policy: BroadcastEventFieldPolicy = {
  details: {
    // When duplicate events are being reconciled, prefer to overwrite the
    // details property.
    //
    // See https://go.apollo.dev/c/merging-non-normalized-objects
    merge: false,
  },
};

export default policy;
