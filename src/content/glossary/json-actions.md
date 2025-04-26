---
title: "JSON Actions"
description: "Structured data that describes what should happen in a video, serving as the blueprint for declarative video creation."
date: "2025-04-26T11:20:45.377Z"
relatedTerms: []
---


  # JSON Actions
  
  JSON Actions are structured data definitions that describe what should happen in an educational video or tutorial. They serve as the blueprint for declarative video creation, allowing content creators to specify a sequence of steps that should be executed to create the final content.
  
  ## Concept and Structure
  
  JSON Actions use the JavaScript Object Notation (JSON) format to define a sequence of discrete actions that together form a complete tutorial or educational experience. Each action typically contains:
  
  1. **Action Name**: A string identifying what type of action to perform
  2. **Action Value**: The content or parameters for the action
  3. **Optional Attributes**: Additional parameters controlling timing, appearance, or behavior
  
  ## Anatomy of a JSON Action
  
  A basic JSON Action might look like this:
  
  ```json
  {
    "name": "editor-type",
    "value": "console.log('Hello, world!');"
  }
  ```
  
  This simple action instructs the system to type the code snippet "console.log('Hello, world!');" in the editor component.
  
  More complex actions might include additional attributes:
  
  ```json
  {
    "name": "author-speak-before",
    "value": "Let's examine how to create a function in JavaScript.",
    "speed": 1.2,
    "pause": 500
  }
  ```
  
  ## Types of JSON Actions in CodeVideo
  
  CodeVideo supports various types of JSON Actions, categorized by their function in the educational content:
  
  ### Narrative Actions
  - `author-speak-before`: Narration before an action
  - `author-speak-after`: Narration after an action
  - `author-speak-during`: Narration during an action
  - `author-wait`: Pause in the narration
  
  ### Editor Actions
  - `editor-type`: Type code in the editor
  - `editor-highlight-code`: Highlight a section of code
  - `editor-delete-line`: Remove a line of code
  - `editor-save`: Save the current file
  - Various keyboard actions (`editor-arrow-up`, `editor-enter`, etc.)
  
  ### File System Actions
  - `file-explorer-create-file`: Create a new file
  - `file-explorer-create-folder`: Create a new directory
  - `file-explorer-open-file`: Open an existing file
  - `file-explorer-set-file-contents`: Set content of a file
  
  ### Terminal Actions
  - `terminal-type`: Type a command in the terminal
  - `terminal-enter`: Execute a command
  - `terminal-output`: Show output in the terminal
  
  ### Visual Actions
  - `slide-display`: Show a slide with content
  - Various mouse movement actions (`mouse-move-editor`, etc.)
  
  ## Creating Educational Content with JSON Actions
  
  A complete tutorial using JSON Actions is defined as an array of individual actions:
  
  ```json
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
      "value": "function greet(name) {
  return "Hello, " + name!";
}

console.log(greet('World'));"
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
  ```
  
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
      
