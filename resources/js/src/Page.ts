import {Cash} from "cash-dom/dist/cash";

export class Page {
  private readonly $page: Cash;

  constructor(elem) {
    this.$page = $(elem);
  }

  public getRoot() {
    return this.$page;
  }
}
