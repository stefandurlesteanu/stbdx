export function Url(baseUrl: string) {
  return function (constructor: Function): void {
    constructor.prototype.endpoint = baseUrl;
  };
}
