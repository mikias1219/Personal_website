"use client";
import { motion, useReducedMotion } from "motion/react";
const steps = [
  ["request", "“What’s in our documents?”", "↳"],
  ["retrieval", "Find relevant context", "⌕"],
  ["model", "Generate with evidence", "✳"],
  ["answer", "Grounded. Ready to use.", "↗"],
];
export function SystemTrace() {
  const reduce = useReducedMotion();
  return (
    <div className="trace-panel">
      <div className="trace-heading">
        <span className="mono">system.trace</span>
        <span className="mono">
          <i className="signal" /> illustrative flow
        </span>
      </div>
      <div className="trace-body">
        <p className="eyebrow">From question to useful answer</p>
        <ol>
          {steps.map(([label, detail, icon], i) => (
            <li key={label}>
              <motion.span
                className="trace-icon"
                initial={false}
                animate={
                  reduce
                    ? {}
                    : {
                        borderColor: [
                          "var(--line)",
                          "var(--accent)",
                          "var(--line)",
                        ],
                      }
                }
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.65 }}
                aria-hidden="true"
              >
                {icon}
              </motion.span>
              <div>
                <span className="mono trace-label">
                  0{i + 1} / {label}
                </span>
                <p>{detail}</p>
              </div>
              <span className="trace-check" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ol>
        <div className="trace-code mono">
          <span className="accent">return</span> answer.with(context)
        </div>
      </div>
      <div className="trace-footer mono">
        <span>INPUT → CONTEXT → OUTPUT</span>
        <span className="accent">● grounded by design</span>
      </div>
    </div>
  );
}
