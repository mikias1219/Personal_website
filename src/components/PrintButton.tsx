"use client";
export function PrintButton() {
  return (
    <button className="button button-secondary" onClick={() => window.print()}>
      Print experience ↗
    </button>
  );
}
