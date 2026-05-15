# SHE SAID SAIL
MIAMI · FORT LAUDERDALE

# OPERATIONAL MEMORY LAYER
Complete Implementation Specification

Lessons Table · Approval Queue · AI Learning Rules · Institutional Intelligence Framework

STATUS: LOCKED  
VERSION: v1.0  
ENVIRONMENT: PRODUCTION  
OWNER: WILL HUNT  
SOURCE OF TRUTH: YES  
AMENDMENT REQUIRED FOR MODIFICATION: YES  

CONFIDENTIAL · INTERNAL USE ONLY · MAY 2026

---

# PURPOSE

This document defines the permanent institutional intelligence architecture for She Said Sail and Mare Executive.

This system governs:
- operational learning
- founder intelligence capture
- AI memory architecture
- approval workflows
- operational pattern recognition
- autonomous decision thresholds
- institutional knowledge retention

This document is authoritative.

No modifications permitted without governed amendment approval.

---

# CORE ARCHITECTURE

Airtable = operational brain + memory  
Claude = intelligence layer  
Make = execution layer  
Dashboard = founder command center  
GitHub = governance + permanence layer

| LAYER | TOOL | ROLE |
|---|---|---|
| Governance Layer | GitHub | Permanent operational governance |
| Operational Brain + Memory | Airtable | Single source of truth |
| Intelligence Layer | Claude | Pattern recognition + recommendations |
| Execution Layer | Make | Automation orchestration |
| Founder Command Center | Airtable Interfaces | Mobile approvals + oversight |

---

# ENVIRONMENT GOVERNANCE

All memory records require environment separation.

Approved environments:
- Production
- Sandbox
- Development

Rules:
- Sandbox lessons may NEVER enter AI Active Context
- Production-only records eligible for AI weighting
- Sandbox approvals excluded from autonomy learning
- Development records excluded from founder intelligence
- Environment field mandatory on all intelligence records

---

# IMMUTABLE GOVERNANCE RULES

1. No deletion of Lessons records
2. No deletion of Approval Queue records
3. Founder Decision Notes are immutable once approved
4. AI may not self-promote lessons to Active
5. AI may not archive lessons
6. AI may not alter founder guidance
7. All modifications require audit logging
8. All production changes require rollback capability
9. No unapproved lessons enter AI context
10. Institutional memory is permanent infrastructure

---

# UUID GOVERNANCE

Every record requires immutable identifiers.

## Lessons Required Fields

| FIELD | PURPOSE |
|---|---|
| Lesson UUID | Immutable global identifier |
| Lesson ID | Human-readable ID |
| Created At | Immutable timestamp |
| Updated At | Last modification |
| Created By | Actor tracking |
| Environment | Production/Sandbox/Dev |

## Approval Queue Required Fields

| FIELD | PURPOSE |
|---|---|
| Approval UUID | Immutable identifier |
| Approval ID | Human-readable ID |
| Created At | Immutable timestamp |
| Updated At | Last modification |
| Environment | Production/Sandbox/Dev |

UUIDs may NEVER:
- be regenerated
- be reassigned
- be manually edited
- be reused after archival

---

# PERMISSION GOVERNANCE

## ROLE PERMISSIONS

| ROLE | AUTHORITY |
|---|---|
| Founder | Full authority |
| Operations Lead | Operational management |
| Concierge | Record creation only |
| AI System | Read + recommendation only |
| Finance | Financial visibility only |
| Read-Only | No modification authority |

---

# AI PERMISSION BOUNDARIES

AI systems MAY:
- recommend actions
- identify patterns
- summarize lessons
- generate operational insights
- suggest optimizations

AI systems MAY NOT:
- approve financial actions
- archive lessons
- modify founder guidance
- alter statuses autonomously
- create governance rules
- self-authorize deployments
- bypass approval queues
- redefine company standards

Founder judgment remains the final authority.

---

# AUDIT LOG GOVERNANCE

All operational intelligence activity must generate immutable audit records.

## Required Audit Events

- lesson creation
- lesson modification
- approval decision
- denial decision
- modified approval
- AI recommendation
- autonomy threshold activation
- archival event
- rollback event

## Audit Record Requirements

| FIELD | PURPOSE |
|---|---|
| Audit UUID | Immutable identifier |
| Actor | Human or AI actor |
| Timestamp | Immutable event time |
| Action Type | What occurred |
| Before State | Previous value |
| After State | New value |
| Reason | Why change occurred |
| Rollback Reference | Reversal linkage |

Audit logs are permanent.

No deletion permitted.

---

# LESSONS TABLE · COMPLETE SPECIFICATION

Table Name:
Lessons

Purpose:
Permanent institutional intelligence database.

Every operational insight becomes:
- structured
- searchable
- AI-readable
- founder-approved
- permanently retained

---

# REQUIRED LESSONS FIELDS

| FIELD NAME | TYPE | REQUIRED |
|---|---|---|
| Lesson UUID | UUID | YES |
| Lesson ID | Formula | YES |
| Lesson Title | Single Line | YES |
| Date | Date | YES |
| Category | Single Select | YES |
| Severity | Single Select | YES |
| Status | Single Select | YES |
| Repeatable? | Checkbox | YES |
| Situation | Long Text | YES |
| Problem | Long Text | YES |
| What Happened | Long Text | YES |
| What Was Changed | Long Text | NO |
| Outcome Before | Single Select | YES |
| Outcome After | Single Select | NO |
| Why It Worked | Long Text | NO |
| Why It Failed | Long Text | NO |
| Suggested Future Action | Long Text | YES |
| AI Prompt Tag | Single Line | YES |
| Emotional Signal | Single Select | NO |
| Founder Insight | Long Text | NO |
| AI Insight | Long Text | NO |
| Decision Note | Long Text | NO |
| Will Approved | Checkbox | YES |
| Reviewed At | Date | NO |
| Environment | Single Select | YES |
| Created At | DateTime | YES |
| Updated At | DateTime | YES |
| Created By | Collaborator | YES |

---

# LESSON STATUS VALUES

Approved values only:

- Active
- Pending Review
- Applied
- Tested
- Archived

No freeform statuses permitted.

---

# CATEGORY VALUES

- Sales
- Hospitality
- Operations
- Broker
- Creator
- Advertising
- Pricing
- Client Behavior
- Relationship
- Expansion
- AI System
- Financial
- Brand
- Vendor

---

# SEVERITY VALUES

- Critical
- High
- Medium
- Low

Critical lessons receive highest AI weighting.

---

# REQUIRED VIEWS

## Do This Friday
Weekly founder review queue.

## AI Active Context
Approved active lessons only.

## Pending Will Review
Approval queue for founder review.

## Intelligence Library
Searchable institutional memory.

## Repeatable Wins
High-confidence operational patterns.

## Failure Library
Negative outcome intelligence.

---

# APPROVAL QUEUE · COMPLETE SPECIFICATION

Table Name:
Approval Queue

Purpose:
Centralized founder decision architecture.

No approvals occur through:
- Slack
- text
- DMs
- email

All decisions centralized here.

---

# REQUIRED APPROVAL FIELDS

| FIELD NAME | TYPE | REQUIRED |
|---|---|---|
| Approval UUID | UUID | YES |
| Approval ID | Formula | YES |
| Request Title | Single Line | YES |
| Submitted By | Single Select | YES |
| Request Type | Single Select | YES |
| Urgency | Single Select | YES |
| Submitted At | DateTime | YES |
| Context | Long Text | YES |
| Proposed Action | Long Text | YES |
| Financial Impact | Currency | NO |
| Decision | Single Select | YES |
| Decision Note | Long Text | NO |
| Approved Modification | Long Text | NO |
| Decided At | DateTime | NO |
| Environment | Single Select | YES |
| Auto-Apply | Checkbox | NO |

---

# AUTONOMY THRESHOLD GOVERNANCE

Autonomy thresholds require:
- founder-approved history
- zero contradictory decisions
- stable operational pattern
- audit visibility

AI may recommend autonomy eligibility.

AI may not activate autonomy itself.

Founder approval mandatory.

---

# AI LEARNING PROTOCOL

For every recommendation:

1. Identify relevant category
2. Query approved active lessons
3. Match AI Prompt Tags
4. Weight by severity
5. Weight by recency
6. Read Decision Notes first
7. Apply founder intelligence
8. Generate response

---

# AI WEIGHTING RULES

| SIGNAL | AI RESPONSE |
|---|---|
| Approved + Repeatable + Improved | Prioritize |
| Worsened Outcome | Avoid |
| Founder Decision Note | Highest priority |
| Modified Approval | Adopt modification |
| Denied Approval | Treat as boundary |
| Critical Severity | Triple weighting |

---

# BRAND CONTEXT ISOLATION

Institutional memory must remain context-aware.

Rules:
- SSS lessons do not automatically apply to Mare Executive
- Bachelorette intelligence isolated from corporate intelligence
- Expansion lessons separated by city
- Financial lessons separated by entity
- Package-specific intelligence isolated appropriately

Cross-context contamination prohibited.

---

# INCIDENT RESPONSE GOVERNANCE

## Severity Levels

| LEVEL | DESCRIPTION |
|---|---|
| SEV-1 | Financial or operational integrity risk |
| SEV-2 | Automation failure |
| SEV-3 | Reporting inconsistency |
| SEV-4 | Minor operational issue |

---

# SEV-1 EVENTS

Examples:
- incorrect autonomy trigger
- AI decision loop
- duplicate payout
- corrupted lessons
- unauthorized lesson activation

Required Response:
- automation freeze
- founder notification
- audit review
- rollback evaluation
- postmortem creation

---

# DATA RETENTION POLICY

| DATA TYPE | RETENTION |
|---|---|
| Lessons | Permanent |
| Approval Queue | Permanent |
| Audit Logs | Permanent |
| Archived Lessons | Permanent |
| Sandbox Records | Quarterly purge |

Deletion prohibited.

Soft archive only.

---

# OPERATIONAL DECAY PREVENTION

Quarterly governance review mandatory.

Review includes:
- stale lesson archival
- contradictory intelligence cleanup
- autonomy recalibration
- founder standard review
- AI weighting review
- category restructuring review

Without governance review:
institutional intelligence quality decays over time.

---

# THURSDAY DIGEST AUTOMATION

Every Thursday at 5pm:
Make generates:
- weekly lessons summary
- pending approvals
- operational patterns
- high-severity lessons
- autonomy threshold candidates
- AI-generated observations

Sent to:
- founder
- operations lead

---

# MOBILE OPERATION RULES

Founder must be able to:
- approve decisions
- deny requests
- review lessons
- add Decision Notes
- review operational health

from mobile in under:
- 5 minutes daily
- 30 minutes weekly

This is mandatory design architecture.

---

# FOUNDER DECISION MEMORY

Decision Notes are the highest-value intelligence field in the system.

Decision Notes define:
- taste
- standards
- risk tolerance
- emotional calibration
- company philosophy
- operational boundaries

AI treats Decision Notes as:
direct operational instruction.

---

# INSTITUTIONAL INTELLIGENCE MOAT

This system compounds weekly.

Every:
- lesson
- approval
- denial
- modification
- Decision Note
- founder review

increases institutional intelligence.

This intelligence:
- cannot be purchased
- cannot be scraped
- cannot be replicated quickly
- compounds permanently

The moat is operational memory.

---

# FINAL DIRECTIVE

The Operational Memory Layer is permanent operational infrastructure.

This system exists to:
- preserve founder intelligence
- compound operational learning
- increase AI quality
- reduce repetitive decisions
- create institutional memory
- scale operational consistency

This architecture is mandatory across:
- She Said Sail
- Mare Executive
- future entities
- future cities
- future operational systems

All future intelligence systems must conform to this governance layer.

---

SHE SAID SAIL · OPERATIONAL MEMORY LAYER  
CONFIDENTIAL · INTERNAL USE ONLY
