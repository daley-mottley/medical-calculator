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

## 2024-06-09
- Added calculator categories to the side menu in the Sidebar/NavLinks component.
- Created feature branch 'feature/sidebar-calculator-categories' for this update.
- Updated project plan files as per instructions.
