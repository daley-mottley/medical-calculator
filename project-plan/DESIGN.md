# MedicMindAssist Design Document

## Color Palette

### Primary Colors
- Primary Purple: `#9b87f5` - Used for primary actions and key UI elements
- Secondary Purple: `#7E69AB` - Used for secondary actions and supporting elements
- Tertiary Purple: `#6E59A5` - Used for tertiary actions and subtle accents

### Accent Colors
- Vivid Purple: `#8B5CF6` - Used for highlighting important information
- Soft Purple: `#E5DEFF` - Used for backgrounds and subtle UI elements
- Light Gray: `#F1F0FB` - Used for alternative backgrounds

### Functional Colors
- Alert Red: `#ea384c` - Used for warnings and critical alerts
- Success Green: `#10B981` - Used for success messages
- Info Blue: `#3B82F6` - Used for informational messages

## Typography

- **Primary Font**: Inter - A clean, modern sans-serif font that is highly readable on screens
- **Heading Font**: Inter with increased weight (600-700)
- **Body Font**: Inter with regular weight (400)
- **Medical Data**: Inter with medium weight (500) for better readability of critical information

## UI Components

### Cards
- Rounded corners (12px radius)
- Subtle shadows
- Clean white backgrounds with colored accents

### Buttons
- Primary buttons: Filled with primary purple
- Secondary buttons: Outlined with secondary purple
- Tertiary buttons: Text only with tertiary purple

### Navigation
- Bottom tab bar for primary navigation
- Side drawer for additional features
- Clear iconography with labels
- **Update 2024-06-09:** Sidebar now visually groups calculators by category, matching the main calculator page for consistency and usability.

### Saved Calculations Page (2024-06-13)
- Uses visually enhanced cards for each saved calculation
- Calculator type shown as a badge and icon
- Inputs and results are clearly formatted
- Quick action buttons (view, delete) for each calculation
- Improved empty state with icon and navigation button
- Follows color palette and design principles for clarity and professionalism
- **2024-06-18 Update:** Saved Calculations card redesigned for modern appeal: large icon in colored circle, bold calculation name, clear badge, subtle timestamp, visually separated inputs/results, improved quick action buttons, more whitespace, and a modern card appearance with shadow and rounded corners.

## Profile Page Redesign (2024-06-13)
- The Settings and Theme section has been removed from the profile page.
- A profile image is now displayed at the top of the profile card, using the Avatar component.
- Users can upload or change their profile image by clicking the 'Change Profile Image' button, which opens a file picker. The selected image is displayed immediately and persisted in localStorage.
- The username is now editable inline. Clicking 'Edit' next to the name field allows the user to change their name, with 'Save' and 'Cancel' options. The new name is saved to localStorage and reflected throughout the app.

### User Flow
1. User navigates to the profile page.
2. User sees their profile image (or initials if no image) at the top, with a button to change it.
3. User can click 'Edit' next to their name to update it, then save or cancel changes.
4. All changes are persisted locally and reflected immediately in the UI.

## Design Principles

1. **Clarity**: All information must be immediately understandable to busy medical professionals
2. **Efficiency**: Minimize taps needed to access critical information
3. **Reliability**: Consistent UI patterns throughout the application
4. **Professionalism**: Design aesthetic appropriate for clinical settings

## User Flow Diagrams

Main user flows will be added as the application development progresses.

## Mockups

Wireframes and high-fidelity mockups will be included as they are developed.

---

## Suggestion Box Widget
- A floating button on the bottom right of the app, styled with the primary purple (#9b87f5).
- Opens a modal for users to submit suggestions.
- Submissions are sent to the admin email (daley.mottley@hotmail.com).
- Should match the app's modern, professional medical UI.
- The widget icon should use a ballot box or vote icon (not a chat bubble) to clearly represent suggestions/feedback.
