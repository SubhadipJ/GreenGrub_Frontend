#!/bin/bash

# Selenium Grid Standalone Launcher for Chrome and Safari
# This script starts Selenium Grid in standalone mode

echo "=========================================="
echo "Starting Selenium Grid Standalone Mode"
echo "=========================================="
echo ""

# Path to existing Selenium Server JAR
SELENIUM_JAR="/Users/I528797/Desktop/Bits/Sem-5 Project/selenium-server-4.38.0.jar"

# Check if selenium-server.jar exists
if [ ! -f "$SELENIUM_JAR" ]; then
    echo "Selenium Server JAR not found at: $SELENIUM_JAR"
    echo ""
    exit 1
else
    echo "Using Selenium Server: $SELENIUM_JAR"
    echo ""
fi

# Enable Safari WebDriver
echo "Enabling Safari WebDriver..."
safaridriver --enable 2>/dev/null || echo "Note: You may need to run 'safaridriver --enable' with sudo if this fails"
echo ""

# Check Java version
echo "Checking Java version..."
java -version
echo ""

echo "Starting Selenium Grid on http://localhost:4444"
echo ""
echo "Monitor your grid at: http://localhost:4444/ui"
echo ""
echo "To stop Selenium Grid, press Ctrl+C"
echo "=========================================="
echo ""

# Start Selenium Grid in standalone mode
java -jar "$SELENIUM_JAR" standalone --host 127.0.0.1 --port 4444
