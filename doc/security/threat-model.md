# TULIP — Living Threat Model

- **Repository:** [oss-slu/TULIP](https://github.com/oss-slu/TULIP)
- **License:** MIT License
- **Partner Organization:** Saint Louis University School of Law Clinic Program
- **Architecture:** React SPA (`app/`), Node/Prisma API (`api/`), PostgreSQL (`@prisma/adapter-pg`)
- **Methodology:** Attack Trees + Trust-Boundary STRIDE + PASTA
- **Status:** Active / Living Document (Every pull request modifying intake forms, Prisma models, or authentication flows must review and update this file)

---

## 1. Executive Summary

TULIP (Trusted Unified Legal Intake Portal) is a web application built in partnership with the Saint Louis University School of Law Clinic Program to replace paper-based legal intake and standardize case-assignment workflows across all university legal clinics. Because TULIP ingests highly sensitive legal narratives, personally identifiable information (PII), adverse-party details, and supporting case documents directly from prospective clients, a security breach carries severe legal, ethical, and professional-responsibility consequences (attorney-client confidentiality and conflict-of-interest integrity).

Using Attack Tree analysis for high-value legal records paired with STRIDE across trust boundaries, we identify three paramount risks:
1. **Unauthorized Disclosure of Prospective Client PII & Case Narratives:** Via unauthenticated intake endpoints, Broken Object Level Authorization (BOLA), or unencrypted database storage.
2. **Cross-Clinic Isolation & Conflict-of-Interest Breaches:** Allowing student attorneys in one clinic to view cases assigned to another clinic.
3. **Malicious Document Uploads & Early-Stage OSS Maturity Gaps:** In an actively evolving repository where authentication, file storage, and CI security gates must be hardened ahead of live clinic adoption.

---

## 2. Product Context & High-Value Legal Assets

The SLU School of Law Clinic Program operates multiple specialized legal clinics (e.g., litigation, transactional, immigration, or community advocacy) staffed by supervising faculty attorneys, clinic administrators, and law students. TULIP centralizes client intake and routes screened matters to the appropriate clinic.

### High-Value Assets
- **Prospective Client PII & Legal Narratives:** Full names, contact details, demographic data, household/income eligibility records, adverse party names (used for conflict-of-interest checks), and confidential descriptions of legal disputes.
- **Uploaded Legal & Evidentiary Documents:** Court notices, leases, contracts, identification scans, and intake attachments uploaded during or after initial submission.
- **Case Assignment & Triage Metadata:** Clinic routing tags, conflict-check determinations, assigned supervising attorneys, student attorney rosters, and case status histories.
- **Authentication & Database Credentials:** PostgreSQL connection strings (`DATABASE_URL`), session secrets, and clinic staff credentials.

---

## 3. Attack Surface Analysis & Trust Boundaries

TULIP is organized into a React frontend (`app/` on port 5173), a Node.js backend API (`api/`), and a PostgreSQL database managed via Prisma ORM (`@prisma/adapter-pg`). Crucially, TULIP bridges an **unauthenticated public intake boundary** with a **restricted legal-clinic internal boundary**.

| Entry Point / Interface | Trust Boundary Crossed | Data Crossing Boundary | Primary Attack Surface |
| :--- | :--- | :--- | :--- |
| **Public Legal Intake Portal** (`app/` intake views) | Anonymous Public Internet → Intake API | Client PII, adverse party names, dispute summaries, uploaded files | Spam/automated intake flooding, stored XSS in narrative fields, malicious file uploads |
| **Case & Document API** (`api/` REST routes + Prisma) | Intake / Clinic UI → PostgreSQL DB | Case records, conflict check flags, clinic assignments, document metadata | IDOR / enumeration of intake confirmation IDs; SQL/ORM filter injection |
| **Clinic Staff Authentication** (`api/` auth middleware) | University / Clinic Staff → Privileged Portal | Login credentials / SSO tokens, clinic membership, role permissions | Broken authentication, privilege escalation from student to admin, session hijacking |
| **Cross-Clinic Case Router** (Case-assignment workflow) | Clinic A Context → Clinic B Context | Assigned case files, conflict-of-interest lists, internal triage notes | Horizontal privilege escalation across separate law clinics (ethical wall breach) |
| **PostgreSQL & Prisma Studio** (`DATABASE_URL` / dev tools) | API Server / Localhost → Persistence Layer | Unencrypted PII, seed data (`npm run db:seed`), full case history | Unencrypted sensitive PII at rest; accidental exposure of Prisma Studio or seed data |
| **GitHub OSS Repository** (`oss-slu/TULIP` PRs & CI) | External Contributors → Main Branch | Schema definitions, API handlers, `package.json` dependencies | Unreviewed PRs introducing backdoors; vulnerable transitive npm dependencies |

### Actors & Ethical Wall Boundaries
- **Prospective Client (Unauthenticated / External):** Submits intake forms and supporting documents; must be strictly write-only after submission (unable to query or enumerate submitted intakes).
- **Intake Coordinator / Clinic Administrator:** Triages incoming submissions, runs conflict-of-interest checks, and assigns cases to specific clinics.
- **Supervising Faculty Attorney:** Views and manages all cases, documents, and student assignments within their designated clinic(s).
- **Student Attorney (Law Student):** Permitted to access only the specific cases assigned to them within their enrolled clinic—strictly isolated from other clinics to preserve ethical walls.

---

## 4. Attack Tree: Exfiltrating Confidential Client Intake Records

Because prospective client intake records represent TULIP's highest-value target, the attack tree below models how an adversary (such as an opposing party in litigation or an external data broker) could attempt to access confidential case details:

```text
GOAL: Obtain Confidential Prospective Client PII & Case Narrative
├── Path 1: Exploit Public Intake Endpoints
│   └── Enumerate sequential intake IDs via unauthenticated GET /api/intakes/:id
│       [Mitigation: Write-only submission + random UUIDs + auth-required reads]
├── Path 2: Compromise Clinic Staff Account
│   └── Inject Stored XSS into "Describe your legal issue" field to steal staff session token during triage
│       [Mitigation: Output encoding + strict Content Security Policy (CSP)]
├── Path 3: Cross-Clinic Horizontal Access
│   └── Authenticate as Student Attorney in Clinic A and query case IDs belonging to Clinic B
│       [Mitigation: Mandatory clinic & assignee scoping in Prisma queries]
└── Path 4: Database / Backup Exposure
    └── Access unencrypted PostgreSQL snapshots or exposed Prisma Studio instances
        [Mitigation: Encryption at rest + network isolation + disabling Prisma Studio in prod]
```

---

## 5. Threat Catalog (STRIDE & Open-Source Analysis)

| ID | Category | Threat Description | Potential Impact | Likelihood / Impact | Affected Components & Actors |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T-01** | Information Disclosure | **Unauthenticated Intake Read / IDOR:** API routes supporting intake confirmation or case lookup expose client PII without verifying authenticated clinic staff permissions. | Severe breach of legal confidentiality; exposure of domestic, housing, or immigration status PII. | **Likelihood:** High<br>**Impact:** Critical | `api/` intake & case routes; Prospective Clients & Clinic Staff. |
| **T-02** | Tampering / XSS | **Stored XSS via Public Intake Form:** Because intake forms accept arbitrary free-text input from unauthenticated public users, unsanitized HTML/JS executes in staff browsers during triage. | Compromise of supervising attorney or administrator sessions, granting full access to all clinic cases. | **Likelihood:** Medium<br>**Impact:** Critical | `app/` intake & triage views, `api/` validation; Clinic Admins. |
| **T-03** | Elevation of Privilege | **Cross-Clinic Ethical Wall Violation:** Prisma queries filter by authenticated user status but omit clinic-ID or case-assignment checks, letting student attorneys view unrelated clinic dockets. | Violation of legal ethics rules (conflict-of-interest screening) and unauthorized disclosure across clinics. | **Likelihood:** Medium<br>**Impact:** High | `api/` case-assignment queries, Prisma schema; Student Attorneys. |
| **T-04** | Tampering / DoS | **Malicious File Upload in Document Management:** An external user uploads executable malware disguised as a PDF, or oversized files that exhaust server disk/storage capacity. | Malware delivery to clinic staff workstations when downloading evidence, or storage Denial of Service. | **Likelihood:** Medium<br>**Impact:** High | Document upload endpoints & storage layer; All Clinic Staff. |
| **T-05** | Denial of Service | **Automated Intake Spam Flooding:** Bots submit thousands of fake legal intake forms to the public portal without rate limiting or CAPTCHA/bot verification. | Database exhaustion and operational paralysis as clinic staff cannot distinguish real clients from spam. | **Likelihood:** High<br>**Impact:** Medium | Public intake endpoint, PostgreSQL DB; Intake Coordinators. |
| **T-06** | Information Disclosure | **Unencrypted PII & Seed Data Leakage:** Sensitive client fields are stored in plaintext in PostgreSQL, or synthetic PII/credentials from `npm run db:seed` are deployed to production. | Full exposure of client records if database backups are misplaced or compromised. | **Likelihood:** Medium<br>**Impact:** High | PostgreSQL database, Prisma seed scripts; All Clients. |
| **T-07** | Tampering (OSS) | **Early-Stage OSS Governance & Dependency Risk:** Unreviewed code or outdated npm dependencies introduce security regressions before security controls mature. | Introduction of vulnerable middleware or supply-chain compromise in a legal-tech repository. | **Likelihood:** Medium<br>**Impact:** Medium | `oss-slu/TULIP` GitHub repo, `package-lock.json`, CI workflows. |
| **T-08** | Repudiation | **Missing Case Assignment & Access Audit Trail:** Clinic staff view, reassign, or reject client intakes without immutable logging of who accessed sensitive records and when. | Inability to demonstrate compliance with SLU School of Law record-handling and confidentiality policies. | **Likelihood:** High<br>**Impact:** Medium | `api/` case workflow handlers, Prisma schema; Faculty & Admins. |

---

## 6. Risk Prioritization & Mitigation Strategy

Because TULIP is transitioning from paper workflows to a live digital portal for legal clinics, security hardening must focus first on locking down the public-to-private intake boundary before onboarding real clients.

| Priority Tier & IDs | Planned & Recommended Security Controls | Engineering & Usability Trade-offs | Status |
| :--- | :--- | :--- | :--- |
| **P1 — Immediate**<br>(T-01, T-02, T-03) | Make public intake submission strictly write-only (returning only an opaque non-sequential reference code with zero PII). Enforce SLU SSO authentication and clinic/case-scoped RBAC on all read/update routes. Sanitize and validate all intake inputs with strict schemas and HTTP-only, Secure session cookies plus Content Security Policy (CSP) headers. | Prospective clients cannot log back in to edit a submitted intake form directly; follow-up corrections must be handled by clinic intake staff during phone/in-person screening. | Planned |
| **P2 — Near-Term**<br>(T-04, T-05, T-06) | Restrict document uploads to allowlisted MIME types (`application/pdf`, `image/jpeg`, `image/png`) verified by magic bytes, cap file sizes (e.g., 15 MB), serve downloads with `Content-Disposition: attachment`, add IP rate limiting and bot protection on intake submission, and enable TLS + disk/column encryption for PII. | Clients with unusual file formats (e.g., proprietary email archives) may need staff assistance to convert documents to PDF; strict rate limits on shared public library Wi-Fi require thoughtful thresholds. | Planned |
| **P3 — Long-Term**<br>(T-07, T-08) | Implement an immutable `CaseAuditLog` table recording read/write/assignment events for legal compliance, configure GitHub branch protection requiring maintainer review + automated security linting/dependency checks, and document a clear production deployment checklist excluding `db:seed` and Prisma Studio. | Increases database write volume on read-heavy case review views and requires disciplined PR reviews for student developers. | Backlog |

---

## 7. Open Questions for Clinic Stakeholders & OSS-Cybersecurity

1. **Conflict-of-Interest Check Visibility:** Before assigning a case to a specific clinic, intake coordinators must screen adverse party names across all clinics. How can conflict checks query adverse party names globally without exposing full confidential case narratives across clinic ethical walls?
2. **Document Storage Architecture:** Will uploaded legal documents be stored in an encrypted S3-compatible object store (such as SLU-approved cloud storage) rather than local container disks or PostgreSQL `bytea` columns?
3. **Data Retention for Declined Intakes:** When a prospective client's intake is declined (no representation formed), what is the SLU School of Law Clinic Program's retention and secure deletion schedule for their submitted PII?
4. **Authentication Provider Alignment:** Will TULIP integrate directly with SLU Okta SSO for faculty, staff, and student attorneys, and how will student attorney access automatically expire at the end of each academic semester?

---

## Changelog
- **Initial Assessment:** Created comprehensive Attack Tree, STRIDE, and PASTA threat model covering `app/`, `api/`, legal intake boundaries, cross-clinic ethical walls, and PostgreSQL storage.
