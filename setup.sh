# 1. Remove the broken directory
rm -rf vastu-global-platform

# 2. Download the corrected setup script
curl -o setup-vastu-fixed.sh https://gist.githubusercontent.com/your-gist-url-or-provide-inline

# OR create it manually (see corrected script below)

# 3. Make it executable and run
chmod +x setup-vastu-fixed.sh
./setup-vastu-fixed.sh