#!/bin/bash
echo "Adjusting plist for App Transport Security exception."
val=$(/usr/libexec/plistbuddy -c "add NSAppTransportSecurity:NSExceptionDomains:api.fixer.io:NSTemporaryExceptionAllowsInsecureHTTPLoads bool true" platforms/ios/SponzorMe/SponzorMe-Info.plist 2>/dev/null)
echo "Done"