# My Blog App

---

## 🧭 Overview

**My Blog App** is a production-level blogging platform where users can sign up, log in, and manage their own blog posts. The app uses **Appwrite** as a backend-as-a-service for authentication and database management, and integrates **TinyMCE** as a rich text editor for writing posts. Posts can be created, read, updated, and deleted — all behind protected routes that only authenticated users can access.

---

## 🌐 Live Demo

> 🔗 [View Live App](https://your-live-url.com) <!-- Replace with your deployed URL -->

---

## ✨ Features

- 🔐 **Secure Authentication** — User signup, login, and logout powered by Appwrite Auth
- 🛡️ **Protected Routes** — Private pages accessible only to authenticated users
- 📝 **Rich Text Editor** — TinyMCE integration for writing and formatting posts
- 📖 **Post Feed** — Browse all published posts on the home page
- ✏️ **Create & Edit Posts** — Form-based post creation and editing with React Hook Form
- 🗑️ **Delete Posts** — Authors can remove their own posts
- 🖼️ **Featured Images** — Upload and display cover images for each post
- 📦 **Appwrite Storage** — File uploads managed via Appwrite Storage buckets
- ⚙️ **Production-Level Architecture** — Clean service abstraction, config management, and component reusability

---

## 🛠️ Tech Stack


| Layer            | Technology                          |
|------------------|-------------------------------------|
| Frontend         | React 18, React Router DOM          |
| State Management | Redux Toolkit                       |
| Forms            | React Hook Form                     |
| Rich Text Editor | TinyMCE                             |
| HTML Rendering   | HTML React Parser                   |
| Backend / BaaS   | Appwrite (Auth, Database, Storage)  |
| Styling          | Tailwind CSS, React Hot Toast       |
| Build Tool       | Vite                                |

---

## 🗂️ Project Structure

```
my-blog-app/
├── public/                     # Static assets
├── src/
│   ├── appwrite/               # Appwrite service abstractions
│   │   ├── auth.js             # Auth service (signup, login, logout, getCurrentUser)
│   │   └── config.js           # Database & storage service (CRUD, file upload/preview)
│   ├── components/             # Reusable UI components
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── LogoutBtn.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── post-form/
│   │   │   └── PostForm.jsx    # Unified create/edit post form
│   │   ├── AuthLayout.jsx      # Protected route wrapper (auth guard)
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Login.jsx
│   │   ├── Logo.jsx
│   │   ├── PostCard.jsx
│   │   ├── RTE.jsx             # TinyMCE rich text editor wrapper
│   │   ├── Select.jsx
│   │   ├── Signup.jsx
│   │   └── index.js            # Barrel export for all components
│   ├── pages/                  # Route-level page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── AllPosts.jsx
│   │   ├── AddPost.jsx
│   │   ├── EditPost.jsx
│   │   └── Post.jsx
│   ├── store/                  # Redux Toolkit state management
│   │   ├── store.js
│   │   └── authSlice.js
│   ├── conf/                   # Centralized env variable config
│   │   └── conf.js
│   ├── App.jsx                 # Root component with route definitions
│   ├── main.jsx                # Entry point — Redux Provider + React DOM
│   └── index.css               # Global styles
├── .env                        # Environment variables (not committed)
├── .env.sample                 # Sample env file for reference
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- An [Appwrite](https://appwrite.io/) account and project set up

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
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
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
   - `slug` — String, required (used as Document ID)
4. **Storage** — Create a storage bucket for featured images
5. **Permissions** — Set appropriate read/write permissions on the collection and bucket
6. Copy your Project ID, Database ID, Collection ID, and Bucket ID into your `.env` file

---

## 👤 Author

**Saurabh Joshi**
- GitHub: [@github/saurabh-joshi00](https://github.com/saurabh-joshi00)
- LinkedIn: [@linkedin/saurabh-joshi01](https://www.linkedin.com/in/saurabh-joshi01/)
- Twitter/X: [@x/saurabhhdotfr](https://x.com/saurabhhdotfr)

---

<div align="center">
  <sub>Built with ❤️ using React & Appwrite</sub>
</div>
