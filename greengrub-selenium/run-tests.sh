#!/bin/bash

# Test Runner for Selenium Grid Tests
# This script runs the parallel Chrome and Safari tests

echo "=========================================="
echo "Running GreenGrub Tests on Selenium Grid"
echo "=========================================="
echo ""

# Check if Selenium Grid is running
echo "Checking if Selenium Grid is running..."
if ! curl -s http://localhost:4444/status > /dev/null 2>&1; then
    echo "Selenium Grid is not running!"
    echo ""
    echo "Please start Selenium Grid first:"
    echo "  ./start-grid.sh"
    echo ""
    exit 1
fi

echo "Selenium Grid is running"
echo ""

# Check if application is running
echo "Checking if application is running on http://localhost:4200..."
if ! curl -s http://localhost:4200 > /dev/null 2>&1; then
    echo "Warning: Application may not be running on http://localhost:4200"
    echo "   Make sure your Angular app is running!"
    echo ""
fi

echo "Starting tests on Chrome and Safari in parallel..."
echo ""
echo "Monitor your tests at: http://localhost:4444/ui"
echo "=========================================="
echo ""

# Run the tests
./gradlew testGrid

echo ""
echo "=========================================="
echo "Tests completed!"
echo "=========================================="
