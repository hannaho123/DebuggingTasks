# Debugging Workshop Challenge

## Overview

A developer has reported **two critical bugs** with our authentication system that need immediate attention:

1. **Bug #1: False Username Rejection**  
   Users receive an error message claiming their username is incorrect, even when they're entering valid credentials.

2. **Bug #2: Password Bypass**  
   The system is incorrectly allowing users to authenticate with invalid passwords.

## Your Mission

Your task is to become a debugging detective and:

- **Start with Bug #1** - Focus on the username validation issue first
- **Use debugging tools** to trace the root cause
- **Fix Bug #1** before moving on to Bug #2
- **Then tackle Bug #2** - Address the password bypass problem

## Getting Started

### Running the Application
Execute the authentication script using:
```bash
node src/index.js
```

**Note:** This is the main entry point where the application starts running.

### Test Credentials
In the `index.js` file, you'll find username and password variables that you can modify to test different scenarios during your debugging session.

**Valid credentials for testing:**
- **Username:** `janesmith123`
- **Password:** `CodingRules123!`

**Tip:** Try changing the username and password values in the code to test both correct and incorrect credentials to observe the buggy behavior!

### Setting Up the Debugger

Follow these steps to start debugging:

1. **Navigate to:** `src/index.js`
2. **Access the debugger:** Select the debugging tool from the left-hand navigation panel
3. **Launch:** Click the "Run" button to start debugging

### Debugging Strategy

**Important: Start with Bug #1 (Username Issue) First!**

- **Phase 1:** Focus on replicating and fixing the username validation bug
- **Phase 2:** Once Bug #1 is resolved, move on to the password bypass issue
- Set breakpoints at key authentication checkpoints
- Step through the code line by line
- Watch variable values as they change
- Pay attention to comparison operators and logic flow

## Ready to Debug?

Time to put on your detective hat and hunt down those bugs! Remember, every great developer is also a great debugger.

**Happy debugging!**
