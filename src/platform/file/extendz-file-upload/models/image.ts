export class Image {
  url: string;
  thumb?: string;
  loading?: boolean = true;

  constructor(url?: string, loading?: boolean) {
    this.url = url;
    this.loading = loading;
  }
}
