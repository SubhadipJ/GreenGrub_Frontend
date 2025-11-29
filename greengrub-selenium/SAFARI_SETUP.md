# Safari WebDriver Setup Guide

## Steps to Enable Safari Automation

To run Selenium tests on Safari, you need to enable remote automation:

### Method 1: Using Terminal (Recommended)
Run this command in your terminal:
```bash
safaridriver --enable
```
You'll need to enter your admin password.

### Method 2: Using Safari Settings (Manual)
1. Open **Safari** browser
2. Go to **Safari > Settings** (or **Preferences** on older macOS versions)
3. Click on the **Advanced** tab
4. Check **"Show features for web developers"** at the bottom
5. A new **Developer** menu will appear in the menu bar
6. Go to **Developer** tab in Settings
7. Check **"Allow remote automation"**
8. Restart Safari

### Verify Installation
Run this command to verify safaridriver is working:
```bash
safaridriver --version
```

## Running Tests

### Run Chrome Tests Only
```bash
./gradlew test
```

### Run Both Chrome and Safari Tests
1. First, enable Safari automation using one of the methods above
2. Uncomment the Safari test block in `app/src/test/resources/testng.xml`
3. Run:
```bash
./gradlew test
```

## Test Structure

The test suite is configured in `testng.xml` with:
- **Chrome Test**: Always enabled
- **Safari Test**: Commented out by default (uncomment after enabling Safari automation)
- **Parallel Execution**: Tests run in parallel with 2 threads

## Troubleshooting

### Safari Session Error
If you see: `Could not create a session: You must enable 'Allow remote automation'`
- Follow the setup steps above
- Make sure to restart Safari after enabling

### Port Already in Use
If safaridriver port is busy:
```bash
pkill safaridriver
```

### Test Timeout
If tests timeout, ensure your Angular app is running:
```bash
curl http://localhost:4200
```
