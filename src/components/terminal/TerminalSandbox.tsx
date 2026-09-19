import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Minimize2, Maximize2, Trash2 } from 'lucide-react';
import { PROJECTS, DEVELOPER_PROFILE } from '../../data/projects';

interface TerminalSandboxProps {
  isOpen: boolean;
  onClose: () => void;
  initialCommand?: string;
  initialOutput?: string;
}

interface CommandLog {
  id: string;
  command: string;
  output: string;
  time: string;
}

export const TerminalSandbox: React.FC<TerminalSandboxProps> = ({
  isOpen,
  onClose,
  initialCommand,
  initialOutput,
}) => {
  const [input, setInput] = useState<string>('');
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-0',
      command: 'uname -a',
      output: 'Linux noe-arch 6.12.9-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
      time: '03:30:12',
    },
    {
      id: 'init-1',
      command: 'git jan doctor',
      output: `[DOCTOR] Inspecting repository internals:
  HEAD: refs/heads/main -> 7f83b165... [OK]
  Packed refs: 42 references resolved [OK]
  Index entries: 1,842 tracked files [OK]
  Object DB: 0 corrupt objects, 0 dangling loose blobs [OK]
  Integrity: 100% verified (Direct disk read, zero-exec, zero crate dependencies)`,
      time: '03:30:14',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialCommand && initialOutput) {
      setHistory((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          command: initialCommand,
          output: initialOutput,
          time: new Date().toLocaleTimeString(),
        },
      ]);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [initialCommand, initialOutput]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    let response = '';
    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      response = `Available commands:
  git jan doctor              - Run git-janitor repository diagnostics
  git jan secrets scan        - Scan workspace for secret leaks (AWS, GitHub, JWT)
  git jan branch clean        - Dry-run prune merged local branches
  cargo test                  - Run textdistance-rust algorithm test suite
  status                      - Display current systems & security environment
  whoami                      - Developer identity and affiliations
  projects                    - List featured repositories
  clear                       - Clear terminal screen
  exit                        - Close CLI sandbox`;
    } else if (lower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else if (lower.includes('git jan doctor')) {
      response = `[DOCTOR] Inspecting repository internals:
  HEAD: refs/heads/main -> 7f83b165... [OK]
  Packed refs: 42 references resolved [OK]
  Index entries: 1,842 tracked files [OK]
  Object DB: 0 corrupt objects, 0 dangling loose blobs [OK]
  Integrity: 100% verified (Direct disk read, zero-exec)`;
    } else if (lower.includes('secrets scan')) {
      response = `[SCAN] Checking 1,842 files for secret patterns...
Scanning working tree and staged index...
[INFO] Parsed .leakignore: 14 patterns loaded.
[RESULT] 0 credentials leaked. Working tree clean. (Scanned in 18ms via Rust native parser)`;
    } else if (lower.includes('branch clean')) {
      response = `[BRANCH] Analyzing local branches tracking origin:
  * main (current, protected)
  - feature/sha256-probe (merged to main 2d ago) -> [DRY-RUN] Will delete with --apply
  - chore/clippy-cleanup (merged to main 5d ago) -> [DRY-RUN] Will delete with --apply
Run with '--apply' to confirm removal.`;
    } else if (lower.includes('cargo test') || lower.includes('testdistance')) {
      response = `running 28 tests in textdistance_rust::edit_based
test edit_based::levenshtein::test_basic ... ok
test edit_based::levenshtein::test_utf8_graphemes ... ok
test edit_based::damerau::test_transposition ... ok
test edit_based::needleman_wunsch::test_global_align ... ok
test result: ok. 28 passed; 0 failed; 0 ignored; finished in 0.03s`;
    } else if (lower === 'whoami' || lower === 'about') {
      response = `Handle: ${DEVELOPER_PROFILE.handle} (${DEVELOPER_PROFILE.styledHandle})
Real Name: ${DEVELOPER_PROFILE.realName}
Email: ${DEVELOPER_PROFILE.email}
Role: ${DEVELOPER_PROFILE.role}
Environment: ${DEVELOPER_PROFILE.environment}
Focus: Low-level systems, Git internals, Zero-dependency Rust tools, Binary Forensics.`;
    } else if (lower === 'projects') {
      response = PROJECTS.map((p) => `[${p.index}] ${p.title.padEnd(20)} - ${p.category}`).join('\n');
    } else if (lower === 'status') {
      response = `KERNEL_STATUS: ONLINE
ARCH: X86_64
MEMORY: ZERO CRATE OVERHEAD
PLATFORM: NIX REPRODUCIBLE CONTAINER
SECURITY AUDIT: PASSED (AMUHACKS 5.0 / PE-HACKATHON-2026)`;
    } else {
      response = `zsh: command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: cmd,
        output: response,
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setInput('');
  };

  return (
    <div
      id="terminal-sandbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
    >
      <div
        className={`w-full ${
          isMaximized ? 'h-full max-w-full' : 'max-w-4xl h-[600px]'
        } flex flex-col bg-[#050605] border border-[#9CFF4A]/40 shadow-2xl shadow-[#9CFF4A]/10 font-mono text-xs overflow-hidden transition-all duration-300`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e130d] border-b border-[#9CFF4A]/20 select-none text-[#D7D9D2]">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="w-3.5 h-3.5 text-[#9CFF4A]" />
            <span className="font-bold tracking-wider text-[11px] text-[#9CFF4A]">
              noe@archlinux: ~/workspace/NoE114 (zsh)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 hover:text-[#9CFF4A] text-[#D7D9D2]/60 transition-colors"
              title="Clear screen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-[#9CFF4A] text-[#D7D9D2]/60 transition-colors"
              title="Toggle maximize"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-red-400 text-[#D7D9D2]/60 transition-colors"
              title="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#050605] text-[#D7D9D2]">
          <div className="text-[#9CFF4A]/60 text-[11px] leading-relaxed border-b border-[#9CFF4A]/10 pb-2">
            [SYS_INIT] NoE114 Interactive Kernel &amp; CLI Sandbox v2026.09<br />
            Type <span className="text-[#9CFF4A] font-bold">help</span> to list verified repository commands.
          </div>

          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center space-x-2 text-[#D7D9D2]/80">
                <span className="text-[#9CFF4A]">noe@arch</span>
                <span className="text-[#9CFF4A]/50">:</span>
                <span className="text-[#D7D9D2]/60">~</span>
                <span className="text-[#9CFF4A] font-bold">$</span>
                <span className="text-[#D7D9D2] font-semibold">{item.command}</span>
                <span className="text-[9px] text-[#D7D9D2]/30 ml-auto">{item.time}</span>
              </div>
              <pre className="text-[#9CFF4A]/90 whitespace-pre-wrap pl-4 border-l border-[#9CFF4A]/30 py-0.5 leading-relaxed font-mono">
                {item.output}
              </pre>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#0e130d] border-t border-[#9CFF4A]/20"
        >
          <span className="text-[#9CFF4A] font-bold">noe@arch:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. git jan doctor, secrets scan, cargo test, help)..."
            className="flex-1 bg-transparent text-[#D7D9D2] focus:outline-none placeholder:text-[#D7D9D2]/30 font-mono text-xs"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#9CFF4A] text-[#050605] font-bold text-[10px] hover:bg-[#D7D9D2] transition-colors"
          >
            RUN
          </button>
        </form>
      </div>
    </div>
  );
};
