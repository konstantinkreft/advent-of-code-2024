declare module 'bun' {
  interface Env {
    SESSION: string;
    YEAR: string;
  }
}

declare module '*.txt' {
  var text: string;
  export = text;
}
