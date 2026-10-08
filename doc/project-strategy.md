# TULIP Project Strategy

## **8 October 2026**

# **Summary**

The Saint Louis University School of Law (SOL) Legal Clinics Program (the Clinic Program) proposes an interdisciplinary collaboration with the Saint Louis University School of Science and Engineering (SSE) to design, build, and implement a prototype system for modernized client intake to be used in the Clinic Program. 

This partnership will replace the current fragmented, paper-heavy intake process with a secure, standardized digital solution that improves efficiency, consistency, and client experience across all clinics at the school of law.

This project offers a unique opportunity to combine legal expertise with engineering innovation. Law faculty, clinical staff, law students, engineering faculty, and engineering students will jointly plan and execute the project with the primary goal of gaining real-world, cross-disciplinary experience.

# **Product Vision**

## Vision Statement and Mission
Design and implement a secure, user-friendly digital client intake system that standardizes the intake process across all SOL clinics, reduces administrative overhead, and improves data accuracy and accessibility.

## Success Criteria
1. Develop standardized digital intake forms with required-field enforcement, case-type selection, and conflict-check data collection.  
2. Create a centralized intake portal or shared submission point that routes inquiries to the appropriate clinic unit.  
3. Build a pre-appointment intake review workflow that enables staff to verify completeness and flag issues before client meetings.  
4. Establish a digital intake checklist to guide staff through consistent onboarding steps: conflict check, form review, document collection, client ID verification, and case management entry.  
5. Ensure all data handling complies with applicable attorney/client confidentiality obligations, FERPA, and data security best practices.  
6. Provide training materials and documentation for law students, engineering students, faculty, and staff.  
7. Maintain an approach that considers ethical matters in types of questions asked and data compilation models throughout the design and building process.

# **User Research and Needs**

## Target Users
- Legal clinic providers
- Administrators
- Professors
- Clients

## Pain Points
- Current paper-based intake workflow
- Client privacy and confidentiality

# **Market and Competitive Analysis (via MS Copilot)**
The proposed product competes in the legal intake and case management space but is differentiated by its focus on university law clinics and clinical legal education.

## Key Competitors
### LegalServer (Market Leader)
A mature legal aid case management platform offering intake, conflict checking, workflow automation, reporting, document management, and compliance features. It serves over 550 legal aid and public-sector organizations and is the most direct feature competitor.

#### Strengths
- Comprehensive intake and case management
- Advanced reporting and compliance tools
- Established market presence

#### Weaknesses
- High implementation and licensing costs
- Designed for legal aid organizations, not educational clinics

### Justiceserver
A Salesforce-based platform serving nonprofit legal service providers with centralized intake, eligibility screening, referrals, dashboards, and case management.

#### Strengths
- Modern architecture
- Highly configurable workflows
- Strong nonprofit legal services focus

#### Weaknesses
- Complex administration
- Requires Salesforce expertise
- May be overly complex for law school clinics

### Clio Grow

A law firm intake and CRM platform focused on lead management, intake forms, scheduling, conflict checks, and client onboarding.

#### Strengths
- Excellent user experience
- Modern intake workflows
- Easy deployment

#### Weaknesses
- Built for private law firms
- Limited support for clinic supervision and educational workflows

## Strategic Positioning
Rather than competing directly as another intake or case management system, the product should be positioned as:

> A clinical legal education platform built specifically for university law clinics.

Key differentiators include:
- Student practitioner workflows
- Faculty review and supervision
- Multi-clinic case routing
- Academic and compliance reporting
- Educational assessment and tracking
- Cross-disciplinary law and engineering collaboration

These capabilities are not a primary focus of current market leaders.

## SWOT Summary
### Strengths
- Designed specifically for law school clinics
- Lower-cost alternative to enterprise platforms
- Supports educational and supervisory workflows
### Weaknesses
- Significant feature gap versus mature competitors
- Ongoing security, compliance, and maintenance requirements
- Smaller ecosystem and integration footprint
### Opportunities
- Expand to other law schools and clinical programs
- Incorporate AI-assisted intake, triage, and summarization
- Serve as a platform for experiential legal education
### Threats
- Strong incumbents such as LegalServer and Justiceserver with established products and customer bases.
- Buy-versus-build decisions may favor existing commercial solutions.

## Conclusion
The strongest path to market is to focus on clinical legal education management, not general legal intake. By emphasizing student supervision, faculty oversight, and law-school-specific workflows, the product can occupy a market niche that is underserved by existing legal aid and law firm platforms.

# **Product Positioning**

## Value Proposition
TULIP is designed to be a one-stop-shop for clients, providers, and administrators of the SLU Legal Clinics Program to create, review, and assign intakes. This digitizes the current paper-based workflow, but still ensures all client data is protected.

## Key Features
1\. Standardized Digital Client Intake Form
* Required fields to prevent incomplete submissions  
* Case type selection according to clinic: CPC, MLP, Human Rights, ECD, Civil, Criminal  
* Collection of full name, email, mailing address, phone numbers (mobile/home), SSN, DOB  
* Reason for intake and legal issue description  
* Basic legal history (prior attorneys, prior case types)  
* Conflict-check data fields for all relevant parties  
* Consent and confidentiality acknowledgment with digital signature capture

2\. Centralized Intake Portal
* Single submission endpoint for all clinic units  
* Automated routing based on case type selection  
* Intake queue visible to authorized staff  
* Status tracking: received, under review, assigned, or awaiting information

3\. Pre-Appointment Review Workflow
* Automated notifications to staff when a new intake is submitted  
* Checklist interface for staff to confirm form completeness, conflict check, document receipt, client ID verification, case management entry  
* Flag and comment functionality for incomplete or problematic submissions

4\. Security & Compliance
* Encrypted data transmission and storage  
* Role-based access controls for faculty, staff, and students  
* Compliance review against applicable state bar rules on client data, FERPA, and institutional data governance policies  
* Audit log for all intake record access and modifications

# **Product Roadmap**

## Iteration 1 (1st Quarter Fall Semester)
* Description  
  * Create wireframes for most, if not all, pages required to complete MVP  
  * Have basic UI and logic implemented  
* Success criteria  
  * 3 wireframes: landing page, profile page, intake form page  
  * 3 interface pages: landing, profile, intake form  
* Key deliverables  
  * Merged PRs:  
    * One for each wireframe (as documentation): Figma, Canva, or hand-drawn  
    * One for each page UI: intake form, profile, header, landing page  
    * One for each new route: landing page \-\> profile page; landing page \-\> intake form; profile page \-\> intake form page

## Iteration 2 (2nd Quarter Fall Semester)

* Description
  * Complete backend for Client View  
  * Implement frontend for Staff/Admin View  
* Success criteria  
  * Connect intake form data to database and encrypt data in motion and at rest  
  * Create wireframes and implement pages for MVP Staff/Admin View  
    * Account/profile  
    * Specified clinic submission queue  
      * Tracks submission progress (New \-\> Under Review \-\> Assigned \-\> Awaiting Information)  
    * Submission-specific page  
      * Checklist staff review workflow  
      * Conflict check on submission  
* Key deliverables  
  * Merged PR: intake form backend implementation; account information stored  
  * Merged PRs:  
    * One PR (as documentation) for each Staff/Admin page wireframe: Figma, Canva, or hand-drawn  
    * One PR for each Staff/Admin page UI: profile, queue, submission

## Iteration 3 (1st Quarter Spring Semester)

* Description
 * Build the operational workflows needed for law clinic staff to manage intake submissions from receipt through assignment. This milestone focuses on transforming TULIP from primarily an intake collection system into a complete intake management platform by implementing staff review tools, case routing, assignment workflows, permissions, and intake status tracking.
 * The goal is to deliver an end-to-end process where a client submits an intake form, clinic staff review the submission, perform intake checks, assign the matter, and track progress through a centralized dashboard. This directly advances the project's goals of standardization, reduced administrative burden, and improved intake consistency across clinics.
* Success Criteria
 * Staff can review submitted intake requests from a centralized queue.
 * Intake records move through defined statuses (Received, Under Review, Awaiting Information, Assigned).
 * Clinic administrators can assign cases to specific clinics or personnel.
 * Intake reviewers can complete a standardized review checklist before assignment.
 * Role-based permissions restrict access based on user responsibilities.
 * All intake actions are logged and traceable.
 * A complete demonstration can be performed showing intake submission through case assignment without manual paper-based steps.
* Key Deliverables
 * Intake Review Dashboard
  * Centralized queue of submitted intake requests
  * Filtering and search capabilities
  * Intake detail view for staff review
  * Status indicators and priority visibility
 * Intake Status Workflow
  * Received
  * Under Review
  * Awaiting Information
  * Assigned
  * Closed/Rejected
  * Status changes recorded automatically
  * Timestamp tracking for workflow analytics
 * Staff Review Checklist
  * Implementation of the proposal's pre-appointment review workflow:
   * Conflict-check completion checkbox
   * Form completeness verification
   * Document receipt confirmation
   * Client identification verification
   * Internal notes/comments
 * Clinic Routing & Assignment
  * Assign intake records to specific clinics
  * Reassign functionality
  * Assignment history
  * Notification generation for assigned staff
 * Role-Based Access Control
  * Administrator role
  * Clinic staff role
  * Student reviewer role
  * Restricted access to sensitive client information
 * Audit Logging & Administrative Reporting
  * Record access history
  * Status-change history
  * Assignment history
  * Basic dashboard metrics for intake volume and processing times

# **Technical Approach**

## Architecture
- Frontend: React (JSX, NodeJS)
- Backend: JavaScript
- Database: PostgreSQL
- Containerization: TBD
- Deployment: TBD

## Constraints
- Resource constraints
 - Limited developers on team
 - Team schedules
 - Access to technical resources
- Domain knowledge
 - Computer Science students may not know the workflows and rules a legal clinic follows

## Risks
- Sensitive information handling
 - Students often make mistakes as they learn software development, so encrypting and protecting Personally-Identifying Information (PII) can be risky to allow students to implement
