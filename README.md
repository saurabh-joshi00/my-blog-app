# My Blog App 📝


## 🧭 Overview

**My Blog App** is a production-level blogging platform where users can sign up, log in, and manage their own blog posts. The app uses **Appwrite** as a BaaS (Backend-as-a-Service) tool for authentication and database management, and integrates **TinyMCE** as a rich text editor for writing posts. Posts can be created, read, updated, and deleted — all behind protected routes that only authenticated users can access.

---

## 🌐 Live Demo

> 🔗 [View Live App](https://myappwriteblogs.vercel.app/)

---

## ✨ Features

- 🔐 **Secure Authentication** — User signup, login, and logout powered by Appwrite Auth and OAuth2
- 🛡️ **Protected Routes** — Private pages accessible only to authenticated users
- 📝 **Rich Text Editor** — TinyMCE integration for writing and formatting posts
- 📖 **Post Feed** — Browse all published posts on the home page
- ✏️ **Create & Edit Posts** — Form-based post creation and editing with React Hook Form
- 🗑️ **Delete Posts** — Authors can remove their own posts
- 🏪 **State Management** - Redux Toolkit for centralized state
- 🎨 **Responsive Design** - Mobile-friendly UI
- 🖼️ **Featured Images** — Upload and display cover images for each post
- 📦 **Appwrite Storage** — File uploads managed via Appwrite Storage buckets
- ⚙️ **Production-Level Architecture** — Clean service abstraction, config management, and component reusability

---

## 🛠️ Tech Stack


| Layer            | Technology                          |
|------------------|-------------------------------------|
| Frontend         | React, React Router DOM             |
| State Management | Redux Toolkit                       |
| Forms            | React Hook Form                     |
| Rich Text Editor | TinyMCE                             |
| HTML Rendering   | HTML React Parser                   |
| Backend/DB       | Appwrite (Auth, Database, Storage)  |
| Styling          | Tailwind CSS, React Hot Toast       |
| Build Tool       | Vite                                |
| Deployment       | Vercel                              |

---

## 🗂️ Project Structure

```
my-blog-app/
├── public/                          # Static assets
│
├── src/
│   ├── app/
│   │   └── store.js                # Redux store configuration
│   │
│   ├── appwrite/
│   │   └── services/
│   │       ├── auth.js             # Authentication service (login, signup, logout)
│   │       ├── database.js         # Database service (CRUD operations for posts)
│   │       └── storage.js          # Storage service (image uploads)
│   │
│   ├── assests/                    # Images, icons, and other media files
│   │
│   ├── components/
│   │   ├── AuthLayout/
│   │   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │   │
│   │   ├── Common/
│   │   │   ├── Button.jsx          # Reusable button component
│   │   │   ├── InputBox.jsx        # Reusable input field component
│   │   │   ├── Logo.jsx            # App logo component
│   │   │   ├── Pagination.jsx      # Pagination component for post lists
│   │   │   ├── PostCard.jsx        # Individual post card component
│   │   │   ├── RealtimeEditor.jsx  # TinyMCE editor integration
│   │   │   ├── SearchBar.jsx       # Search functionality component
│   │   │   └── SelectBox.jsx       # Reusable select dropdown component
│   │   │
│   │   ├── Container/
│   │   │   └── Container.jsx       # Layout wrapper component
│   │   │
│   │   ├── Footer/
│   │   │   └── Footer.jsx          # Footer component
│   │   │
│   │   ├── Header/
│   │   │   ├── Header.jsx          # Navigation header component
│   │   │   └── LogoutBtn.jsx       # Logout button component
│   │   │
│   │   ├── LoginPage/
│   │   │   └── LoginPage.jsx       # Login page component
│   │   │
│   │   ├── PostForm/
│   │   │   └── PostForm.jsx        # Post creation/editing form
│   │   │
│   │   ├── SignupPage/
│   │   │   └── SignupPage.jsx      # Signup page component
│   │   │
│   │   └── index.js                # Component exports
│   │
│   ├── config/
│   │   └── config.js               # App configuration and environment variables
│   │
│   ├── features/
│   │   ├── authentication/
│   │   │   └── authSlice.js        # Redux slice for authentication state
│   │   │
│   │   └── posts/
│   │       └── postSlice.js        # Redux slice for posts state
│   │
│   ├── pages/
│   │   ├── AddPost.jsx             # Page to create new post
│   │   ├── AllPosts.jsx            # Page to view all posts
│   │   ├── EditPost.jsx            # Page to edit existing post
│   │   ├── Home.jsx                # Home page
│   │   ├── Login.jsx               # Login page
│   │   ├── Post.jsx                # Single post detail page
│   │   ├── Signup.jsx              # Signup page
│   │   └── index.js                # Page exports
│   │
│   ├── App.jsx                     # Main app component with routing
│   ├── index.css                   # Global styles
│   └── main.jsx                    # React entry point
│
├── .env                            # Environment variables (local, not in git)
├── .env.sample                     # Sample environment variables template
├── .gitignore                      # Git ignore rules
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Project dependencies and scripts
├── package-lock.json               # Locked dependency versions
├── vite.config.js                  # Vite configuration
├── vercel.json                     # Vercel deployment configuration
└── README.md                       # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Appwrite](https://appwrite.io/) account and project set up

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saurabh-joshi00/my-blog-app.git
 
# 2. Navigate into the project directory
cd my-blog-app
 
# 3. Install dependencies
npm install
```

---

### Environment Variables

Create a `.env` file in the root of the project by copying the example:

```bash
cp .env.example .env
```

Then fill in your Appwrite project details:

```env
VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

---

### Running the App

```bash
# Start the development server
npm run dev
 
# Build for production
npm run build
 
# Preview the production build
npm run preview
```

---

## ☁️ Appwrite Setup

1. Create a new project on [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. **Authentication** — Enable Email/Password auth under Auth settings
3. **Database** — Create a database and a `posts` collection with the following attributes:
   - `title` — String, required
   - `content` — String (large), required
   - `featuredImage` — String (file ID), required
   - `status` — String (`active` / `inactive`), required
   - `userId` — String, required
   - `author` — String, required
   - `slug` — String, required (used as Document ID)
4. **Storage** — Create a storage bucket for featured images
5. **Permissions** — Set appropriate read/write permissions on the collection and bucket
6. Copy your Project ID, Database ID, Collection ID, and Bucket ID into your `.env` file

---

## 🔌 Appwrite Services

### Auth Service (`auth.js`)
- User registration
- User login
- User logout
- Get current user

### Database Service (`database.js`)
- Create post
- Get all posts
- Get single post
- Update post
- Delete post

### Storage Service (`storage.js`)
- Upload images
- Delete images
- Get image preview

---

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

---

## 👨‍💻 BTS Developer

**Saurabh Joshi**
- GitHub: [@github/saurabh-joshi00](https://github.com/saurabh-joshi00)
- LinkedIn: [@linkedin/saurabh-joshi01](https://www.linkedin.com/in/saurabh-joshi01/)
- Twitter/X: [@x/saurabhhdotfr](https://x.com/saurabhhdotfr)

---

<div align="center">
  <sub>Happy Blogging! ❤️</sub>
</div>
