import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
  FiHome, FiGrid, FiHash, FiFileText, FiCopy, FiDownload, FiGithub, FiLinkedin, FiMoon, FiSearch, FiCornerDownLeft,
} from 'react-icons/fi';
import { projects } from '../data/projects';
import { socials } from '../data/profile';
import { cvFileName, cvUrl } from '../data/experience';
import { copyEmail, scrollToSection, sections } from '../lib';
import { useTheme } from '../hooks/useTheme';

interface Command {
  id: string;
  group: 'Pages' | 'Projects' | 'Actions';
  label: string;
  hint?: string;
  keywords?: string;
  icon: IconType;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => navigate(path);
    const openUrl = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');
    const github = socials.find((s) => s.label === 'GitHub')!;
    const linkedin = socials.find((s) => s.label === 'LinkedIn')!;
    // On the home page scroll to the section; elsewhere navigate to it
    const section = (id: string) => () => {
      if (window.location.pathname !== '/' || !scrollToSection(id)) navigate(`/#${id}`);
    };
    const sectionKeywords: Record<string, string> = {
      about: 'bio background',
      skills: 'stack technologies tools',
      experience: 'jobs roles work history cv resume',
      projects: 'portfolio case studies',
      certifications: 'azure microsoft ai-102 dp-100 education degree',
      contact: 'hire email message',
    };
    return [
      { id: 'home', group: 'Pages', label: 'Home', icon: FiHome, run: go('/') },
      ...sections.map<Command>((s) => ({
        id: s.id, group: 'Pages', label: s.label, hint: 'Section', keywords: sectionKeywords[s.id], icon: FiHash, run: section(s.id),
      })),
      { id: 'work', group: 'Pages', label: 'All projects', hint: 'Archive', keywords: 'projects portfolio work', icon: FiGrid, run: go('/work') },
      ...projects.map<Command>((p) => ({
        id: `project-${p.slug}`,
        group: 'Projects',
        label: p.title,
        hint: p.category,
        keywords: p.tags.join(' '),
        icon: FiFileText,
        run: go(`/work/${p.slug}`),
      })),
      { id: 'copy-email', group: 'Actions', label: 'Copy email address', keywords: 'mail contact', icon: FiCopy, run: () => void copyEmail() },
      {
        id: 'cv', group: 'Actions', label: 'Download CV', keywords: 'resume pdf', icon: FiDownload,
        run: () => {
          const a = document.createElement('a');
          a.href = cvUrl;
          a.download = cvFileName;
          a.click();
        },
      },
      { id: 'theme', group: 'Actions', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, keywords: 'dark light mode', icon: FiMoon, run: toggleTheme },
      { id: 'github', group: 'Actions', label: 'Open GitHub', hint: 'mikias1219', icon: FiGithub, run: openUrl(github.href) },
      { id: 'linkedin', group: 'Actions', label: 'Open LinkedIn', icon: FiLinkedin, run: openUrl(linkedin.href) },
    ];
  }, [navigate, theme, toggleTheme]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return commands;
    return commands.filter((c) => {
      const haystack = `${c.label} ${c.hint ?? ''} ${c.keywords ?? ''} ${c.group}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
  }, [commands, query]);

  // Reset on open, restore focus on close
  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      returnFocus.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const runCommand = (command?: Command) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (results.length ? (i + 1) % results.length : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(Math.max(results.length - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        runCommand(results[active]);
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'Tab':
        // Keep focus inside the dialog
        e.preventDefault();
        break;
    }
  };

  let lastGroup = '';

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="palette-search">
          <FiSearch aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            aria-label="Search pages, projects and actions"
            placeholder="Search pages, projects, actions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>Esc</kbd>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" aria-label="Results" className="palette-list">
          {results.map((c, i) => {
            const header = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            const Icon = c.icon;
            return (
              <React.Fragment key={c.id}>
                {header && <li role="presentation" className="palette-group">{header}</li>}
                <li
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  className="palette-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => runCommand(c)}
                >
                  <Icon aria-hidden="true" className="palette-icon" />
                  <span className="palette-label">{c.label}</span>
                  {c.hint && <span className="palette-hint">{c.hint}</span>}
                  {i === active && <FiCornerDownLeft aria-hidden="true" className="palette-enter" />}
                </li>
              </React.Fragment>
            );
          })}
        </ul>
        {!results.length && <p className="palette-empty">No results for “{query}”.</p>}

        <div className="palette-footer mono" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
