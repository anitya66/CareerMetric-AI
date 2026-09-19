# CareerMetric AI

### Measure Your Readiness. Master Your Skills. Ace Your Interview.

CareerMetric AI is an AI-powered **Career Intelligence and Job Readiness Platform** built to help developers understand their technical profile, measure their preparation progress, identify skill gaps, practice interviews, analyze job opportunities, and receive personalized career guidance.

Unlike a generic AI chatbot, CareerMetric AI combines **resume intelligence, technical skill analysis, assessments, AI-powered mock interviews, job description intelligence, resume-job matching, skill-gap analysis, personalized preparation plans, Retrieval-Augmented Generation (RAG), AI tool calling, conversational memory, and an AI Career Coach** into a single full-stack application.

The project is built using **Java 21, Spring Boot, Spring AI, React, MySQL, PostgreSQL, PGVector, Groq, and Gemini**.

---

## 🚀 Live Demo

### Frontend

https://career-metric-ai.vercel.app

### Backend API

https://careermetric-ai.onrender.com

### API Documentation

https://careermetric-ai.onrender.com/swagger-ui/index.html

### GitHub

https://github.com/anitya66/CareerMetric-AI

---

## 🎯 Project Vision

Career preparation is often scattered across multiple platforms.

A developer may use one platform for:

- Resume analysis
- Technical skill assessment
- Interview preparation
- Job description analysis
- Resume-job matching
- Learning plans
- Career guidance

CareerMetric AI brings these capabilities together into one platform.

The primary goal is to answer:

> **"How ready am I for my target technical role, and what should I work on next?"**

CareerMetric AI uses information from the user's resume, technical skills, assessment performance, interview performance, target job requirements, and preparation progress to build a structured view of their current readiness.

---

## ✨ Core Features

### 1. Resume Intelligence

Users can upload their resumes and receive AI-powered analysis.

The resume workflow includes:

- Resume upload
- Text extraction
- Resume analysis
- Overall resume score
- Section-wise analysis
- Strength identification
- Weakness identification
- Missing elements
- Improvement recommendations
- Technical technology extraction
- Resume summary

The system is designed to ensure that AI-generated analysis does not invent candidate information.

---

### 2. Technical Skill Intelligence

CareerMetric AI builds a technical skill profile from the user's resume and performance data.

It can track:

- Technologies detected from the resume
- Assessment performance
- Interview performance
- Technology-wise progress
- Overall technical readiness
- Skill-specific insights

The platform provides a structured view of the user's technical preparation instead of treating all skills equally.

---

### 3. Technology-Specific Assessments

Users can take assessments based on specific technologies.

The assessment workflow includes:

```text
Select Technology
       ↓
Create Assessment
       ↓
Start Attempt
       ↓
Answer Questions
       ↓
Submit Assessment
       ↓
Evaluate Performance
       ↓
View Result
       ↓
Update Skill Progress
```

Assessment functionality includes:

- Assessment generation
- Assessment attempts
- Question answering
- Submission
- Result calculation
- Performance tracking
- Skill progress integration

---

### 4. AI Mock Interviews

CareerMetric AI provides AI-powered technical mock interviews.

The interview workflow is:

```text
Select Technology
       ↓
Create Interview
       ↓
AI Generates Questions
       ↓
Answer Questions
       ↓
Complete Interview
       ↓
AI Evaluates Answers
       ↓
Interview Result
       ↓
Skill Progress Update
```

The interview evaluation can provide structured feedback around the submitted answers.

---

### 5. Job Description Intelligence

Users can provide a target job description and analyze its requirements.

The system can identify:

- Required technologies
- Required skills
- Job requirements
- Technical expectations
- Relevant candidate skills

This helps connect the user's current technical profile with the requirements of a target role.

---

### 6. Resume-to-Job Matching

CareerMetric AI can compare a user's resume with a selected job description.

The matching workflow is:

```text
User Resume
      +
Job Description
      ↓
Requirement Analysis
      ↓
Skill Comparison
      ↓
Resume / Job Matching
      ↓
Skill Gap Identification
```

This provides a structured understanding of where the candidate's current profile differs from the target job requirements.

---

### 7. Skill Gap Analysis

The platform identifies areas where additional preparation may be required.

Skill gaps can be derived from:

- Resume technologies
- Job requirements
- Assessment performance
- Interview performance
- Technical skill progress

The objective is to turn the identified gaps into actionable preparation areas.

---

### 8. Personalized Preparation Plans

CareerMetric AI can generate preparation plans based on the user's current profile and target requirements.

A preparation plan can contain:

- Preparation items
- Learning priorities
- Skill-focused tasks
- Progress status
- Activation state
- Completion tracking

The preparation workflow is:

```text
Current Profile
      +
Target Job
      ↓
Skill Gap Analysis
      ↓
Preparation Priorities
      ↓
Preparation Plan
      ↓
Track Progress
```

---

### 9. AI Career Coach

CareerMetric AI includes a dedicated AI Career Coach.

The Career Coach is designed as a context-aware career assistant rather than a generic chatbot.

It can work with relevant application information such as:

- Resume technologies
- Resume summary
- Job matching information
- Career preparation context
- Skill-related information

The Career Coach supports:

- Conversational interaction
- Context-aware responses
- Conversation memory
- Resume-aware questions
- Application-specific AI tools
- Markdown responses
- Progressive response delivery
- JWT-protected access

Example questions include:

```text
What technologies are present in my resume?

What skills should I improve for my target role?

How can I prepare for a Java backend interview?

What are the major gaps in my technical profile?
```

---

## 🧠 Artificial Intelligence Architecture

CareerMetric AI uses different AI capabilities for different application requirements.

The high-level AI architecture is:

```text
                    CareerMetric AI
                          │
                          ▼
                    Spring AI
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
       Groq LLM                    Gemini
       Chat / LLM                Embeddings
             │                         │
             │                         ▼
             │                     PGVector
             │                         │
             │                         ▼
             │                  Similarity Search
             │                         │
             └──────────────┬──────────┘
                            ▼
                    AI Application Layer
```

### AI Provider Responsibilities

| Provider | Responsibility |
|---|---|
| Groq | Chat / LLM generation |
| Gemini | Text embeddings |
| PGVector | Vector storage and similarity search |
| Spring AI | AI integration layer |

---

# 🔎 Retrieval-Augmented Generation (RAG)

CareerMetric AI uses **Retrieval-Augmented Generation (RAG)** for knowledge-aware AI functionality.

The basic RAG workflow is:

```text
Knowledge / Documents
        ↓
Text Processing
        ↓
Chunking
        ↓
Gemini Embeddings
        ↓
PGVector
        ↓
Vector Similarity Search
        ↓
Relevant Context
        ↓
Groq LLM
        ↓
Generated Response
```

Instead of relying only on the language model, relevant information can be retrieved from the vector database and supplied as context to the model.

### RAG Components

- Document processing
- Text chunking
- Embedding generation
- Vector storage
- Similarity search
- Metadata filtering
- Context retrieval
- AI response generation

---

## 🔢 Embeddings

CareerMetric AI uses Google's Gemini embedding model:

```text
gemini-embedding-001
```

The embedding configuration uses:

```text
Dimensions: 1024
```

The embeddings are stored in PostgreSQL using PGVector.

The architecture is:

```text
Text
 ↓
Gemini Embedding Model
 ↓
1024-dimensional Vector
 ↓
PGVector
```

---

## 🧰 AI Tool Calling

The Career Coach uses controlled application-specific tools to access relevant CareerMetric information.

Examples include tools for:

- Current user's resume technologies
- Current user's resume summary
- Resume-job matching

The general flow is:

```text
User Question
      ↓
Career Coach
      ↓
AI Determines Relevant Tool
      ↓
Application Tool
      ↓
Application Data
      ↓
Tool Result
      ↓
AI Response
```

This allows the AI to work with application data instead of treating every question as an isolated conversation.

---

## 💬 Conversational Memory

Conversational memory is explicitly used by the Career Coach.

The Career Coach maintains conversation context using a conversation identifier.

```text
User
 ↓
Career Coach
 ↓
Conversation ID
 ↓
Chat Memory
 ↓
Relevant Conversation Context
 ↓
LLM
```

Memory is intentionally scoped to the Career Coach rather than being globally attached to every AI operation.

This keeps stateless AI operations such as resume analysis, assessment generation, and job-description analysis independent from conversational memory.

---

# 🏗️ System Architecture

CareerMetric AI is implemented as a **Modular Monolith**.

The project intentionally avoids unnecessary distributed architecture and keeps the application's business capabilities inside a single Spring Boot backend.

High-level architecture:

```text
┌───────────────────────────────────────────────┐
│                  React Frontend               │
│                                               │
│ React + Vite + Tailwind CSS                   │
│ React Router + React Query + Axios            │
└───────────────────────┬───────────────────────┘
                        │
                        │ REST APIs
                        ▼
┌───────────────────────────────────────────────┐
│               Spring Boot Backend              │
│                                               │
│ Controllers                                    │
│      ↓                                        │
│ Services                                       │
│      ↓                                        │
│ Repositories                                   │
│                                               │
│ Spring Security + JWT                          │
│ Spring AI                                     │
└───────────────┬───────────────────┬───────────┘
                │                   │
                ▼                   ▼
       ┌────────────────┐   ┌──────────────────┐
       │     MySQL      │   │ PostgreSQL       │
       │                │   │ + PGVector       │
       │ Application    │   │                  │
       │ Data           │   │ Vector Data      │
       └────────────────┘   └────────┬─────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ AI Providers │
                              │              │
                              │ Groq         │
                              │ Gemini       │
                              └──────────────┘
```

---

# 📦 Application Modules

The backend is organized around major business capabilities.

```text
CareerMetric AI
│
├── Authentication & Security
│
├── Resume Intelligence
│
├── Skill Intelligence
│
├── Assessments
│
├── AI Mock Interviews
│
├── Job Description Intelligence
│
├── Preparation Plans
│
├── AI / RAG
│
└── Career Coach
```

---

# 🔐 Authentication & Security

CareerMetric AI uses stateless authentication based on JWT.

Authentication architecture:

```text
                    Authentication
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
      Email / Password          Google Sign-In
              │                       │
              └───────────┬───────────┘
                          ▼
                   Spring Security
                          │
                          ▼
                  CareerMetric JWT
                          │
                          ▼
                Protected REST APIs
```

### Security Technologies

- Spring Security
- JWT
- BCrypt password hashing
- Stateless sessions
- Role-based authorization
- Protected API endpoints
- User ownership checks
- Google Sign-In
- Google ID token verification
- Environment-based secret management
- CORS configuration

### Protected Resources

User-specific resources are protected so that authenticated users can access only their own application data.

---

# 🔑 Google Sign-In

CareerMetric AI supports Google authentication using Google Identity Services.

The flow is:

```text
React
 ↓
Google Identity Services
 ↓
Google ID Token
 ↓
Spring Boot
 ↓
Google ID Token Verification
 ↓
Find / Create User
 ↓
Generate CareerMetric JWT
 ↓
React
 ↓
Authenticated Application
```

The Google Client ID is provided through environment variables and is not hard-coded into the backend.

---

# 🗄️ Database Architecture

CareerMetric AI uses two database systems for different responsibilities.

## MySQL

MySQL is the primary application database.

It stores relational application data such as:

- Users
- Resumes
- Skills
- Assessments
- Assessment attempts
- Interviews
- Interview answers
- Job descriptions
- Job requirements
- Preparation plans
- Preparation items
- Progress information

---

## PostgreSQL + PGVector

PostgreSQL with PGVector is used for vector-based AI functionality.

It stores:

- Embedded documents
- Vector representations
- Metadata
- Knowledge used for semantic retrieval

The architecture separates traditional transactional application data from vector search data.

```text
                 CareerMetric AI
                       │
            ┌──────────┴──────────┐
            │                     │
            ▼                     ▼
          MySQL               PostgreSQL
      Relational Data          + PGVector
                                   │
                                   ▼
                            Vector Search
```

---

# 📄 Resume Processing

Resume documents are processed using Apache Tika for text extraction.

The general flow is:

```text
Resume File
     ↓
Upload
     ↓
Document Type Validation
     ↓
Text Extraction
     ↓
Resume Content
     ↓
AI Analysis
     ↓
Structured Resume Intelligence
```

The extracted content can be used for:

- Resume analysis
- Technology extraction
- Resume summary
- Skill intelligence
- Job matching
- Career Coach context

---

# 🌐 REST API

CareerMetric AI exposes REST APIs through Spring Boot.

Swagger/OpenAPI documentation is available at:

https://careermetric-ai.onrender.com/swagger-ui/index.html

## Main API Areas

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/google
```

### Resume

```text
POST /api/resumes
GET  /api/resumes
GET  /api/resumes/{resumeId}
POST /api/resumes/{resumeId}/analyze
GET  /api/resumes/{resumeId}/analysis
```

### Skills

```text
GET /api/skills
GET /api/skills/dashboard
GET /api/skills/{technologyId}
```

### Skill Progress

```text
GET /api/skill-progress
GET /api/skill-progress/readiness
GET /api/skill-progress/{technologyId}
```

### Assessments

```text
POST /api/assessments
GET  /api/assessments
GET  /api/assessments/{assessmentId}

POST /api/assessments/{assessmentId}/attempts

POST /api/assessments/{assessmentId}/attempts/{attemptId}/answers

POST /api/assessments/{assessmentId}/attempts/{attemptId}/submit

GET /api/assessments/{assessmentId}/attempts/{attemptId}/result
```

### Interviews

```text
POST /api/interviews
GET  /api/interviews
GET  /api/interviews/{interviewId}
GET  /api/interviews/{interviewId}/questions
POST /api/interviews/{interviewId}/answers
POST /api/interviews/{interviewId}/complete
GET  /api/interviews/{interviewId}/result
```

### Job Intelligence

```text
POST /api/jobs
GET  /api/jobs
GET  /api/jobs/{jobDescriptionId}
POST /api/jobs/{jobDescriptionId}/analyze
POST /api/jobs/match
```

### Preparation

```text
POST  /api/preparation-plans
GET   /api/preparation-plans
GET   /api/preparation-plans/generate
GET   /api/preparation-plans/{planId}

PATCH /api/preparation-plans/{planId}/activate

PATCH /api/preparation-plans/{planId}/items/{itemId}/status
```

### Career Coach

```text
POST /api/ai/career-coach/stream
```

### Health

```text
GET /api/health
```

---

# 🖥️ Frontend Architecture

The frontend is built using React and follows a service + hook + page architecture.

General structure:

```text
React Page
    ↓
React Query Hook
    ↓
Service Layer
    ↓
Axios API Client
    ↓
Spring Boot REST API
```

The frontend uses:

- React
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- React Hook Form
- Zod
- Recharts
- React Markdown
- Lucide React
- Leaflet / React-Leaflet where required

---

# 🧭 Application Routing

### Public Routes

```text
/
 /login
 /register
```

### Protected Routes

```text
/dashboard

/resume
/resume/:resumeId

/skills
/skills/:technologyId

/assessments
/assessments/:assessmentId
/assessments/:assessmentId/attempt/:attemptId
/assessments/:assessmentId/attempt/:attemptId/result

/interviews
/interviews/:interviewId
/interviews/:interviewId/questions
/interviews/:interviewId/result

/jobs
/jobs/:jobDescriptionId

/preparation
/preparation/:planId

/career-coach
```

Protected routes require authentication.

---

# 🎨 UI / UX

CareerMetric AI follows a modern AI SaaS design direction.

The interface focuses on:

- Dark neutral visual language
- Clean typography
- Spacious layouts
- Subtle borders
- Strong information hierarchy
- Responsive design
- Minimal visual noise
- Professional developer-focused presentation
- Clear loading states
- Empty states
- Error states
- AI-specific interaction states

The goal is to make the application feel like a professional career intelligence product rather than a traditional admin dashboard.

---

# 🧱 Technology Stack

## Backend

| Technology | Purpose |
|---|---|
| Java 21 | Core backend language |
| Spring Boot | Backend framework |
| Spring Security | Authentication and authorization |
| JWT | Stateless authentication |
| Spring Data JPA | Data access |
| Hibernate | ORM |
| Spring AI | AI integration |
| Maven | Build and dependency management |
| Apache Tika | Resume text extraction |
| SpringDoc OpenAPI | API documentation |

## Frontend

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| TanStack React Query | Server-state management |
| Axios | HTTP communication |
| React Hook Form | Form handling |
| Zod | Validation |
| Recharts | Data visualization |
| React Markdown | AI response rendering |
| Lucide React | Icons |

## Databases

| Technology | Purpose |
|---|---|
| MySQL | Application database |
| PostgreSQL | Vector database |
| PGVector | Vector storage and similarity search |

## AI

| Technology | Purpose |
|---|---|
| Spring AI | AI application framework |
| Groq | Chat / LLM |
| Gemini | Embeddings |
| RAG | Knowledge retrieval |
| PGVector | Semantic search |
| Tool Calling | Application-aware AI |
| Chat Memory | Conversational context |

## Deployment

| Technology | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Aiven | MySQL hosting |
| Neon | PostgreSQL + PGVector |
| Docker | Backend containerization |

---

# 🐳 Docker

The Spring Boot backend is containerized using Docker.

The backend uses a multi-stage Docker build:

```text
Maven Build Image
       ↓
Compile / Package Application
       ↓
Spring Boot JAR
       ↓
Java 21 Runtime Image
       ↓
Containerized Backend
```

The backend contains:

```text
backend/
├── Dockerfile
└── .dockerignore
```

The Docker build separates the build environment from the runtime environment.

---

# ☁️ Deployment Architecture

CareerMetric AI is deployed using a free-tier cloud architecture.

```text
                       User
                        │
                        ▼
                ┌──────────────┐
                │    Vercel    │
                │   Frontend   │
                └──────┬───────┘
                       │
                       │ HTTPS / REST
                       ▼
                ┌──────────────┐
                │    Render    │
                │   Backend    │
                │ Spring Boot  │
                └──────┬───────┘
                       │
            ┌──────────┴───────────┐
            │                      │
            ▼                      ▼
      ┌────────────┐        ┌─────────────┐
      │   Aiven    │        │    Neon     │
      │   MySQL    │        │ PostgreSQL  │
      │            │        │ + PGVector  │
      └────────────┘        └──────┬──────┘
                                   │
                                   │
                         ┌─────────┴─────────┐
                         │                   │
                         ▼                   ▼
                     ┌───────┐          ┌────────┐
                     │ Groq  │          │ Gemini │
                     │  LLM  │          │ Embed. │
                     └───────┘          └────────┘
```

---

# 🔒 Environment Variables

Secrets and environment-specific configuration are not committed to Git.

## Backend

Example production environment variables:

```env
DB_URL=
DB_USERNAME=
DB_PASSWORD=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GROQ_API_KEY=
GEMINI_API_KEY=

PGVECTOR_DB_URL=
PGVECTOR_DB_USERNAME=
PGVECTOR_DB_PASSWORD=
```

The actual values must never be committed to the repository.

---

# 💻 Local Development

## Prerequisites

Make sure the following are installed:

- Java 21
- Maven
- Node.js
- npm
- MySQL
- PostgreSQL
- PGVector
- Git

AI provider API keys are also required for AI functionality.

---

# 📥 Clone the Repository

```bash
git clone https://github.com/anitya66/CareerMetric-AI.git

cd CareerMetric-AI
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd backend
```

Configure the required environment variables.

For local development, the application expects:

```env
DB_URL=jdbc:mysql://localhost:3306/careermetric
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id

GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key

PGVECTOR_DB_URL=jdbc:postgresql://localhost:5432/postgres
PGVECTOR_DB_USERNAME=your_postgres_username
PGVECTOR_DB_PASSWORD=your_postgres_password
```

Then run:

```bash
mvn clean install
```

Start the application:

```bash
mvn spring-boot:run
```

The backend will normally run on:

```text
http://localhost:8080
```

---

# 🎨 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the frontend environment configuration:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔄 Local Application Flow

After starting both applications:

```text
React
http://localhost:5173
        │
        ▼
Spring Boot
http://localhost:8080
        │
        ├── MySQL
        │
        ├── PostgreSQL + PGVector
        │
        ├── Groq
        │
        └── Gemini
```

---

# 📚 API Documentation

CareerMetric AI uses OpenAPI / Swagger for API documentation.

Local Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

Production Swagger:

https://careermetric-ai.onrender.com/swagger-ui/index.html

Swagger provides an interactive interface for exploring the backend APIs.

---

# 🧪 Testing the Application

Recommended end-to-end testing flow:

```text
1. Register
      ↓
2. Login
      ↓
3. Upload Resume
      ↓
4. Analyze Resume
      ↓
5. Review Technical Skills
      ↓
6. Take Assessment
      ↓
7. Complete AI Mock Interview
      ↓
8. Analyze Job Description
      ↓
9. Match Resume With Job
      ↓
10. Identify Skill Gaps
      ↓
11. Generate Preparation Plan
      ↓
12. Track Preparation Progress
      ↓
13. Use AI Career Coach
```

---

# 🔐 Security Practices

CareerMetric AI follows several security practices:

- JWT-based authentication
- BCrypt password hashing
- Stateless authentication
- Protected API endpoints
- User ownership validation
- Google ID token verification
- Environment variables for secrets
- No AI provider API keys exposed to the frontend
- CORS configuration
- Request validation
- Structured API responses
- Authentication checks on protected resources

AI provider credentials remain on the backend.

The frontend communicates with the backend rather than directly exposing provider API keys.

---

# 🧠 AI Engineering Practices

The AI layer is designed with application-specific requirements in mind.

Important practices include:

- Structured AI output
- Input validation
- Output validation
- Error handling
- Model failure handling
- API failure handling
- Context-aware prompting
- RAG
- Embeddings
- Vector search
- Tool calling
- Conversational memory
- Controlled AI access to application data

For resume analysis, the system is designed to avoid fabricating:

- Skills
- Experience
- Projects
- Certifications
- Employment history
- Achievements

---

# 🧩 Design Principles

The project follows practical software engineering principles.

### Clean Architecture

Responsibilities are separated across appropriate layers.

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### DTO-Based APIs

API contracts use DTOs rather than exposing persistence entities directly where appropriate.

### Separation of Concerns

Business logic, data access, authentication, AI integration, and frontend API communication are kept separated.

### SOLID Principles

The project follows SOLID principles where applicable to maintain readable and extensible code.

### Reusable Components

Frontend functionality is organized using reusable components, hooks, services, and layouts.

### Centralized Error Handling

Backend exceptions are handled through centralized mechanisms to provide consistent API behavior.

---

# 📁 Project Structure

High-level repository structure:

```text
CareerMetric-AI/
│
├── backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── careermetric/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── app/
│   │
│   ├── public/
│   ├── vercel.json
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 CareerMetric AI End-to-End Workflow

The complete application workflow can be represented as:

```text
                         USER
                          │
                          ▼
                     Register / Login
                          │
                          ▼
                       Dashboard
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
      Resume           Skills          Job Search
        │                 │                 │
        ▼                 ▼                 ▼
   AI Analysis       Assessments       JD Analysis
        │                 │                 │
        │                 ▼                 │
        │           Mock Interviews        │
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
                    Skill Intelligence
                          │
                          ▼
                    Skill Gap Analysis
                          │
                          ▼
                   Preparation Plan
                          │
                          ▼
                    Progress Tracking
                          │
                          ▼
                    AI Career Coach
```

---

# 🎯 Example Career Preparation Journey

A typical user journey can look like:

```text
Upload Resume
      ↓
Resume Analysis
      ↓
Extract Technologies
      ↓
Build Technical Profile
      ↓
Take Java Assessment
      ↓
Practice Java Mock Interview
      ↓
Analyze Target Job Description
      ↓
Match Resume With Job
      ↓
Identify Skill Gaps
      ↓
Generate Preparation Plan
      ↓
Track Progress
      ↓
Ask AI Career Coach for Guidance
```

This connects the different modules into a single preparation workflow.

---

# 📊 Readiness Concept

CareerMetric AI is designed around multiple preparation signals rather than a single isolated interaction.

Relevant signals can include:

```text
Resume
  +
Technical Skills
  +
Assessment Performance
  +
Interview Performance
  +
Target Job Requirements
  +
Preparation Progress
```

These inputs can be used to provide a more structured picture of technical preparation.

---

# 🌱 Future Improvements

Possible future improvements include:

- More advanced progress analytics
- Additional assessment capabilities
- Expanded interview evaluation
- Improved preparation recommendations
- Additional RAG knowledge sources
- More AI Career Coach tools
- Better observability
- Automated testing expansion
- Performance optimization
- Improved document processing
- Additional deployment optimizations

Future improvements will be added only when they provide meaningful value to the application.

---

# ⚠️ Deployment Considerations

CareerMetric AI currently uses free-tier infrastructure for deployment.

The deployed services may have limitations associated with their respective free tiers.

In particular:

- Free backend hosting may experience cold starts after periods of inactivity.
- Free hosting environments may have resource limitations.
- Local filesystem storage on ephemeral hosting environments should not be treated as permanent storage.
- External object storage should be considered for persistent production resume storage.
- AI providers may enforce free-tier usage limits.
- Database providers may enforce free-tier storage and connection limits.

These limitations are considered part of the current portfolio deployment setup.

---

# 🏆 Engineering Highlights

CareerMetric AI demonstrates practical experience across both traditional full-stack development and modern AI application development.

### Backend Engineering

- Java 21
- Spring Boot
- REST API design
- Spring Security
- JWT authentication
- Google authentication
- JPA / Hibernate
- MySQL
- PostgreSQL
- DTO-based architecture
- Validation
- Exception handling
- Modular monolith architecture

### Frontend Engineering

- React
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Axios
- Form validation
- Responsive UI
- Markdown rendering
- Data visualization
- API integration

### AI Engineering

- Spring AI
- LLM integration
- Structured AI output
- Prompt engineering
- Embeddings
- Gemini embeddings
- PGVector
- Semantic similarity search
- RAG
- Tool calling
- Conversational memory
- AI-powered interview evaluation
- AI-powered resume analysis
- AI Career Coach

### Deployment

- Docker
- Vercel
- Render
- Aiven
- Neon
- Environment-based configuration
- Production API configuration
- Cloud deployment

---

# 📌 Why This Project?

CareerMetric AI was built to combine modern Java Full Stack development with practical AI application engineering.

The project demonstrates how AI can be integrated into a real software product instead of being used only as a standalone chatbot.

The core engineering idea is:

```text
Traditional Full Stack Application
                +
        Artificial Intelligence
                +
       Structured Application Data
                +
       Vector Search / RAG
                +
         Context-Aware Tools
                ↓
       Career Intelligence Platform
```

---

# 👨‍💻 Author

**Anitya Anand**

Java Full Stack Developer | Spring Boot Developer | AI Application Developer

### GitHub

https://github.com/anitya66

### LinkedIn

https://www.linkedin.com/in/anitya-anand-602011299/

---

# ⭐ Project

If you find the project interesting, consider exploring the repository and the live application.

### CareerMetric AI

**Measure Your Readiness. Master Your Skills. Ace Your Interview.**

GitHub:  
https://github.com/anitya66/CareerMetric-AI

Live Application:  
https://career-metric-ai.vercel.app

API Documentation:  
https://careermetric-ai.onrender.com/swagger-ui/index.html
