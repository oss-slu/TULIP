# TULIP Project Strategy

## **29 August 2026**

# **OVERVIEW**

The Saint Louis University School of Law (SOL) Legal Clinics Program (the Clinic Program) proposes an interdisciplinary collaboration with the Saint Louis University School of Science and Engineering (SSE) to design, build, and implement a prototype system for modernized client intake to be used in the Clinic Program. 

This partnership will replace the current fragmented, paper-heavy intake process with a secure, standardized digital solution that improves efficiency, consistency, and client experience across all clinics at the school of law.

This project offers a unique opportunity to combine legal expertise with engineering innovation. Law faculty, clinical staff, law students, engineering faculty, and engineering students will jointly plan and execute the project with the primary goal of gaining real-world, cross-disciplinary experience.

# **GOALS**

1. Develop standardized digital intake forms with required-field enforcement, case-type selection, and conflict-check data collection.  
2. Create a centralized intake portal or shared submission point that routes inquiries to the appropriate clinic unit.  
3. Build a pre-appointment intake review workflow that enables staff to verify completeness and flag issues before client meetings.  
4. Establish a digital intake checklist to guide staff through consistent onboarding steps: conflict check, form review, document collection, client ID verification, and case management entry.  
5. Ensure all data handling complies with applicable attorney/client confidentiality obligations, FERPA, and data security best practices.  
6. Provide training materials and documentation for law students, engineering students, faculty, and staff.  
7. Maintain an approach that considers ethical matters in types of questions asked and data compilation models throughout the design and building process.

# **SPECIFICATIONS**

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

# **MILESTONES**

## **Iteration 1 (1st Quarter Fall Semester)**

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

## **Iteration 2 (2nd Quarter Fall Semester)**

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