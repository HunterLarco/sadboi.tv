// Normally this would be implemented as:
//
// ```cc
// return (seed * kBigPrime) % kMaxId;
// ```
//
// However, we want to introduce a min-bound and reduce the number of digits
// returned so that UI displaying this ID isn't always forced to render 64
// digits. For example, the min-bound 100,000 would generate the first 900,000
// seeds as 6-digit numbers before returning 7-digit numbers. We achieve this by
// dynamically selecting `kMaxId` as follows:
//
// 1. we will always choose `kMaxId` so that it is that smallest order of
//    magnitude that is still less than `min_bound + seed`.
// 2. we will then compute the ID as:
//    `((seed + min_bound) * kBigPrime) % (kMaxId - kMaxId / 10) + kMaxId / 10`
//
// This ensures that we always generate the smallest number of digits given the
// seed and min-bound, but will increase the number of digits allowable as the
// seed increases.
//
// See https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n
export function psuedoRandomId(args: {
  seed: number;
  minBound: number;
}): number {
  const { seed, minBound } = args;

  let rangeStart = minBound;
  let rangeEnd =
    minBound == 0 ? 1 : Math.pow(10, 1 + Math.floor(Math.log10(rangeStart)));
  while (seed + minBound >= rangeEnd) {
    rangeStart = rangeEnd;
    rangeEnd *= 10;
  }

  const kBigPrime = 10023458579;
  return (
    mulmod({
      a: kBigPrime,
      b: seed + minBound,
      modulus: rangeEnd - rangeStart,
    }) + rangeStart
  );
}

// Performs `(a * b) % modulus` while mitigating overflow from `a * b`.
//
// See https://www.geeksforgeeks.org/multiply-large-integers-under-large-modulo
function mulmod(args: { a: number; b: number; modulus: number }): number {
  let { a, b, modulus } = args;

  let result = 0;
  a %= modulus;
  while (b > 0) {
    if ((b & 1) > 0) {
      result = (result + a) % modulus;
    }
    a = (a * 2) % modulus;
    b = b >> 1;
  }
  return result % modulus;
}
