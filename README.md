# Convertium App

Convertium App is a modern, accessible, and performant web application built with React, TypeScript, and Vite. It provides user authentication, profile management, and follows best practices for web development.

![Convertium App Screenshot](public/bg-blur-2.webp)

## Features

- **User Authentication**: Secure login and registration system
- **Profile Management**: View and edit user profiles
- **Modern UI**: Clean, responsive design with smooth transitions
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Performance Optimized**: Code splitting, lazy loading, and optimized assets
- **SEO Ready**: Complete with meta tags, sitemap, and robots.txt
- **Progressive Web App**: Installable with offline capabilities

## Tech Stack

- **Frontend Framework**: React 19
- **Type System**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Form Handling**: React Hook Form
- **Icons**: Lucide React
- **Backend Integration**: Supabase

## Best Practices Implemented

### Accessibility (A11y)
- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Proper focus management
- Color contrast compliance
- Reduced motion support

### Performance
- Code splitting with React.lazy and Suspense
- Image optimization
- Resource preloading/preconnect
- Web Vitals monitoring capability
- Efficient rendering with React hooks

### SEO
- Meta tags with Open Graph and Twitter Cards
- Structured sitemap.xml
- Robots.txt configuration
- Semantic heading structure

### Security
- Secure cookie handling
- Proper authentication flow
- Protected routes implementation
- Form validation

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/convertium-app.git
cd convertium-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
convertium-app/
├── public/                  # Static assets
│   ├── bg-blur-2.webp       # Background images
│   ├── manifest.json        # PWA manifest
│   ├── robots.txt           # SEO configuration
│   └── sitemap.xml          # Site map for SEO
├── src/
│   ├── assets/              # Project assets
│   ├── components/          # Reusable components
│   │   ├── ErrorBoundary.tsx
│   │   ├── Input.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── PublicRoute.tsx
│   ├── context/             # React context providers
│   │   └── UserContextFull.tsx
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   │   ├── EditProfilePage.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── ProfilePage.tsx
│   │   └── Register.tsx
│   ├── routes/              # Routing configuration
│   │   └── AppRoutes.tsx
│   ├── services/            # API services
│   │   ├── auth.ts
│   │   └── profile.ts
│   ├── App.css              # Global styles
│   ├── App.tsx              # Main App component
│   ├── index.css            # Base styles
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Supabase](https://supabase.io/)
