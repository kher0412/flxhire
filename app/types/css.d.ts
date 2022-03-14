declare interface ICSSModule {
  [key: string]: string
}

declare module "*.module.css" {
  /**
   * Represents a CSS module.
   */
  const styles: ICSSModule
  export = styles
}
