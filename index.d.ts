// Author: Trevor R <https://github.com/TJDoesCode>
// Date: 3/22/21

declare module "textfit" {
  interface textFitOptions {
    alignVert?: boolean;
    alignHoriz?: boolean;
    multiLine?: boolean;
    detectMultiLine?: boolean;
    minFontSize?: number;
    maxFontSize?: number;
    reProcess?: boolean;
    widthOnly?: boolean;
    alignVertWithFlexbox?: boolean;
  }

  export = textFit;

  function textFit(
    els: Element | Element[] | NodeListOf<Element> | HTMLCollection | null,
    options?: textFitOptions
  ): void;
}
