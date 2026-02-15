# AI Usage Documentation (PROMPTS.md)

This document outlines how Claude AI was used throughout the development of the Interactive Shipping Calculator challenge.

## Overview

**AI Tool Used**: Claude (Anthropic)  
**Development Approach**: Single main conversation with iterative refinement  
**AI Contribution**: ~85% initial code generation, ~15% manual refinement and polish

## Development Workflow

### Phase 1: Planning & Architecture

**Initial Prompt:**
```
[Pasted entire technical challenge PDF]

Can you generate a development plan so I can see the big picture and understand what needs to be built?
```

**Claude's Output:**
- Broke down requirements into clear phases
- Identified key technical components (form orchestration, state management, UI architecture)
- Suggested project structure and file organization
- Outlined validation strategy and error handling approach

**My Actions:**
- Reviewed the plan
- Used custom scaffolding scripts for initial Vite + React + TypeScript setup
- Created GitHub repository
- Initial commit with base configuration

---

### Phase 2: Theme & Styling Setup

**Prompt:**
```
Set up the MUI theme for Fincart's brand colors and design tokens.
```

**Claude's Output:**
- Created MUI theme configuration with assumed Fincart branding
- Set up color palette, typography, and component defaults
- Configured responsive breakpoints

---

### Phase 3: Core Components

**Prompt:**
```
Create the core components mentioned in the project structure:
- TypeScript types and interfaces
- Zod validation schemas
- Utility functions
- Custom hooks (courier ranking)
- Context for state management
```

**Claude's Output:**
- Complete type definitions (`types/index.ts`)
- Zod schemas with validation rules (`utils/validation-schemas.ts`)
- Volumetric weight calculation utility
- `useCourierRanking` hook for identifying cheapest/fastest options
- `QuoteContext` with form state and search logic

**My Modifications:**
- Minor adjustments to validation error messages
- Fixed hooks usage bugs

---

### Phase 4: Component Implementation

**Prompt:**
```
Now build all the UI components:
- Multi-step form components (LocationStep, PackageStep)
- CourierCard with badges for cheapest/fastest
- QuotesGrid with loading and error states
- ShipmentSummary sidebar
- Main ShippingCalculator page that wires everything together
```

**Claude's Output:**
- Complete component implementations with MUI
- Form steps with React Hook Form integration
- Skeleton loaders and empty states
- Error boundaries and fallback UI
- Responsive grid layouts

**My Modifications:**
- Adjusted component spacing and visual hierarchy
- Modified some conditional rendering logic

---

### Phase 5: API Layer & Error Handling

**Prompt:**
```
Implement the API layer with:
- Mock courier API functions
- Retry logic with exponential backoff
- Graceful degradation using Promise.allSettled
- Different failure rates for testing (DHL should fail often)
```

**Claude's Output:**
- Complete API service with simulated delays
- Retry wrapper with exponential backoff
- `fetchAllQuotes` with partial failure support
- Mock data generator

**My Modifications:**
- Adjusted failure rates (set DHL to 90% for demo)
- Tuned retry timeout values

---

### Phase 6: Review, Polish & Iteration

**Process:**
After the initial implementation, I ran the application and tested all flows. I then worked with Claude iteratively to:

**Refinements Made:**
- Fixed validation timing issues
- Improved loading state transitions
- Adjusted error message clarity
- Refined responsive behavior on mobile
- Fixed edge cases in form navigation

**Typical Iteration Prompts:**
```
The form doesn't validate properly when clicking Back then Next
```

---

### Phase 7: Deployment & Documentation

**Deployment:**
- Deployed to Vercel (manual deployment, no prompts needed)
- Verified production build and performance

**Documentation Prompt:**
```
Write a professional README for this technical challenge. Include sections for:
- Installation
- Project structure  
- Key design decisions
- API error handling
- Bundle optimization for 3G networks
- Keep it minimal and focused
```

**Claude's Output:**
- Comprehensive README with all required sections
- Technical explanations of architecture decisions
- Documentation of error handling strategy

**My Modifications:**
- Iterative & selective enhancements

---

## Code Ownership Breakdown

### 85% AI-Generated (with feedback tweaks)
- Initial TypeScript type definitions
- Zod validation schemas
- Domain Utils
- API retry logic and exponential backoff implementation
- Mock data generation functions
- Skeleton loader components
- Error boundary setup

### AI-Generated, Significantly Modified by Me
- MUI theme configuration (adjusted colors/spacing)
- Form step navigation logic (refined edge cases)
- Responsive grid breakpoints (tested and adjusted for mobile)
- Loading state minimum display times
- Validation error messages (made more user-friendly)

### Written Entirely by Me
- Custom project scaffolding scripts
- Git workflow and commit messages
- Vercel deployment configuration
- Final testing and QA decisions

---

## Conclusion

Claude AI was instrumental in rapidly building this technical challenge within a short timeframe. The AI handled the heavy lifting of:
- Architecture planning
- Boilerplate code generation
- Complex patterns (retry logic, graceful degradation)
- Component structure

My contribution focused on:
- Strategic decisions (tech choices, scope, architecture)
- Quality assurance (testing, edge cases)
- Polish (styling, UX refinements, error messages)
- Integration (git workflow, deployment, documentation)

**Estimated Time Breakdown:**
- AI-assisted development: ~4-6 hours
- Manual refinement and testing: ~2-3 hours  
- Deployment and documentation: ~1 hour
- **Total: ~8 hours**