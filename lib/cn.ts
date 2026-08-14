/**
 * Joins conditional class names. Deliberately dependency-free — the project
 * never needs conflicting-class resolution because variants are composed from
 * mutually exclusive maps rather than merged ad hoc.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
