# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
   Imperatively means to write step-by-step intructions. Find elements, add and remove classes, update, and append children manually.

2. Why must a component name start with a capital letter?
   Because JSX uses the capitalisation to distinguish custom components from standard HTML elements.

3. What does a fragment <>...</> do, and why not just use a "<div>"?
   It allows you to group a list of children without adding extra DOM nodes to the HTML output. Sometimes using "<div>" causes layouts to be broken.

4. Name one benefit of splitting the UI into small components.
   Main benefit is its reusability. Writing it as a small component so that it could be resused across multiple parts of the application.
