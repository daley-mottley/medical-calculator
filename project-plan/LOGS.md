# Development Logs

## 2025-05-13
### Initial Setup
- **Issue**: Project initialization with appropriate medical theming
- **Resolution**: Created custom color palette with purple tones that appeal to medical professionals

### Navigation Structure
- **Issue**: Determining the most efficient navigation pattern for doctors' quick access needs
- **Resolution**: Implemented bottom tab navigation for primary functions with side drawer for additional features

## Error Tracking
This section will track errors encountered during development.

### Template:
```
## YYYY-MM-DD
### Error Description
- **Issue**: Description of the error
- **Cause**: What caused the error
- **Resolution**: How it was fixed
```

## 2025-05-14
### Implemented BMI Calculator
- **Issue**: Integrate a functional BMI calculator into the application.
- **Resolution**: Created a new `BMICalculator` component and integrated it into the `Calculators` page, allowing users to calculate BMI.

### Implemented Ideal Body Weight Calculator
- **Issue**: Integrate a functional Ideal Body Weight calculator into the application.
- **Resolution**: Created a new `IdealBodyWeightCalculator` component and integrated it into the `Calculators` page, allowing users to calculate Ideal Body Weight.

### Started Patient Note Templates System
- **Issue**: Begin implementation of the patient note templates system.
- **Resolution**: Created a new branch `feature/patient-note-templates` and started planning the component structure.

## 2025-05-15
### Started Authentication Feature
- **Issue**: Begin implementation of the secure authentication feature.
- **Resolution**: Created a new branch `feature/authentication` and updated project plan files.

### Created Initial Authentication Components
- **Issue**: Create placeholder components for authentication.
- **Resolution**: Created `Login.tsx`, `Registration.tsx`, and `Profile.tsx` in `src/components/auth`.

### Added Placeholder Profile Content
- **Issue**: Add basic structure and placeholder content to the Profile component.
- **Resolution**: Added placeholder user information and settings sections to `Profile.tsx`.

### Integrated Authentication Components into Routing
- **Issue**: Add routes for authentication components.
- **Resolution**: Added routes for `/login`, `/register`, and `/profile` in `src/App.tsx`.

### Styled and Added Validation to Authentication Forms
- **Issue**: Improve the UI and add basic validation to the Login and Registration forms.
- **Resolution**: Updated `Login.tsx` and `Registration.tsx` to use project UI components (Card, Input, Button, Form) and implemented form validation using `react-hook-form` and `zod`.

### Styled Profile Component
- **Issue**: Improve the UI of the Profile component.
- **Resolution**: Updated `Profile.tsx` to use project UI components (Card, Input, Button) and added placeholder user information.

### Implemented Authentication Context
- **Issue**: Create a context to manage authentication state and actions.
- **Resolution**: Created `src/context/AuthContext.tsx` with placeholder login/register/logout functions and integrated it into `src/main.tsx` and the authentication components (`Login.tsx`, `Registration.tsx`, `Profile.tsx`).

### Implemented Protected Routes
- **Issue**: Restrict access to certain routes to authenticated users only.
- **Resolution**: Created a `ProtectedRoute.tsx` component and updated `src/App.tsx` to wrap the main application routes with it, redirecting unauthenticated users to the login page.

### Implemented Fake Authentication
- **Issue**: Implement fake authentication logic for testing and development.
- **Resolution**: Modified `src/context/AuthContext.tsx` to simulate login/registration/logout and persist user state in local storage.

## 2025-05-16
### Started HAS-BLED Calculator Feature
- **Issue**: Begin implementation of the HAS-BLED calculator as per project plan.
- **Resolution**: Created a new branch `feature/has-bled-calculator` and updated project plan files.

## 2025-05-17
### Started Save Calculation Feature
- **Issue**: Implement save calculation functionality so users can store and view their calculation results.
- **Resolution**: Created branch `feature/save-calculation`. Implemented save calculation logic in the BMI calculator using the mock API client and localStorage. Added user feedback for successful/failed saves.

## 2025-05-18
### Started QTc Interval Calculator Feature
- **Issue**: Implement QTc Interval Calculator as per project plan.
- **Resolution**: Created/used branch `feature/qtc-interval-calculator`. Implemented `QTcIntervalCalculator` component with Bazett and Fridericia formulas. Integrated into Calculators page UI.

### Started CHA₂DS₂-VASc Calculator Feature
- **Issue**: Implement CHA₂DS₂-VASc Calculator as per project plan.
- **Resolution**: Created branch `feature/cha2ds2-vasc-calculator`. Planning implementation and UI integration.

### Started eGFR Calculator Feature
- **Issue**: Implement eGFR Calculator as per project plan.
- **Resolution**: Created branch `feature/egfr-calculator`. Planning implementation and UI integration.

### Started Creatinine Clearance Calculator Feature
- **Issue**: Implement Creatinine Clearance Calculator as per project plan.
- **Resolution**: Using branch `feature/creatinine-clearance-calculator`. Reviewed and preparing to integrate existing component into the UI.

### Started Fractional Excretion of Sodium Calculator Feature
- **Issue**: Implement Fractional Excretion of Sodium Calculator as per project plan.
- **Resolution**: Created branch `feature/fractional-excretion-sodium-calculator`. Planning implementation and UI integration.

### Started NIH Stroke Scale Calculator Feature
- **Issue**: Implement NIH Stroke Scale Calculator as per project plan.
- **Resolution**: Created branch `feature/nih-stroke-scale-calculator`. Planning implementation and UI integration.

### Started Glasgow Coma Scale Calculator Feature
- **Issue**: Implement Glasgow Coma Scale Calculator as per project plan.
- **Resolution**: Created branch `feature/glasgow-coma-scale-calculator`. Planning implementation and UI integration.

### Started FOUR Score Calculator Feature
- **Issue**: Implement FOUR Score Calculator as per project plan.
- **Resolution**: Created branch `feature/four-score-calculator`. Planning implementation and UI integration.

### Started CURB-65 Calculator Feature
- **Issue**: Implement CURB-65 Calculator as per project plan.
- **Resolution**: Created branch `feature/curb-65-calculator`. Planning implementation and UI integration.

### Started Wells Score Calculator Feature
- **Issue**: Implement Wells Score Calculator as per project plan.
- **Resolution**: Created branch `feature/wells-score-calculator`. Planning implementation and UI integration.

### Started A-a Gradient Calculator Feature
- **Issue**: Implement A-a Gradient Calculator as per project plan.
- **Resolution**: Created branch `feature/a-a-gradient-calculator`. Planning implementation and UI integration.

### Started Suggestion Box Widget Feature
- **Issue**: Implement a suggestion box widget that allows users to send suggestions to the admin email (daley.mottley@hotmail.com).
- **Resolution**: Created branch `feature/suggestion-box-widget`. Updated project plan files (TASKS.md, LOGS.md) to reflect new feature. Planning UI and email sending logic.

### Started Suggestion Box UI Improvement Feature
- **Issue**: Improve the user interface of the Suggestion Box to be more user friendly and visually appealing, following the design system and modern UX best practices.
- **Resolution**: Created branch `feature/suggestion-box-ui-improvement`. Planning to enhance the modal layout, add better feedback, improve accessibility, and polish the floating button and form interactions.

### Improved Sidebar Animation and Accessibility
- **Issue**: Sidebar animation was not as smooth as desired and lacked accessibility features.
- **Resolution**: Enhanced sidebar with Tailwind's 'duration-300' and 'ease-in-out' for smoother sliding. Made sidebar width responsive (w-64 on mobile, w-72 on md+). Added ARIA attributes, focus management, and Escape key support for accessibility. Added test id for easier automated testing.

## 2024-06-09
- Added calculator categories to the side menu in the Sidebar/NavLinks component.
- Created feature branch 'feature/sidebar-calculator-categories' for this update.
- Updated project plan files as per instructions.

## 2024-06-10
### Started Sidebar Mobile Close-on-Navigation Feature
- **Issue**: Sidebar should close automatically on mobile when a navigation option is chosen for better UX.
- **Resolution**: Created branch `feature/sidebar-mobile-close-on-nav`. Updated Sidebar and NavLinks components to close the sidebar on navigation. Updated project plan files (TASKS.md, LOGS.md).

## 2025-06-10
### Improved Calculator Input Field Outlines
- **Issue**: Some calculator input fields did not have a visible outline, reducing user-friendliness and accessibility.
- **Resolution**: Updated the shared Input component to use a more visible border and focus state with the medical primary color, improving clarity and accessibility across all calculator forms. This change enhances the user experience for medical professionals using the calculators.

## 2025-06-11
### Started Open Calculators Modal Feature
- **Issue**: Users should be able to open any calculator in a modal overlay directly from the main calculators page for a seamless experience.
- **Resolution**: Created branch `feature/open-calculator-modal`. Integrated the Dialog component to display calculators in a modal overlay. Updated project plan files (TASKS.md, LOGS.md).

### Sidebar Label Update
- **Issue**: The sidebar label at the top was 'Menu' and did not link to the dashboard.
- **Resolution**: Changed the label to 'Dashboard' and made it a clickable link to '/calculators' (the dashboard page), as per project instructions.

## 2025-06-12
### Calculator Navigation Update
- **Issue**: 'Open Calculator' buttons opened calculators in a modal. Requirement changed to navigate to dedicated calculator pages and auto-scroll to top on navigation.
- **Resolution**: Updated all 'Open Calculator' buttons to use react-router navigation to the respective calculator page using a route segment map. Removed modal logic. Added useEffect to auto-scroll to top when navigating to a calculator page. Changes made on branch 'feature/calculator-navigation'.

### Started Suggestion Box Icon Update Feature
- **Issue**: Replace the Suggestion Box widget icon with a more appropriate icon (BallotBox or Vote) for better clarity and professionalism.
- **Resolution**: Created branch `feature/suggestion-box-icon-update`. Planning to update the icon in the SuggestionBox component and test the UI for consistency.

## 2024-06-13
### Started and Completed Real ASCVD Risk Calculator Feature
- **Issue**: The ASCVD calculator used a placeholder formula and did not provide real 10-year risk estimates.
- **Resolution**: Created branch `feature/ascvd-risk-calculator`. Implemented the real 2013 ACC/AHA Pooled Cohort Equations in the ASCVD calculator component. Updated UI to show accurate 10-year risk. Updated project plan files as per instructions.

### Started feature branch 'feature/saved-calculations-ui-improvement' to improve the Saved Calculations page UI.
- Planned improvements: more visually appealing cards, use of icons and badges, clearer display of calculation type, inputs, and results, quick action buttons (view, delete), and improved empty state with navigation.

### Removed the "Settings" and "Theme" section from the profile page.
- Added a profile image at the top of the profile page with upload/change functionality using the Avatar component.
- Made the username editable with inline editing and save/cancel options.
- Updated AuthContext to support updating username and profile image, persisting changes in localStorage.
- Updated TASKS.md to reflect this work (feature/profile-image-editable-username).

## 2025-05-19
### Completed BMI Save Calculation Functionality
- **Issue**: Ensure users can save BMI calculation results and that the save button appears below the result only after calculation.
- **Resolution**: Verified that the BMI calculator displays a 'Save Calculation' button after calculation, and saves results using the mock API client (localStorage). Added/expanded tests to confirm the button appears and save logic is triggered. Marked the task as complete in TASKS.md. Changes made on branch 'feature/bmi-save-calc-ui-test'.

## 2024-06-14
### Removed Notification Bell from Navbar
- **Issue**: The notification bell in the Navbar was not required and needed to be removed for a cleaner UI.
- **Resolution**: Removed the notification bell button and its icon import from the Navbar component. Updated project plan files. Changes made on branch 'feature/remove-notification-bell'.
