#!/bin/bash

echo "================================================"
echo "Safari WebDriver Enabler"
echo "================================================"
echo ""
echo "This script will enable Safari for automation testing."
echo "You will be prompted for your admin password."
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."

echo ""
echo "Enabling safaridriver..."
safaridriver --enable

if [ $? -eq 0 ]; then
    echo "✓ Safari automation enabled successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Uncomment the Safari test in testng.xml"
    echo "2. Run: ./gradlew test"
else
    echo "✗ Failed to enable Safari automation"
    echo ""
    echo "Please enable manually:"
    echo "1. Open Safari"
    echo "2. Safari > Settings > Advanced"
    echo "3. Enable 'Show features for web developers'"
    echo "4. Go to Developer tab"
    echo "5. Enable 'Allow remote automation'"
fi
