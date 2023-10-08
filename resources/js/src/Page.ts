import {Cash} from "cash-dom";

export class Page {
  private readonly $page: Cash;

  constructor(elem) {
    this.$page = $(elem);
  }

  public getRoot() {
    return this.$page;
  }
}
