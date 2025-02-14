# Personal Finance Tracker

A modern and user-friendly personal finance tracking application built with Vue 3 and TypeScript.

## Approach & Architecture

### Design Philosophy
- **User-Centric Design**: Focus on intuitive navigation and clear data visualization
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with modern features
- **Responsive First**: Built mobile-first with responsive design principles
- **Performance Oriented**: Optimized bundle size and lazy loading for faster load times

### Technical Decisions
1. **Vue 3 + TypeScript**: 
   - Composition API for better code organization and reuse
   - TypeScript for type safety and better developer experience
   - Vite for fast development and optimized production builds

2. **State Management**:
   - Pinia for predictable state management
   - Local storage for data persistence
   - User-specific data isolation

3. **UI/UX Considerations**:
   - TailwindCSS for utility-first styling
   - Custom components for consistent design
   - Smooth animations for better feedback
   - Dark mode support
   - Responsive layouts for all devices

4. **Internationalization**:
   - Vue I18n for multi-language support
   - RTL support for Arabic and Hebrew
   - Number and currency formatting

5. **Data Visualization**:
   - Chart.js for performance and customization
   - Responsive charts that adapt to screen size
   - Interactive tooltips and legends

6. **Security & Privacy**:
   - Client-side data encryption
   - No external data transmission
   - Secure user authentication

## Features

### Core Features
- 💰 Easy transaction management (income/expense)
- 📊 Detailed analytics and charts
- 🏷️ Customizable categories with icons and colors
- 📱 Responsive design for all devices
- 💾 Data persistence with localStorage
- 🌍 Multi-language support (English/Turkish)
- 🔐 User authentication system (demo)
- 📈 Monthly trend analysis
- 💹 Savings rate calculation

### Transaction Management
- Add, edit, and delete transactions
- Categorize transactions
- Filter transactions by date range, type, and category
- View transaction history with sorting options
- Beautiful animations for transaction operations

### Analytics
- Monthly income/expense trends
- Category distribution charts
- Savings rate analysis
- Dynamic date range filtering
- Interactive charts with Chart.js

### Categories
- Custom category management
- Color and icon selection
- Income/Expense category separation
- Category-based filtering
- Category-based analytics

### User Experience
- Clean and intuitive interface
- Modern design with TailwindCSS
- Smooth animations and transitions
- Form validations and error handling
- Loading states and feedback
- User-specific data storage

## Technologies

- Vue 3 (Composition API)
- TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- TailwindCSS
- Chart.js
- Vue I18n
- Vitest

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

```
src/
├── assets/        # Static assets and global styles
├── components/    # Reusable Vue components
├── stores/        # Pinia stores for state management
├── views/         # Page components
├── router/        # Vue Router configuration
├── types/         # TypeScript type definitions
├── locales/       # i18n translation files
└── i18n/          # i18n configuration
```

## Development Guidelines

### Component Structure
- All components use TypeScript and Composition API
- Props and emits are typed using TypeScript interfaces
- Components follow single responsibility principle
- Reusable components are modular and well-documented

### State Management
- Global state handled by Pinia stores
- LocalStorage synchronization in stores
- TypeScript types for all state properties
- Computed properties for derived state

### Styling Guide
- TailwindCSS utility-first approach
- Custom CSS only when necessary
- Consistent color palette and spacing
- Responsive design using TailwindCSS breakpoints

### Testing Strategy
- Unit tests with Vitest
- Component testing with Vue Test Utils
- Critical business logic coverage
- Isolated store and utility testing

### Code Quality
- ESLint and Prettier for code formatting
- TypeScript for type safety
- Clean Code principles
- Modular and reusable code structures
- Security best practices
- Performance optimization

## Upcoming Features
- Drag and drop chart layout in Analytics
- AI-powered financial insights
- Enhanced data visualization
- Performance optimizations
- Additional chart types and analytics

## License

MIT
