Simple To Do App

How to Run?

clone or download the project

cd figma-todo-app

npm  install

npm run dev

Decision and trade-offs I made:

- Decision to add explicit types for functions and events. The trade-off was to increase typing complexity in exchange for better type safety.
- Introducing Union Type 'all' | 'active' for Filter Instead of two separate states. The compromise was to change the state structure to simplify the filter management logic.
- Added aria-pressed, aria-label attributes, keyboard event handlers, and tabIndex. The trade-off for less code was to add additional code for accessibility.
- I didn't extract components, I could do that e.g. extract taskItem and use use.memo, but for now the application is not so large to split it.

The project take me about 2 hour

For a logic I spent about one hour and on desing about 1 hour.