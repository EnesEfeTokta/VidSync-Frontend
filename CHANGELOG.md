# CHANGELOG

All notable changes to this project will be documented in this file.

## [Sprint 1] - 2025-09

### Added
- Implemented user login and registration UI.
- Set up basic page routing with React Router.
- Designed Home, Login, and Register pages.
- Integrated Axios for API communication.
- Added basic form validation.

### Changed
- Configured project to use TypeScript.
- Updated default theme colors.

### Fixed
- Fixed input focus issue in forms.

## [Sprint 2] - 2025-09

### What's New
- Room creation has been added.
- SignalR has been integrated for real-time communication.
- A user presence monitoring feature has been implemented in rooms.
- Added participant list viewing feature.
- Set environment variables for API and SignalR URLs.
- Added error handling for API requests and SignalR connections.
- Implemented user join/leave notifications.

### Changes
- Reorganized the API service to use the Axios example with interceptors.

### Fixed
- Issues related to SignalR connection interruptions have been resolved.
- Errors in participant list updates have been fixed.

## [Sprint 3] - 2025-10

### What's New
- Implemented video/audio calling feature using WebRTC.
- Added screen sharing capabilities.
- Integrated AI-powered meeting summarization.
- Enhanced user presence indicators in rooms.
- Improved error handling and user feedback mechanisms.

### Changes
- Refactored room management logic for better scalability.
- Updated UI components for a more modern look and feel.

### Fixed
- Resolved issues with video/audio quality during calls.
- Fixed bugs related to room expiration handling.

## [Sprint 4] - 2025-10

Goal: Create a modern, informative, and professional “showcase” (marketing site) for VidSync so that users are greeted with a rich homepage explaining the product, features and benefits instead of a direct login screen; implement Light/Dark mode across the site to improve first impressions and UX.

### What's New
- Public marketing site / showcase
  - Added a new public Homepage (marketing) that replaces the previous direct-login landing: hero section, features overview, benefits, use-cases, and a prominent "Get started" CTA.
  - Added feature detail pages (e.g., Video Calls, Screen Sharing, Recording, Scheduling) with screenshots and short explainer text.
  - Implemented sections for testimonials, FAQ, and a developer/integration overview.
- Light / Dark mode
  - Implemented global Light/Dark theme switch with persisted user preference (localStorage).
  - Updated UI components and CSS variables to fully support both themes.
- Improved onboarding & routing
  - Introduced public route layout (marketing) and separated authenticated app routes (app/dashboard/rooms).
  - Redesigned initial onboarding flow: informative welcome screens and clear "Create room" and "Try demo" CTAs.
- SEO & Social
  - Added meta tags, Open Graph tags and dynamic page titles for better discoverability and sharing.
  - Added structured data (JSON-LD) for the main marketing pages.
- Analytics & tracking
  - Added basic analytics hooks to capture page views and CTA conversions (pluggable, privacy-conscious by default).
- Accessibility & responsiveness
  - Improved keyboard navigation, focus management and aria attributes for the new pages.
  - Ensured responsive layout and mobile-first behavior for the marketing site.

### Changed
- Routing: refactored routing structure to support public marketing pages + authenticated app routes.
- UI/Layout: created reusable Layout and Hero components; moved shared header/footer into public layout.
- Styling: migrated key theme values to CSS variables; consolidated global styles and theme tokens.
- Auth flow: moved login/register behind the marketing flow; added contextual CTAs to guide signups.

### Fixed
- Fixed issues where the app previously showed login immediately on first load.
- Resolved color contrast problems introduced by previous theme changes.
- Fixed several visual glitches on small screens for the old home/login screens.

## [Sprint 5] - 2025-11

### What's New
- Transcription & subtitles
  - Implemented real-time and post-call speech-to-text transcription for meetings.
  - Added subtitle overlays for live calls and subtitle tracks for recorded sessions.
  - Provided language detection options and basic punctuation/formatting improvements.
  - Added UI for editing and exporting transcripts (SRT/Plain text).
- Tasks & reminders
  - Created task interface for meeting actions and to-dos linked to specific meetings or messages.
  - Added reminder UI with scheduling, snooze and repeat options.
  - Integrated task/reminder notifications into the participant UI and notification center.
- Messaging improvements
  - Redesigned messaging section UI for better readability and conversation flow.
  - Added message threading, quick-reply actions, and improved attachment previews.
  - Implemented optimistic message send, improved delivery status indicators and message edit/delete flows.
- Recording & playback (frontend)
  - Added meeting recording controls (start/stop/preview) in the UI and a recording indicator for participants.
  - Implemented client-side recording capture and upload flow, with status toasts and success/failure handling.
  - Built a playback page/component with play/pause, seek, thumbnails, and download options for recordings.
  - Display recording metadata (duration, participants, created at).
- Meeting scheduling & calendar integration
  - Added scheduling UI for creating meetings with date/time picker and optional recurrence.
  - Implemented ICS export and Google Calendar deep-link generation for scheduled meetings.
  - Added scheduled meetings list and reminder UI.

### Changed
- Recording & transcription pipeline
  - Refactored recording logic to offload heavy encoding and transcription tasks to Web Workers and background jobs where applicable.
  - Centralized upload and transcript publishing logic in the API service.
- State & API
  - Added Redux slices and selectors for recordings, transcripts, tasks, reminders and improved messaging state.
  - Created thunks and API endpoints handling for transcription jobs, transcript fetch, task CRUD and reminder scheduling.
- UI/UX
  - Updated player, messaging and task components to match the new marketing site theming and accessibility standards.
  - Improved responsiveness and mobile behavior for messaging, transcription, and task flows.

### Fixed
- Fixed edge cases that led to partial/corrupted recordings in low-bandwidth or reconnection scenarios.
- Resolved audio/video desync in playback and incorrect timestamp displays.
- Fixed transcription accuracy regressions and subtitle sync issues.
- Fixed UI bugs in the scheduling flow, task reminders and the messaging interface.
- Addressed notification and permission edge-cases for reminders and task assignments.