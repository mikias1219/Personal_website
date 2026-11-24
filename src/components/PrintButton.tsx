"use client";
import { Icon } from "./Icon";

export function PrintButton() {
  return (
    <button
      type="button"
      className="button button-secondary button-small"
      onClick={() => window.print()}
    >
      <Icon name="download" /> Print this page
    </button>
  );
}
