declare module "*.yaml" {
  const value: string;
  export default value;
}

declare module "*.yml" {
  const value: string;
  export default value;
}

declare module "js-yaml" {
  export function load(input: string): unknown;
}
