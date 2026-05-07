import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "fit-text": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};