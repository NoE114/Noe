import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'git-janitor',
    index: '01',
    tag: 'SYSTEMS / SECURITY / ZERO-DEP',
    title: 'git-janitor',
    splitFirst: 'GIT',
    splitSecond: 'JANITOR',
    category: 'RUST 2024 • DIRECT .GIT ON-DISK PARSER',
    kanjiBadge: '掃討・零依存',
    kanjiWatermark: '掃討',
    kanjiCategory: '直接解析 // 機密探知',
    repoUrl: 'https://github.com/NoE114/git-janitor',
    techStack: ['Rust 2024', 'Nix Flakes', 'Podman/Docker', 'GNU Make', 'Zero Crate Deps'],
    summary: 'A dependency-free Rust CLI tool for Git repository maintenance and secret-leak detection. Reads Git internals directly from disk without shelling out to git.',
    architectureHighlights: [
      'Direct on-disk parsing of packed refs, HEAD resolution, index entries, and loose objects.',
      'Secret scanner detecting AWS keys, GitHub tokens, JWTs, Slack tokens, and high-entropy secrets.',
      'Branch analysis reporting merged, current, protected, gone, and upstream-tracking states.',
      'Automated pre-commit hook installer and multi-platform reproducible Nix flake build pipeline.'
    ],
    designConstraints: [
      'Zero external Rust crate dependencies — verified by deps-proof.txt.',
      'Does not invoke or shell out to the git executable.',
      'Memory safe: 256 MiB decompression safety limit and skips files > 1 MiB during text scans.',
      'Early NUL-byte binary detection with strict SHA-1 object verification.'
    ],
    cliCommands: [
      {
        command: 'git jan secrets scan --staged --format json',
        description: 'Scan staged Git changes for sensitive credentials before commit.',
        sampleOutput: `[
  {
    "rule": "aws-access-key-id",
    "entropy": 4.12,
    "file": "config/credentials.env",
    "line": 14,
    "redacted": "AKIA****************"
  }
]
[SYS_WARN] 1 high-entropy secret detected. Commit blocked.`
      },
      {
        command: 'git jan branch clean --apply',
        description: 'Prune stale merged local branches with safety checks.',
        sampleOutput: `Checking repository /home/noe/workspace/kernel-net...
Branches scanned: 18
Merged to origin/main:
  - fix/socket-buffer-overflow (merged 14d ago) -> PRUNED
  - feat/mmap-reader (merged 3d ago) -> PRUNED
Preserved:
  * main (protected)
  * security/crypto-audit (ahead 4)`
      },
      {
        command: 'git jan doctor',
        description: 'Verify Git metadata, index entries, packed refs, and object database integrity.',
        sampleOutput: `[DOCTOR] Inspecting repository internals:
  HEAD: refs/heads/main -> 7f83b165... [OK]
  Packed refs: 42 references resolved [OK]
  Index entries: 1,842 tracked files [OK]
  Object DB: 0 corrupt objects, 0 dangling loose blobs [OK]
  Integrity: 100% verified (Direct disk read, zero-exec)`
      }
    ],
    metrics: [
      { label: 'Crate Dependencies', value: '0 (deps-proof.txt)' },
      { label: 'Target Platforms', value: 'Linux, macOS, Windows, FreeBSD' },
      { label: 'Max Safe Decompression', value: '256 MiB Limit' },
      { label: 'Git Executable Calls', value: '0 (Direct Disk Parsing)' }
    ]
  },
  {
    id: 'textdistance-rust',
    index: '02',
    tag: 'ALGORITHMS / SEQUENCE METRICS',
    title: 'textdistance-rust',
    splitFirst: 'TEXT',
    splitSecond: 'DISTANCE',
    category: 'RUST 2024 • GENERIC SEQUENCE & ALIGNMENT CRATE',
    kanjiBadge: '距離計算・高速',
    kanjiWatermark: '距離',
    kanjiCategory: '文字列幾何 // 最適化',
    repoUrl: 'https://github.com/NoE114/textdistance-rust',
    techStack: ['Rust 2024', 'Generic Base<T>', 'flate2 / bzip2 / xz2', 'Algorithmic Optimization'],
    summary: 'A high-performance Rust port of the Python textdistance sequence-comparison library, providing generic metrics over arbitrary slice types with custom equality functions.',
    architectureHighlights: [
      'Unified Base<T> trait providing raw distance, normalized distance, similarity, and normalized similarity.',
      'Matrix-optimized Levenshtein, Damerau-Levenshtein (restricted & unrestricted), Hamming, and Jaro-Winkler.',
      'Biological sequence alignment: Needleman-Wunsch global alignment, Smith-Waterman local alignment, and Gotoh affine-gap.',
      'Compression-based algorithmic distances (zlib, bzip2, lzma) and q-gram n-tokenization.'
    ],
    designConstraints: [
      'Generic over element types implementing PartialEq, Hash, and Clone.',
      'Zero-allocation fast-paths for identical slices and prefix/suffix commonalities.',
      'Exact parity verification against the Python reference test suite.',
      'Constant-space sliding window implementations for single-character streams.'
    ],
    cliCommands: [
      {
        command: 'cargo test --lib -- --nocapture edit_based',
        description: 'Execute unit tests verifying Levenshtein and alignment algorithm parity.',
        sampleOutput: `running 32 tests
test edit_based::levenshtein::tests::test_identical ... ok
test edit_based::levenshtein::tests::test_kitten_sitting ... ok (dist=3, sim=0.5714)
test edit_based::damerau::tests::test_transposition ... ok
test edit_based::needleman_wunsch::tests::test_affine_align ... ok
test result: ok. 32 passed; 0 failed; 0 ignored; finished in 0.04s`
      },
      {
        command: 'cargo bench --bench alignment_metrics',
        description: 'Benchmark generic sequence alignment on large slice datasets.',
        sampleOutput: `Levenshtein/char_len_1024
                        time:   [14.281 µs 14.340 µs 14.412 µs]
                        thrpt:  [71.4 MB/s 71.8 MB/s 72.1 MB/s]
Smith-Waterman/subseq_512
                        time:   [42.110 µs 42.302 µs 42.518 µs]`
      }
    ],
    metrics: [
      { label: 'Algorithm Count', value: '25+ Sequence Metrics' },
      { label: 'Slice Types', value: 'Generic T: PartialEq' },
      { label: 'Py Parity Check', value: '100% Reference Verified' },
      { label: 'Compression Metrics', value: 'Gzip, Bzip2, Xz' }
    ]
  },
  {
    id: 'scirp',
    index: '03',
    tag: 'CIVIC INFRASTRUCTURE / BACKEND',
    title: 'SCIRP (CivicPulse)',
    splitFirst: 'CIVIC',
    splitSecond: 'PULSE',
    category: 'PYTHON FLASK • REACT • LEAFLET • GEOSPATIAL SLA ENGINE',
    kanjiBadge: '市民基盤・即時',
    kanjiWatermark: '警報',
    kanjiCategory: '地理空間 // 事案対応',
    repoUrl: 'https://github.com/NoE114/SCIRP',
    techStack: ['Python Flask', 'React / Vite', 'SQLAlchemy', 'JWT Extended', 'Leaflet Geospatial', 'Tailwind CSS'],
    summary: 'A full-stack municipal civic issue reporting and SLA resolution platform connecting citizens with municipal departments, geolocated routing, and automatic escalation.',
    architectureHighlights: [
      'Multi-role state machine: Citizen, Field Officer, Department Head, and Municipal Admin.',
      'Geospatial complaint clustering: automatically detects duplicate incidents within proximity radius.',
      'Workload-aware assignment engine routing complaints based on ward, department, and active ticket load.',
      'Real-time SLA deadline tracking with automated status escalation and padded public tracking IDs.'
    ],
    designConstraints: [
      'Strict RBAC enforcement across all REST endpoints with JWT validation.',
      'Atomic database transactions preventing race conditions in officer assignment.',
      'Sanitized file upload validation with MIME verification for photographic evidence.',
      'Single-use, time-limited cryptographic tokens for secure password resets.'
    ],
    cliCommands: [
      {
        command: 'gunicorn --bind 127.0.0.1:5000 --workers 1 --threads 4 wsgi:app',
        description: 'Boot the production WSGI application with SLA event listeners.',
        sampleOutput: `[INFO] Starting gunicorn 21.2.0
[INFO] Listening at: http://127.0.0.1:5000
[INFO] Booting worker with pid: 28410
[CivicPulse] Database schema initialized. Ward boundaries: 42 zones loaded.
[CivicPulse] SLA scheduler active: tick interval 60s.`
      },
      {
        command: 'curl -X GET /api/v1/complaints/track/CP-2026-0892',
        description: 'Query public incident status with anonymized progression logs.',
        sampleOutput: `{
  "tracking_id": "CP-2026-0892",
  "category": "Water Main Rupture",
  "ward": 14,
  "status": "IN_PROGRESS",
  "escalated": false,
  "assigned_officer_id": "OFF-412",
  "sla_remaining_hours": 11.4
}`
      }
    ],
    metrics: [
      { label: 'Role Hierarchy', value: '4 Levels (Citizen to Admin)' },
      { label: 'Geospatial Clustering', value: 'Haversine Proximity Check' },
      { label: 'SLA Tracking', value: 'Automated Escalation' },
      { label: 'Mapping', value: 'Interactive Leaflet GIS' }
    ]
  },
  {
    id: 'campus-lost-found',
    index: '04',
    tag: 'VISION & AI / MULTI-MODAL MATCHING',
    title: 'campus-lost-found',
    splitFirst: 'CAMPUS',
    splitSecond: 'FINDER',
    category: 'FLASK 3 • PYTORCH VISION EMBEDDINGS • RAPIDFUZZ',
    kanjiBadge: '人工知能・捜索',
    kanjiWatermark: '捜索',
    kanjiCategory: '多重埋込 // 照合探索',
    repoUrl: 'https://github.com/NoE114/campus-lost-found',
    techStack: ['Python Flask 3', 'PyTorch / TorchVision', 'RapidFuzz', 'SQLAlchemy', 'JWT', 'Flask-Mail'],
    summary: 'AI-assisted lost-and-found recovery platform for universities using multi-modal embeddings and metadata similarity to autonomously link lost reports with found items.',
    architectureHighlights: [
      'TorchVision visual feature extraction converting uploaded images into dense vector representations.',
      'Hybrid scoring pipeline combining vector cosine similarity with RapidFuzz metadata matching.',
      'Automated email notification engine with threshold-based deduplication preventing repeated alerts.',
      'Structured NLP parser extracting entity attributes from unstructured natural language reports.'
    ],
    designConstraints: [
      'Metadata-only graceful fallback when GPU acceleration or visual embeddings are unavailable.',
      'Configurable match notification threshold (default 75.0% confidence score).',
      'Strict image verification (5 MiB limit, PIL inspection, stripped EXIF metadata).',
      'Event-driven database hooks triggering re-indexing on new report submissions.'
    ],
    cliCommands: [
      {
        command: 'python test_matcher.py',
        description: 'Run test suite verifying hybrid image embedding + metadata confidence scoring.',
        sampleOutput: `[TEST] Evaluating item match scoring:
  Query Item: "Space Gray ThinkPad X1 with Arch sticker"
  Found Candidate #1: "Black Lenovo laptop found in CS Lab 3"
  - Visual Embedding Cosine Sim: 0.884
  - RapidFuzz Metadata Match:    0.812
  - Composite Confidence Score:  85.2% (Threshold: 75.0%)
  [RESULT] High confidence match! Notification dispatched.`
      },
      {
        command: 'curl -X POST /api/v1/ai/parse -d \'{"text": "Left black hydroflask in library 2nd floor"}\'',
        description: 'Parse free-text report into structured category, color, and location fields.',
        sampleOutput: `{
  "category": "personal_accessory",
  "item_type": "water_bottle",
  "color": "black",
  "brand": "Hydro Flask",
  "location": "Library Level 2",
  "timestamp": "2026-09-19T03:30:00Z"
}`
      }
    ],
    metrics: [
      { label: 'Vision Model', value: 'PyTorch / TorchVision' },
      { label: 'Confidence Threshold', value: '75.0% Auto-Alert' },
      { label: 'Text Matching', value: 'RapidFuzz Token Set' },
      { label: 'Deduplication', value: 'Stored Notification Hashes' }
    ]
  }
];

export const DEVELOPER_PROFILE = {
  handle: 'NoE114',
  styledHandle: 'NoE',
  realName: 'Raj Dey',
  email: 'rajdey8787@gmail.com',
  github: 'https://github.com/NoE114',
  tagline: 'MY FOCUS IS LOW-LEVEL SYSTEMS & SECURITY.',
  role: 'Systems & Security Focused Engineer',
  environment: 'Arch Linux • Neovim • CLI',
  workingStyle: 'Terminal-first, detail-oriented, zero-dependency philosophy',
  skills: [
    { category: 'Languages', items: ['Rust 2024', 'C', 'Python', 'Shell / Bash', 'TypeScript', 'Assembly (x86_64)'] },
    { category: 'Systems & Kernel', items: ['Linux Internals', 'Git Internals (.git on-disk)', 'Direct Memory / Buffer Ops', 'Reproducible Nix Flakes'] },
    { category: 'Security & Forensics', items: ['Secret Leak Detection', 'Entropy Analysis', 'Object Integrity Verification', 'Static Binary Analysis'] },
    { category: 'Tooling & Workflow', items: ['Arch Linux', 'Neovim', 'Docker / Podman', 'GNU Make', 'GDB / LLDB'] }
  ],
  affiliations: [
    { title: 'AMUHACKS 5.0', role: 'Participant / Builder', repo: 'X0R_AMUHACKS5.0' },
    { title: 'PE-Hackathon-Template-2026', role: 'Systems Architecture', repo: 'PE-Hackathon-Template-2026' },
    { title: 'Open Source Security Research', role: 'Independent Maintainer', repo: 'NoE114/git-janitor' }
  ]
};
