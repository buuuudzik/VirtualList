import { ReactNode } from "react";

export interface VirtualizedListProps<T = any> {
  /** Array of items to render in the list */
  items: T[];

  /** Height of a single row in pixels */
  height: number;

  /**
   * Visible height of the scroll container.
   * Can be a fixed number (e.g. 400) or a CSS unit string (e.g. '100%', '50vh')
   */
  containerHeight?: number | string;

  /**
   * Number of extra rows to render above and below
   * the visible range to improve scrolling experience
   */
  overscanCount?: number;

  /**
   * Function that renders a row based on the item and index
   */
  rowRenderer: (item: T, index: number) => ReactNode;
}
