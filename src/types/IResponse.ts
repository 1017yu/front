export default interface IResponse<T> {
  data: T;
  statusCode: number;
}
