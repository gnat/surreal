// Type definitions for Surreal

/**
 * Represents a chainable Surreal object for DOM manipulation.
 */
declare class SurrealChain {
  constructor(element: HTMLElement | SVGElement | Document);

  /**
   * Executes a function on the selected element(s).
   * @param f Function to execute on each element.
   */
  run(f: (e: HTMLElement | SVGElement) => void): this;

  /**
   * Removes the selected element(s) from the DOM.
   */
  remove(): void;

  /**
   * Adds a class to the selected element(s).
   * @param name Class name to add.
   */
  classAdd(name: string): this;
  class_add(name: string): this;
  addClass(name: string): this;
  add_class(name: string): this;

  /**
   * Removes a class from the selected element(s).
   * @param name Class name to remove.
   */
  classRemove(name: string): this;
  class_remove(name: string): this;
  removeClass(name: string): this;
  remove_class(name: string): this;

  /**
   * Toggles a class on the selected element(s).
   * @param name Class name to toggle.
   * @param force If true, adds the class. If false, removes it.
   */
  classToggle(name: string, force?: boolean): this;
  class_toggle(name: string, force?: boolean): this;
  toggleClass(name: string, force?: boolean): this;
  toggle_class(name: string, force?: boolean): this;

  /**
   * Applies styles to the selected element(s).
   * @param value CSS string or object with style properties.
   */
  styles(value: string | Partial<CSSStyleDeclaration>): this;

  /**
   * Gets, sets, or removes attributes on the selected element(s).
   * @param name Attribute name or object of attributes.
   * @param value Attribute value. Use null to remove the attribute.
   */
  attribute(name: string): string | null;
  attribute(name: string, value: string | number | boolean | null): this;
  attribute(attributes: Record<string, string | number | boolean | null>): this;
  attributes: typeof SurrealChain.prototype.attribute;
  attr: typeof SurrealChain.prototype.attribute;

  /**
   * Triggers a custom event on the selected element(s).
   * @param name Event name.
   * @param detail Optional event details.
   */
  send(name: string, detail?: any): this;
  trigger(name: string, detail?: any): this;

  /**
   * Adds an event listener to the selected element(s).
   * @param type Event type.
   * @param listener Event listener function.
   */
  on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  ): this;

  /**
   * Removes an event listener from the selected element(s).
   * @param type Event type.
   * @param listener Event listener function to remove.
   */
  off<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  ): this;

  /**
   * Removes all event listeners from the selected element(s).
   */
  offAll(): this;

  /**
   * Disables the selected element(s).
   */
  disable(): this;

  /**
   * Enables the selected element(s).
   */
  enable(): this;

  /**
   * Fades out the selected element(s) and optionally removes them.
   * @param f Optional callback function after fade out.
   * @param ms Duration of fade out in milliseconds.
   * @param remove Whether to remove the element after fade out.
   */
  fadeOut(
    f?: (e: HTMLElement | SVGElement) => void,
    ms?: number,
    remove?: boolean,
  ): this;
  fade_out(
    f?: (e: HTMLElement | SVGElement) => void,
    ms?: number,
    remove?: boolean,
  ): this;

  /**
   * Fades in the selected element(s).
   * @param f Optional callback function after fade in.
   * @param ms Duration of fade in in milliseconds.
   */
  fadeIn(f?: (e: HTMLElement | SVGElement) => void, ms?: number): this;
  fade_in(f?: (e: HTMLElement | SVGElement) => void, ms?: number): this;
}

/**
 * Main Surreal function for selecting and manipulating DOM elements.
 * @param selector CSS selector, element, or event.
 * @param start Optional starting element for the selection.
 * @param warning Whether to show warnings for invalid selectors.
 */
interface SurrealStatic {
  (
    selector?: string | HTMLElement | SVGElement | Document | Event | null,
    start?: HTMLElement | SVGElement | Document,
    warning?: boolean,
  ): SurrealChain;

  /**
   * Adds Surreal functions to the global scope.
   */
  globalsAdd(): void;
}

declare const surreal: SurrealStatic;

/**
 * Selects a single element and returns a Surreal chain.
 * @param selector CSS selector, element, or event.
 * @param start Optional starting element for the selection.
 * @param warning Whether to show warnings for invalid selectors.
 */
declare function me(
  selector?: string | HTMLElement | SVGElement | Document | Event | null,
  start?: HTMLElement | SVGElement | Document,
  warning?: boolean,
): SurrealChain;

/**
 * Selects multiple elements and returns an array of Surreal chains.
 * @param selector CSS selector, element, or event.
 * @param start Optional starting element for the selection.
 * @param warning Whether to show warnings for invalid selectors.
 */
declare function any(
  selector?: string | HTMLElement | SVGElement | Document | Event | null,
  start?: HTMLElement | SVGElement | Document,
  warning?: boolean,
): SurrealChain[];

/**
 * Asynchronous sleep function.
 * @param ms Number of milliseconds to sleep.
 * @param callback Optional callback function after sleep.
 */
declare function sleep(ms: number, callback?: (e: any) => void): Promise<void>;

/**
 * Waits for the next animation frame.
 */
declare function tick(): Promise<void>;

/**
 * Alias for requestAnimationFrame.
 */
declare const rAF: typeof requestAnimationFrame;

/**
 * Alias for requestIdleCallback.
 */
declare const rIC: typeof requestIdleCallback;

/**
 * Halts an event, optionally allowing bubbling or default behavior.
 * @param ev Event to halt.
 * @param keepBubbling Whether to allow event bubbling.
 * @param keepDefault Whether to allow default event behavior.
 */
declare function halt(
  ev: Event,
  keepBubbling?: boolean,
  keepDefault?: boolean,
): Event;

/**
 * Creates an HTML element.
 * @param tagName The tag name of the element to create.
 */
declare function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
): HTMLElementTagNameMap[K];
declare const create_element: typeof createElement;

/**
 * Adds a function to be executed when the DOM is ready.
 * @param f Function to execute on DOM ready.
 */
declare function onloadAdd(f: () => void): void;
declare const addOnload: typeof onloadAdd;
declare const onload_add: typeof onloadAdd;
declare const add_onload: typeof onloadAdd;

// Extend the global Window interface
interface Window {
  surreal: typeof surreal;
  me: typeof me;
  any: typeof any;
  sleep: typeof sleep;
  tick: typeof tick;
  rAF: typeof rAF;
  rIC: typeof rIC;
  halt: typeof halt;
  createElement: typeof createElement;
  create_element: typeof createElement;
  onloadAdd: typeof onloadAdd;
  addOnload: typeof onloadAdd;
  onload_add: typeof onloadAdd;
  add_onload: typeof onloadAdd;
}
