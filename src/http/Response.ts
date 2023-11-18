export class HttpResponse{
  statusCode: number = 200;
  data?: string;

  public status(value: number) {
    this.statusCode = value;
    return this;
  }

  public json(data: any) {
    this.data = JSON.stringify(data);
    return this;
  }

  public send(value: string) {
    this.data = value;
    return this;
  }
}
