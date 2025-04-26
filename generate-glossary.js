
/**
 * generate-glossary.js
 * 
 * A script to generate markdown files for glossary terms.
 * 
 * Usage:
 * node generate-glossary.js
 */

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

// Define the directory where glossary markdown files will be saved
const GLOSSARY_DIR = path.join(__dirname, 'src', 'content', 'glossary');

// Define the glossary terms data


// Define the glossary terms data
const glossaryTerms = [
    {
        title: "Declarative Video Creation",
        slug: "declarative-video-creation",
        description: "An approach to producing videos where content creators specify what should happen rather than manually performing each action.",
        content: `
  # Declarative Video Creation
  
  Declarative video creation is an approach to producing videos where content creators specify *what* should happen in the video rather than manually performing and recording each action. Using a declarative approach, creators define the desired outcome and sequence of events in a structured format (such as JSON), and the video is automatically generated according to these specifications.
  
  ## How It Relates to Software Education
  
  In software education, traditional video creation typically involves:
  
  1. Setting up a screen recording tool
  2. Manually typing code or navigating interfaces
  3. Recording voice narration in real-time
  4. Editing out mistakes, pauses, and distractions
  5. Post-processing to enhance quality and clarity
  
  This process is time-consuming, error-prone, and difficult to maintain or update. When content needs revision, creators often must re-record entire sections.
  
  Declarative video creation transforms this workflow by:
  
  - Separating content definition from execution
  - Enabling perfect, deterministic playback every time
  - Allowing easy updates by modifying the declaration rather than re-recording
  - Providing the ability to export the same content to multiple formats (video, text, slides)
  - Eliminating the need for video editing skills
  
  ## How CodeVideo Uses Declarative Video Creation
  
  CodeVideo implements declarative video creation by allowing users to define a series of actions in JSON format. Each action represents a step in the tutorial or demonstration, such as:
  
  - Speaking narration text
  - Typing code
  - Creating or navigating files
  - Running commands
  - Displaying slides
  - Highlighting sections of code
  
  For example, a simple declaration might look like:
  
  \`\`\`json
  [
    {
      "name": "author-speak-before",
      "value": "Let's create a simple Python function."
    },
    {
      "name": "file-explorer-create-file",
      "value": "functions.py"
    },
    {
      "name": "editor-type",
      "value": "def greet(name):\\n    return f\\"Hello, {name}!\\"\\n\\nprint(greet(\\"World\\"))"
    },
    {
      "name": "author-speak-after",
      "value": "Now we can call our function to greet users."
    }
  ]
  \`\`\`
  
  CodeVideo processes these declarations to generate a video where the narration is spoken, code is typed with realistic timing, and the result is a professional-quality tutorial—all without the creator needing to perform perfect takes or edit video.
  
  This approach offers several advantages:
  
  - **Consistency**: Every video maintains the same quality, pacing, and style
  - **Efficiency**: Create content in minutes rather than hours
  - **Maintainability**: Update content by changing the declaration, not re-recording
  - **Multi-format**: Export the same declaration to video, documentation, slides, or interactive tutorials
  - **Version control**: Track changes to educational content using standard tools like Git
  
  ## Related Terms
  
  - Deterministic Recording System
  - Virtual IDE
  - Action-Based Video Creation
  - Content Separation
  - JSON Actions
      `,
        relatedTerms: [
            { title: "Deterministic Recording System", slug: "deterministic-recording-system" },
            { title: "Virtual IDE", slug: "virtual-ide" },
            { title: "Action-Based Video Creation", slug: "action-based-video-creation" },
            { title: "Content Separation", slug: "content-separation" }
        ]
    },
    {
        title: "Deterministic Recording System",
        slug: "deterministic-recording-system",
        description: "A system that produces identical output given the same input declarations, eliminating the variability of manual recordings.",
        content: `
  # Deterministic Recording System
  
  A deterministic recording system is a content creation approach that guarantees identical output each time given the same input parameters. Unlike traditional recording methods which introduce variability through human performance, a deterministic system follows a precise set of instructions to generate consistent, predictable results.
  
  ## Core Principles
  
  The deterministic recording paradigm is built on several key principles:
  
  1. **Input Consistency**: The same inputs always produce the same outputs
  2. **Reproducibility**: Sessions can be perfectly reproduced at any time
  3. **Error Elimination**: Human performance errors are removed from the equation
  4. **Precise Timing**: Actions occur with exact timing specifications
  5. **Parameterized Control**: All aspects of the recording can be precisely configured
  
  ## Applications in Software Education
  
  In software education, deterministic recording systems offer significant advantages:
  
  ### Pedagogical Consistency
  
  When teaching programming concepts, consistency is crucial. A deterministic system ensures that:
  
  - Code examples are typed at the same pace
  - Explanations are delivered with consistent timing
  - Visual elements appear in the same sequence
  - Errors and mistakes don't distract from the learning objectives
  
  ### Content Maintenance
  
  Software evolves rapidly, making content maintenance a significant challenge. With deterministic recording:
  
  - Updates can be made to specific sections without re-recording
  - Version changes can be implemented programmatically
  - Content can be parameterized (e.g., changing programming language while keeping explanations)
  - Historical versions can be preserved while generating updated content
  
  ## How CodeVideo Implements Deterministic Recording
  
  CodeVideo's deterministic recording system works by:
  
  1. **Action Definition**: Educational content is defined as a sequence of discrete actions
  2. **Timing Control**: Each action has precise timing parameters
  3. **Rendering Pipeline**: Actions are processed through a rendering pipeline that produces identical results
  4. **Multi-format Output**: The same action sequence can be rendered to different formats
  
  This approach ensures that when you define a tutorial sequence, it will execute exactly the same way every time, regardless of when or where it's rendered.
  
  ## Benefits Over Traditional Recording
  
  | Aspect | Traditional Recording | Deterministic Recording |
  |--------|----------------------|------------------------|
  | Consistency | Varies between takes | Perfect consistency |
  | Errors | Requires re-recording | Never occurs |
  | Updates | Complete re-recording | Targeted modifications |
  | Time Investment | High (multiple takes) | Low (single definition) |
  | Quality Control | Manual review | Automated consistency |
  
  ## Related Terms
  
  - Declarative Video Creation
  - Reproducible Content Generation
  - Parameterized Educational Content
  - Action-Based Video Creation
      `,
        relatedTerms: [
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Action-Based Video Creation", slug: "action-based-video-creation" },
            { title: "Content Separation", slug: "content-separation" }
        ]
    },
    {
        title: "Virtual IDE",
        slug: "virtual-ide",
        description: "A simulated development environment used in declarative videos to show coding actions without requiring actual screen recording.",
        content: `
  # Virtual IDE
  
  A Virtual IDE (Integrated Development Environment) is a simulated programming environment used in educational content to demonstrate coding concepts without requiring an actual screen recording of a real IDE. It provides a controlled, consistent interface that can be programmatically manipulated to showcase programming techniques.
  
  ## Purpose and Function
  
  The Virtual IDE serves several important purposes in educational content creation:
  
  1. **Controlled Environment**: Eliminates distractions and inconsistencies present in real IDEs
  2. **Programmatic Control**: Can be manipulated through code rather than manual interaction
  3. **Consistent Appearance**: Maintains the same visual presentation across all content
  4. **Focused Learning**: Highlights only the relevant aspects of programming
  5. **Portable Representation**: Works across different platforms and viewing contexts
  
  ## Components of a Virtual IDE
  
  A comprehensive Virtual IDE typically includes simulated versions of:
  
  ### Code Editor
  - Syntax highlighting
  - Line numbers
  - Cursor positioning and movement
  - Text selection capabilities
  - Code folding representation
  
  ### File Explorer
  - File and folder structure navigation
  - File creation, deletion, and renaming
  - Folder expansion and collapse
  - File selection and focus
  
  ### Terminal/Console
  - Command input
  - Output display
  - Error messaging
  - Command history
  
  ### Additional Elements
  - Tabs for multiple open files
  - Status bar information
  - Notification areas
  - Version control indicators
  
  ## How CodeVideo Implements a Virtual IDE
  
  CodeVideo's Virtual IDE implementation is built on a declarative model where each action within the IDE is defined through structured data rather than recorded interactions. This allows for:
  
  1. **Perfect Execution**: Code typing, navigation, and other actions are executed flawlessly
  2. **Consistent Timing**: Actions occur with precise timing for optimal learning
  3. **Visual Clarity**: Important elements can be highlighted or emphasized
  4. **Deterministic Behavior**: The same sequence produces identical results every time
  
  Example of a Virtual IDE action sequence:
  
  \`\`\`json
  [
    {
      "name": "file-explorer-create-file",
      "value": "app.js"
    },
    {
      "name": "editor-type",
      "value": "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});"
    },
    {
      "name": "terminal-type",
      "value": "node app.js"
    },
    {
      "name": "terminal-enter",
      "value": ""
    },
    {
      "name": "terminal-output",
      "value": "Server running on port 3000"
    }
  ]
  \`\`\`
  
  ## Benefits for Educational Content
  
  Using a Virtual IDE in educational content offers significant advantages:
  
  - **Eliminating Distractions**: Removes notifications, custom themes, and other elements that might distract learners
  - **Consistent Experience**: Ensures all learners see the same interface regardless of their own setup
  - **Perfect Demonstrations**: Code examples always work as intended without typos or runtime errors
  - **Focused Learning**: Can highlight specific parts of the code or interface to direct attention
  - **Multi-format Compatibility**: The same Virtual IDE can be rendered in video, interactive tutorials, or static documentation
  
  ## Related Terms
  
  - Declarative Video Creation
  - Deterministic Recording System
  - Software Education Environment
  - IDE Simulation
      `,
        relatedTerms: [
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Deterministic Recording System", slug: "deterministic-recording-system" }
        ]
    },
    {
        title: "Action-Based Video Creation",
        slug: "action-based-video-creation",
        description: "A method of creating videos by defining a sequence of actions that should occur, rather than recording them as they happen.",
        content: `
  # Action-Based Video Creation
  
  Action-Based Video Creation is a methodology for producing educational videos by defining discrete actions that should occur in sequence, rather than recording continuous activity. This approach breaks down a video into individual, well-defined steps that can be processed, edited, and rendered programmatically.
  
  ## Core Concept
  
  Traditional video creation captures continuous streams of activity, requiring the creator to perform actions in real-time and often necessitating multiple takes and extensive editing. Action-Based Video Creation fundamentally changes this process by:
  
  1. **Defining discrete actions**: Breaking down the video into specific, atomic actions
  2. **Sequencing these actions**: Arranging them in the desired order
  3. **Parameterizing timing and appearance**: Controlling how each action is rendered
  4. **Generating the video**: Processing the action sequence to produce the final output
  
  ## Types of Actions in Educational Content
  
  In the context of programming education, actions typically include:
  
  ### Narrative Actions
  - Speaking or narrating content
  - Pausing for emphasis
  - Transitioning between topics
  
  ### Coding Actions
  - Typing code
  - Navigating within a file
  - Selecting and manipulating text
  - Highlighting code sections
  
  ### Environment Actions
  - Creating or opening files
  - Navigating directory structures
  - Switching between files
  - Running commands in terminals
  - Demonstrating program output
  
  ### Visual Guidance Actions
  - Moving the cursor or mouse
  - Highlighting elements
  - Zooming or focusing on specific areas
  - Displaying annotations or callouts
  
  ## Implementation in CodeVideo
  
  CodeVideo implements Action-Based Video Creation through a structured JSON format where each action has:
  
  1. **Name**: Identifying the type of action (e.g., \`editor-type\`, \`author-speak-before\`)
  2. **Value**: The content or parameters for the action
  3. **Optional attributes**: Additional parameters controlling timing, appearance, etc.
  
  Example action sequence:
  
  \`\`\`json
  [
    {
      "name": "author-speak-before",
      "value": "Let's create a simple HTTP server in Node.js."
    },
    {
      "name": "file-explorer-create-file",
      "value": "server.js"
    },
    {
      "name": "editor-type",
      "value": "const http = require('http');\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200;\n  res.setHeader('Content-Type', 'text/plain');\n  res.end('Hello World');\n});\n\nserver.listen(3000, '127.0.0.1', () => {\n  console.log('Server running at http://127.0.0.1:3000/');\n});"
    },
    {
      "name": "author-speak-after",
      "value": "This code creates a basic HTTP server that responds with 'Hello World' on port 3000."
    },
    {
      "name": "terminal-type",
      "value": "node server.js"
    },
    {
      "name": "terminal-enter",
      "value": ""
    },
    {
      "name": "terminal-output",
      "value": "Server running at http://127.0.0.1:3000/"
    }
  ]
  \`\`\`
  
  ## Advantages Over Traditional Methods
  
  Action-Based Video Creation offers numerous benefits:
  
  ### Production Efficiency
  - Eliminating the need for perfect performance
  - Removing editing time
  - Allowing non-linear creation (defining actions in any order)
  
  ### Content Quality
  - Ensuring perfect execution every time
  - Maintaining consistent pacing and timing
  - Eliminating distractions and errors
  
  ### Maintainability
  - Updating specific actions without recreating the entire video
  - Versioning content using standard code management tools
  - Reusing action sequences across multiple tutorials
  
  ### Format Flexibility
  - Rendering the same actions to different output formats
  - Adapting content for different platforms and contexts
  - Creating interactive versions of the same content
  
  ## Related Terms
  
  - Declarative Video Creation
  - Deterministic Recording System
  - Programmatic Video Generation
  - Content Separation
      `,
        relatedTerms: [
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Deterministic Recording System", slug: "deterministic-recording-system" },
            { title: "Content Separation", slug: "content-separation" }
        ]
    },
    {
        title: "Content Separation",
        slug: "content-separation",
        description: "The practice of separating content (what is taught) from presentation (how it's displayed), allowing the same content to be used in multiple formats.",
        content: `
  # Content Separation
  
  Content Separation is the practice of decoupling educational content from its presentation format, creating a clear distinction between what is being taught and how it's displayed to learners. This principle allows the same core content to be delivered through multiple formats without duplication of effort.
  
  ## Core Principle
  
  At its heart, Content Separation is based on the understanding that educational content has two distinct components:
  
  1. **Core Content**: The actual knowledge, concepts, code examples, and explanations
  2. **Presentation Layer**: How that knowledge is formatted, displayed, and delivered
  
  By creating a clear boundary between these components, Content Separation enables:
  
  - Single-source content management
  - Multi-format publishing
  - Consistent messaging across platforms
  - Efficient content updates and maintenance
  
  ## Implementation Approaches
  
  ### Structured Content Definition
  
  Content is defined in a neutral, structured format that captures the educational substance without specifying presentation details:
  
  - Using semantic markup instead of visual formatting
  - Defining logical content blocks (concept, example, exercise)
  - Creating relationships between content elements
  - Including metadata that describes the content's purpose
  
  ### Rendering Pipelines
  
  The structured content is processed through specialized rendering pipelines that transform it into different formats:
  
  - Video tutorials
  - Written documentation
  - Interactive exercises
  - Slide presentations
  - Printable materials
  
  ### Content Repository Pattern
  
  Educational material is stored in a central repository focused on the content itself:
  
  - Version-controlled storage of core content
  - Metadata and relationships between content pieces
  - Content modules that can be assembled in different ways
  - Separation of explanatory content from code examples
  
  ## Benefits in Software Education
  
  Content Separation is particularly valuable in software education because:
  
  ### Learner Preferences Vary
  
  Different learners absorb programming concepts best through different media:
  
  - Visual learners may prefer video demonstrations
  - Reading-oriented learners may prefer written documentation
  - Hands-on learners may prefer interactive tutorials
  - Note-takers may prefer downloadable references
  
  ### Technologies Evolve Rapidly
  
  When frameworks or languages update:
  
  - Core concepts often remain similar
  - Syntax or implementation details change
  - With separated content, only the affected components need updating
  - Updates propagate to all formats automatically
  
  ### Learning Contexts Differ
  
  Developers access educational content in various contexts:
  
  - In-depth learning (comprehensive tutorials)
  - Just-in-time reference (quick documentation)
  - Classroom settings (presentation slides)
  - Offline learning (downloadable resources)
  
  ## How CodeVideo Implements Content Separation
  
  CodeVideo's approach to Content Separation centers on:
  
  1. **Action-Based Definition**: Content is defined as a sequence of educational actions
  2. **Format-Neutral Storage**: Content is stored in JSON format that describes what happens, not how it's displayed
  3. **Multi-Format Export**: The same content definition can be exported to various formats:
  
  \`\`\`json
  // This single content definition can generate multiple formats
  [
    {
      "name": "author-speak-before",
      "value": "React components use a render method that returns JSX."
    },
    {
      "name": "editor-type",
      "value": "function Welcome() {\n  return <h1>Hello, world!</h1>;\n}"
    },
    {
      "name": "author-speak-after",
      "value": "This simple component returns an h1 heading element."
    }
  ]
  \`\`\`
  
  From this single definition, CodeVideo can generate:
  
  - A video showing the explanation and code being typed
  - A markdown document with the explanation and code sample
  - A slide presentation with the key points
  - An interactive tutorial that allows practice
  - PDF documentation with the complete example
  
  ## Practical Benefits
  
  Content Separation delivers tangible benefits for educators and organizations:
  
  - **Reduced Production Time**: Create once, publish in multiple formats
  - **Consistent Quality**: Ensure the same high-quality content across all formats
  - **Efficient Updates**: Update the core content and regenerate all formats
  - **Flexible Delivery**: Meet learners' needs with format options
  - **Content Reusability**: Use the same content in different contexts and courses
  
  ## Related Terms
  
  - Single-Source Publishing
  - Content Repository Pattern
  - Multi-Format Export
  - Declarative Video Creation
  - Educational Content Management
      `,
        relatedTerms: [
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Action-Based Video Creation", slug: "action-based-video-creation" }
        ]
    },
    {
        title: "JSON Actions",
        slug: "json-actions",
        description: "Structured data that describes what should happen in a video, serving as the blueprint for declarative video creation.",
        content: `
  # JSON Actions
  
  JSON Actions are structured data definitions that describe what should happen in an educational video or tutorial. They serve as the blueprint for declarative video creation, allowing content creators to specify a sequence of steps that should be executed to create the final content.
  
  ## Concept and Structure
  
  JSON Actions use the JavaScript Object Notation (JSON) format to define a sequence of discrete actions that together form a complete tutorial or educational experience. Each action typically contains:
  
  1. **Action Name**: A string identifying what type of action to perform
  2. **Action Value**: The content or parameters for the action
  3. **Optional Attributes**: Additional parameters controlling timing, appearance, or behavior
  
  ## Anatomy of a JSON Action
  
  A basic JSON Action might look like this:
  
  \`\`\`json
  {
    "name": "editor-type",
    "value": "console.log('Hello, world!');"
  }
  \`\`\`
  
  This simple action instructs the system to type the code snippet "console.log('Hello, world!');" in the editor component.
  
  More complex actions might include additional attributes:
  
  \`\`\`json
  {
    "name": "author-speak-before",
    "value": "Let's examine how to create a function in JavaScript.",
    "speed": 1.2,
    "pause": 500
  }
  \`\`\`
  
  ## Types of JSON Actions in CodeVideo
  
  CodeVideo supports various types of JSON Actions, categorized by their function in the educational content:
  
  ### Narrative Actions
  - \`author-speak-before\`: Narration before an action
  - \`author-speak-after\`: Narration after an action
  - \`author-speak-during\`: Narration during an action
  - \`author-wait\`: Pause in the narration
  
  ### Editor Actions
  - \`editor-type\`: Type code in the editor
  - \`editor-highlight-code\`: Highlight a section of code
  - \`editor-delete-line\`: Remove a line of code
  - \`editor-save\`: Save the current file
  - Various keyboard actions (\`editor-arrow-up\`, \`editor-enter\`, etc.)
  
  ### File System Actions
  - \`file-explorer-create-file\`: Create a new file
  - \`file-explorer-create-folder\`: Create a new directory
  - \`file-explorer-open-file\`: Open an existing file
  - \`file-explorer-set-file-contents\`: Set content of a file
  
  ### Terminal Actions
  - \`terminal-type\`: Type a command in the terminal
  - \`terminal-enter\`: Execute a command
  - \`terminal-output\`: Show output in the terminal
  
  ### Visual Actions
  - \`slide-display\`: Show a slide with content
  - Various mouse movement actions (\`mouse-move-editor\`, etc.)
  
  ## Creating Educational Content with JSON Actions
  
  A complete tutorial using JSON Actions is defined as an array of individual actions:
  
  \`\`\`json
  [
    {
      "name": "author-speak-before",
      "value": "Welcome to this tutorial on JavaScript functions."
    },
    {
      "name": "file-explorer-create-file",
      "value": "functions.js"
    },
    {
      "name": "editor-type",
      "value": "function greet(name) {\n  return "Hello, " + name!";\n}\n\nconsole.log(greet('World'));"
    },
    {
      "name": "author-speak-after",
      "value": "This function takes a name parameter and returns a greeting."
    },
    {
      "name": "terminal-type",
      "value": "node functions.js"
    },
    {
      "name": "terminal-enter",
      "value": ""
    },
    {
      "name": "terminal-output",
      "value": "Hello, World!"
    }
  ]
  \`\`\`
  
  ## Benefits of JSON Actions
  
  Using JSON Actions to define educational content provides several key advantages:
  
  ### Precision and Control
  - Exact specification of what happens at each step
  - Fine-grained control over timing and presentation
  - Elimination of errors and inconsistencies
  
  ### Maintainability
  - Easy to update specific actions
  - Version control compatible
  - Can be generated or modified programmatically
  
  ### Multi-format Compatibility
  - The same JSON Actions can generate different output formats
  - Actions focus on content, not presentation specifics
  - Format-neutral definition of educational sequence
  
  ### Collaboration
  - Multiple authors can work on different sections
  - Clear structure makes review and editing straightforward
  - Modular approach allows reuse of action sequences
  
  ## Best Practices for JSON Actions
  
  When creating educational content with JSON Actions:
  
  1. **Be Granular**: Break complex demonstrations into discrete, focused actions
  2. **Include Narrative Context**: Pair code and technical actions with explanatory narration
  3. **Consider Pacing**: Balance the speed of technical demonstrations with time for comprehension
  4. **Test Incrementally**: Preview sections as you build to ensure proper flow
  5. **Use Templates**: Create reusable action patterns for common educational sequences
  
  ## Related Terms
  
  - Declarative Video Creation
  - Action-Based Video Creation
  - Deterministic Recording System
  - Educational Content Sequencing
      `,
        relatedTerms: [
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Action-Based Video Creation", slug: "action-based-video-creation" },
            { title: "Deterministic Recording System", slug: "deterministic-recording-system" }
        ]
    },
    {
        title: "Multi-Format Export",
        slug: "multi-format-export",
        description: "The capability to generate different output formats (video, documentation, slides) from a single source of truth.",
        content: `
  # Multi-Format Export
  
  Multi-Format Export is the capability to generate different output formats from a single source definition, allowing content creators to produce various learning materials without duplicating their efforts. This approach ensures consistency across formats while optimizing for different learning contexts and preferences.
  
  ## Core Concept
  
  Traditional educational content creation requires developing separate materials for each format:
  
  - Recording videos
  - Writing documentation
  - Creating slide decks
  - Developing interactive exercises
  
  Multi-Format Export transforms this process by using a single, format-neutral definition that can be rendered into various output types automatically.
  
  ## Supported Export Formats
  
  ### Video Tutorials
  - MP4 format with professional narration
  - Screen capture-style demonstration
  - Perfect execution of coding examples
  - Visual cues and highlights
  
  ### Written Documentation
  - Markdown files with syntax highlighting
  - HTML documentation for web viewing
  - PDF format for download and offline reference
  - Step-by-step written instructions
  
  ### Slide Presentations
  - Educational slides with key points
  - Code examples with highlights
  - Presenter notes for live teaching
  - Animation sequences showing code evolution
  
  ### Interactive Tutorials
  - Web-based interactive learning experiences
  - Code editors with guided exercises
  - Live preview of results
  - Self-paced learning with validation
  
  ### API Documentation
  - Function and method references
  - Parameter descriptions
  - Example usage patterns
  - Integration guides
  
  ## How Multi-Format Export Works
  
  The process of multi-format export follows these key steps:
  
  1. **Content Definition**: Educational content is defined in a format-neutral way, focusing on what is being taught rather than how it's presented
  2. **Format Templates**: Each output format has specialized templates that define how content should be rendered
  3. **Transformation Pipeline**: Content is processed through format-specific pipelines
  4. **Optimization**: Output is optimized for each target format (e.g., compression for video, responsive layout for web)
  
  ## Implementation in CodeVideo
  
  CodeVideo's multi-format export capability leverages the JSON action sequence as the single source of truth:
  
  \`\`\`json
  [
    {
      "name": "author-speak-before",
      "value": "Let's explore how to use array methods in JavaScript."
    },
    {
      "name": "editor-type",
      "value": "const numbers = [1, 2, 3, 4, 5];\n\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]"
    },
    {
      "name": "author-speak-after",
      "value": "The map method creates a new array by calling a function on each element."
    }
  ]
  \`\`\`
  
  This single definition can be exported to:
  
  - **Video**: A tutorial showing the code being typed with narration
  - **Markdown**: Documentation with the example and explanation
  - **Slides**: Presentation slides showing the key concept
  - **Interactive Demo**: A live coding environment with the example
  - **PDF**: A printable reference guide
  
  ## Benefits for Educators and Learners
  
  ### For Content Creators
  - **Reduced Production Time**: Create once, export to multiple formats
  - **Consistent Messaging**: Ensure the same content across all formats
  - **Simplified Updates**: Change content in one place, update all formats
  - **Format Specialization**: Focus on content quality, not format-specific skills
  
  ### For Learners
  - **Learning Style Accommodation**: Choose formats that match personal learning preferences
  - **Accessibility**: Access the same content in formats suited to different abilities
  - **Contextual Learning**: Use video for initial learning, documentation for reference
  - **Comprehensive Resources**: Get complete learning materials in preferred formats
  
  ## Practical Applications
  
  ### Course Development
  - Create complete course materials in multiple formats
  - Provide students with options for reviewing material
  - Generate instructor guides alongside student materials
  
  ### Technical Documentation
  - Produce both video demonstrations and written references
  - Create slide decks for presentation while maintaining detailed documentation
  - Generate API documentation with accompanying tutorials
  
  ### Onboarding and Training
  - Develop training materials that work in different contexts
  - Support both self-paced and instructor-led training
  - Create reference materials that complement hands-on learning
  
  ## Related Terms
  
  - Content Separation
  - Single-Source Publishing
  - Declarative Video Creation
  - Educational Content Management
      `,
        relatedTerms: [
            { title: "Content Separation", slug: "content-separation" },
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "JSON Actions", slug: "json-actions" }
        ]
    },
    {
        title: "Deterministic Tutorial Creation",
        slug: "deterministic-tutorial-creation",
        description: "An approach to tutorial development that ensures consistent, reproducible educational content by eliminating random variation.",
        content: `
  # Deterministic Tutorial Creation
  
  Deterministic Tutorial Creation is an educational content development approach that ensures consistent, reproducible results by eliminating random variation and human error. It guarantees that given the same input parameters, the resulting tutorial will always be identical, providing a reliable and maintainable way to create programming tutorials.
  
  ## Fundamental Principles
  
  At its core, deterministic tutorial creation is built on these principles:
  
  1. **Complete Specification**: Every aspect of the tutorial is explicitly defined
  2. **Reproducibility**: The same definition will always produce identical results
  3. **Versioning Compatibility**: Tutorial definitions can be version-controlled
  4. **Programmatic Generation**: Content can be generated through automated processes
  5. **Parameterization**: Elements can be adjusted through well-defined parameters
  
  ## Contrast with Traditional Methods
  
  | Traditional Tutorial Creation | Deterministic Tutorial Creation |
  |------------------------------|--------------------------------|
  | Performer-dependent results | Definition-dependent results |
  | Requires multiple takes | Single definition generates perfect result |
  | Difficult to make precise adjustments | Precise adjustments through parameter changes |
  | Content drift between versions | Exact versioning of all content |
  | High production time per minute of content | Low production time per minute of content |
  
  ## Technical Implementation
  
  Deterministic tutorial creation is implemented through:
  
  ### Structured Definition Language
  
  A formal way to define every aspect of the tutorial:
  
  - Action sequences (what happens and when)
  - Content elements (code, narration, visuals)
  - Timing parameters (pacing, pauses, transitions)
  - Visual specifications (highlighting, focusing, annotations)
  
  ### Rendering Engine
  
  A system that processes the definition and generates the actual tutorial:
  
  - Interprets the structured definition
  - Renders each action with precise timing
  - Ensures consistent execution
  - Generates the specified format (video, text, etc.)
  
  ### Validation System
  
  Tools to ensure that the definition will produce valid results:
  
  - Syntax checking for the definition language
  - Preview capabilities to verify output
  - Error detection and highlighting
  - Suggestions for optimization
  
  ## Advantages in Educational Context
  
  Deterministic tutorial creation offers significant benefits for both creators and learners:
  
  ### For Content Creators
  
  - **Elimination of Performance Anxiety**: No need to execute perfect demonstrations
  - **Streamlined Workflow**: Focus on content, not delivery
  - **Efficient Maintenance**: Update specific elements without recreating entire tutorials
  - **Collaborative Creation**: Multiple authors can work on different aspects of the same tutorial
  
  ### For Learners
  
  - **Consistent Quality**: Every tutorial maintains the same professional standards
  - **Clear Demonstrations**: Perfect execution of complex concepts
  - **Appropriate Pacing**: Timing optimized for comprehension
  - **Distraction-Free Learning**: Focus on the content rather than presenter quirks
  
  ## Real-World Application
  
  In CodeVideo, deterministic tutorial creation manifests through:
  
  1. **JSON Action Definitions**: Specifying exactly what happens in the tutorial
  2. **Preview and Validation**: Checking that the definition produces the desired result
  3. **Format-Specific Rendering**: Generating different formats from the same definition
  4. **Version Control Integration**: Tracking changes to tutorial definitions over time
  
  Example definition snippet:
  
  \`\`\`json
  [
    {
      "name": "author-speak-before",
      "value": "First, we'll create a new component class that extends React.Component."
    },
    {
      "name": "editor-type",
      "value": "class Counter extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { count: 0 };\n  }\n\n  render() {\n    return (\n      <div>\n        <p>Count: {this.state.count}</p>\n        <button onClick={() => this.setState({ count: this.state.count + 1 })}>\n          Increment\n        </button>\n      </div>\n    );\n  }\n}"
    },
    {
      "name": "editor-highlight-code",
      "value": "this.state = { count: 0 };"
    },
    {
      "name": "author-speak-after",
      "value": "Notice how we initialize the component state in the constructor."
    }
  ]
  \`\`\`
  
  ## Best Practices
  
  To effectively implement deterministic tutorial creation:
  
  1. **Break Content Into Discrete Actions**: Identify the atomic elements of your tutorial
  2. **Define Clear Learning Objectives**: Know what each tutorial section should accomplish
  3. **Optimize for Comprehension**: Balance completeness with clarity
  4. **Test with Real Learners**: Validate that the generated tutorials achieve learning goals
  5. **Create Reusable Patterns**: Develop templates for common tutorial structures
  
  ## Related Terms
  
  - Declarative Video Creation
  - Action-Based Video Creation
  - Deterministic Recording System
  - Educational Content Versioning
      `,
        relatedTerms: [
            { title: "Deterministic Recording System", slug: "deterministic-recording-system" },
            { title: "Declarative Video Creation", slug: "declarative-video-creation" },
            { title: "Action-Based Video Creation", slug: "action-based-video-creation" }
        ]
    }
];

/**
 * Function to generate markdown files for glossary terms
 */
async function generateGlossaryFiles() {
  try {
    // Create the glossary directory if it doesn't exist
    await mkdirp(GLOSSARY_DIR);
    console.log(`Created directory: ${GLOSSARY_DIR}`);
    
    // Create markdown files for each glossary term
    let createdCount = 0;
    let existingCount = 0;
    
    for (const term of glossaryTerms) {
      const filePath = path.join(GLOSSARY_DIR, `${term.slug}.md`);
    
      
      // Format relatedTerms as proper YAML array with commas
      const relatedTermsYaml = term.relatedTerms && term.relatedTerms.length > 0 
        ? term.relatedTerms.map((rt, index, array) => {
            const entry = `  - title: "${rt.title}",\n    slug: "${rt.slug}"`;
            return entry;
          }).join(',\n')
        : '';
      
      // Generate the frontmatter and content for each term with proper YAML syntax
      const markdownContent = `---
title: "${term.title}"
description: "${term.description}"
date: "${new Date().toISOString()}"
relatedTerms: []
---

${term.content}
`;
      
      // Write the file
      fs.writeFileSync(filePath, markdownContent);
      console.log(`Created file: ${filePath}`);
      createdCount++;
    }
    
    console.log(`\nGeneration complete!`);
    console.log(`Created ${createdCount} new glossary markdown files.`);
    console.log(`${existingCount} files already existed and were not modified.`);
    console.log(`Total glossary terms: ${glossaryTerms.length}`);
    
  } catch (error) {
    console.error("Error generating glossary files:", error);
  }
}

// Run the function
generateGlossaryFiles();