#!/bin/bash

# Complete Setup Script for Selenium Grid Testing
# This script will guide you through the entire setup process

echo "╔════════════════════════════════════════════════════════════╗"
echo "║   GreenGrub Selenium Grid - Complete Setup Assistant      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Check Java
echo "📋 Step 1/5: Checking Java installation..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    echo "✅ Java found: version $JAVA_VERSION"
else
    echo "❌ Java not found! Please install Java 17"
    exit 1
fi
echo ""

# Step 2: Enable Safari
echo "📋 Step 2/5: Enabling Safari WebDriver..."
echo "This may ask for your password..."
sudo safaridriver --enable
if [ $? -eq 0 ]; then
    echo "✅ Safari WebDriver enabled"
else
    echo "⚠️  Safari WebDriver may need manual enabling"
    echo "   Please run: sudo safaridriver --enable"
fi
echo ""

# Step 3: Download Selenium Grid
echo "📋 Step 3/5: Checking Selenium Server..."
if [ ! -f "selenium-server.jar" ]; then
    echo "📥 Downloading Selenium Server 4.21.0..."
    echo "   This may take a minute..."
    curl -L https://github.com/SeleniumHQ/selenium/releases/download/selenium-4.21.0/selenium-server-4.21.0.jar -o selenium-server.jar
    echo "✅ Selenium Server downloaded"
else
    echo "✅ Selenium Server already present"
fi
echo ""

# Step 4: Check Chrome
echo "📋 Step 4/5: Checking Chrome installation..."
if [ -d "/Applications/Google Chrome.app" ]; then
    echo "✅ Chrome browser found"
else
    echo "⚠️  Chrome not found at standard location"
    echo "   Please ensure Chrome is installed"
fi
echo ""

# Step 5: Check Safari
echo "📋 Step 5/5: Checking Safari..."
if [ -d "/Applications/Safari.app" ]; then
    echo "✅ Safari browser found"
    echo ""
    echo "⚠️  IMPORTANT: Manual Safari Setup Required"
    echo "   1. Open Safari"
    echo "   2. Safari > Settings > Advanced"
    echo "   3. Check '☑ Show features for web developers'"
    echo "   4. In Develop menu > Check '☑ Allow Remote Automation'"
    echo ""
    read -p "Press ENTER when Safari is configured..."
else
    echo "❌ Safari not found!"
fi
echo ""

# Final Summary
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1️⃣  Start Selenium Grid (in Terminal 1):"
echo "   ./start-grid.sh"
echo ""
echo "2️⃣  Start your Angular application (in Terminal 2):"
echo "   cd GreenGrubUI && ng serve"
echo ""
echo "3️⃣  Run the tests (in Terminal 3):"
echo "   ./run-tests.sh"
echo ""
echo "📊 Monitor your tests at: http://localhost:4444/ui"
echo ""
echo "📖 For detailed instructions, see: RUN_GRID_TESTS.md"
echo ""
