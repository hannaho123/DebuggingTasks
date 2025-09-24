# Practical Debugging Checklist

## 1. Initial Checks

**Before you start:**
- Is your file actually saved? (Seriously, check this first)
- Are you running the right file?
- Did you refresh the browser/restart the server after making changes?
- Are you looking at the console/terminal where errors actually appear?

**The "It Was Working 5 Minutes Ago" Check:**
- What was the last thing you changed? Undo it and see if it works again
- Did you add any new variables, functions, or imports?
- Are you testing the same thing you were testing before?

## 2. Reading Errors

**Stop and actually read the error message:**
Most people see red text and panic. Don't. The computer is trying to help you.

**What to look for:**
- **The actual error:** `TypeError`, `ReferenceError`, `SyntaxError`
- **The line number:** Go to that exact line
- **The file name:** Make sure it's the file you think it is

**Common Error Translations:**

**"Cannot read property 'X' of undefined"**
- Translation: You're trying to access something on a variable that's `undefined`
- Fix: `console.log()` the variable before that line to see what it actually is

**"X is not defined"**
- Translation: You typed a variable name wrong or forgot to declare it
- Fix: Check spelling, check if you declared the variable

**"Unexpected token"**
- Translation: You have a syntax error - probably a missing bracket or comma
- Fix: Look at the line number and check for missing punctuation

## 3. The Bugs That Actually Happen

**Forgetting `return` statements:**
```javascript
function getUsername() {
    const name = "john";
    name.toUpperCase(); // This does something but doesn't return it
    // Missing: return name.toUpperCase();
}

const result = getUsername();
console.log(result); // undefined - not "JOHN"
```
**How to spot:** Function seems to run but result is `undefined`
**The fix:** Add `return` before the value you want to get back

**Assignment vs Comparison (`=` vs `===`):**
```javascript
// Wrong - this assigns 18 to age
if (age = 18) {
    console.log("Always runs because assignment returns 18 (truthy)");
}

// Right - this compares age to 18
if (age === 18) {
    console.log("Only runs when age is exactly 18");
}
```
**How to spot:** Conditions always seem to be true when they shouldn't be

**Loose vs Strict Equality (`==` vs `===`):**
```javascript
const userInput = "5"; // String from form input

// Loose equality - unpredictable
if (userInput == 5) {
    console.log("This runs! '5' == 5 is true");
}

// Strict equality - predictable
if (userInput === 5) {
    console.log("This doesn't run! '5' !== 5");
}

// Better approach
if (parseInt(userInput) === 5) {
    console.log("Convert first, then compare");
}
```
**How to spot:** Comparisons work sometimes but not others, especially with form inputs
**The rule:** Always use `===` unless you specifically need type coercion

**Typos in variable names:**
```javascript
const username = "john";
console.log(userName); // ReferenceError - capital N
```
**How to spot:** "Variable is not defined" errors

**Array vs Object property access:**
```javascript
const users = ["john", "jane", "bob"];

// Wrong - treating array like an object
const user = users['john']; // undefined (looking for property named 'john')

// Right - use array index
const user = users[0]; // "john"

// Or find by value
const user = users.find(name => name === 'john'); // "john"
```
**How to spot:** Getting `undefined` when you expect a value from an array
**The fix:** Use array methods (`find`, `filter`, `includes`) or numeric indexes

**Empty array is truthy:**
```javascript
const results = []; // Empty array

// This always runs, even when array is empty!
if (results) {
    console.log("Found results!"); // Misleading - no results actually
}

// Check array length instead
if (results.length > 0) {
    console.log("Actually found results!");
}

// Same problem with objects
const data = {}; // Empty object
if (data) {
    console.log("This runs too!"); // Empty object is also truthy
}

// Check for actual properties
if (Object.keys(data).length > 0) {
    console.log("Object has properties");
}
```
**How to spot:** Code runs when you think it shouldn't because "nothing" was returned
**The fix:** Check `.length` for arrays, `Object.keys().length` for objects

**Not waiting for async operations:**
```javascript
fetch('/api/users')
  .then(response => response.json())
  .then(users => {
    console.log(users); // This happens later
  });

console.log(users); // This happens first - users doesn't exist yet
```
**How to spot:** Variables are undefined when you think they should have values

## 4. Console.log() Debugging 

**Strategic console.log() placement:**
```javascript
function validateUser(username, password) {
    console.log("Input received:", username, password); // Check inputs
    
    const validUsername = checkUsername(username);
    console.log("Username valid:", validUsername); // Check first step
    
    const validPassword = checkPassword(password);
    console.log("Password valid:", validPassword); // Check second step
    
    const result = validUsername && validPassword;
    console.log("Final result:", result); // Check final logic
    
    return result;
}
```

**What to log:**
- Variable values before and after important operations
- Whether functions are being called at all
- What data is actually coming from APIs or user input
- The result of conditions (`true` or `false`)

**Pro tip:** Use descriptive labels in your console.log statements so you know what you're looking at.

## 5. VSCode Debugger 

**Setting up debugging:**
1. Open your main JavaScript file
2. Click the "Run and Debug" icon in the left sidebar
3. Click "create a launch.json file"
4. Choose "Node.js" (for most JavaScript projects)
5. It creates the config file automatically

**Using breakpoints:**
- Click next to the line number to add a red dot (breakpoint)
- Start debugging (F5)
- Program stops at the red dot
- Look at the "Variables" panel on the left to see what variables contain

**The three buttons you'll actually use:**
- **Continue (F5):** Keep running until the next breakpoint
- **Step Over (F10):** Go to the next line
- **Step Into (F11):** Go inside function calls

**Debug Console:**
When stopped at a breakpoint, you can type variable names in the Debug Console to see their values. Try typing:
- `username` (to see what username contains)
- `typeof password` (to see what type password is)
- `users.length` (to see how many items are in an array)

## 6. When All Else Fails

**Last resort**
1. Comment out half your code
2. If it works, the bug is in the commented half
3. Uncomment half of the commented code
4. Repeat until you find the problem

**Ask for help effectively:**
- Share the actual error message (copy/paste, don't describe it)
- Share the code that's causing the problem
- Explain what you expected to happen vs. what actually happened
- Mention what you've already tried

**Take a break:**
Sometimes you've been staring at code so long you can't see obvious problems. Walk away for 10 minutes. Seriously.

## Quick Reference: Most Common Fixes

- **File not saved** → Save file, refresh browser
- **Typo in variable name** → Check spelling carefully
- **Missing return statement** → Add `return` before the value
- **Using `=` instead of `===`** → Change single `=` to triple `===`
- **Variable is undefined** → Check if it's declared, check spelling
- **Function not called** → Make sure you have parentheses: `myFunction()`
- **Array/object confusion** → Use `console.log(typeof variable)` to check
- **Async timing issues** → Move code inside `.then()` or `async/await`
