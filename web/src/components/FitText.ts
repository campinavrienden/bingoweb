class FitText extends HTMLElement {
  private span!: HTMLSpanElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        span {
          display: inline-block;
          transform-origin: center;
          white-space: nowrap;
        }
      </style>
      <span><slot></slot></span>
    `;

    this.span = shadow.querySelector("span")!;
  }

  connectedCallback() {
    this.fit();
    new ResizeObserver(() => this.fit()).observe(this);
  }

  fit() {
    const parentWidth = this.clientWidth;
    const textWidth = this.span.scrollWidth;

    if (textWidth === 0) return;

    const scale = parentWidth / textWidth;
    this.span.style.transform = `scale(${scale})`;
  }
}

customElements.define("fit-text", FitText);