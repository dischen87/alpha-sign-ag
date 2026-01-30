#!/bin/bash

# Alpha Sign AG Sanity Setup Script
# Run this after completing `npx sanity login`

set -e

echo "================================"
echo "Alpha Sign AG - Sanity Setup"
echo "================================"

# Check if logged in
echo "Checking authentication..."
if ! npx sanity projects list > /dev/null 2>&1; then
    echo "Not logged in. Please run: npx sanity login"
    exit 1
fi

echo "Authenticated successfully!"

# Create new project
echo ""
echo "Creating new Sanity project..."
PROJECT_ID=$(npx sanity projects create --name "Alpha Sign AG" --organization "" --output-path /dev/null 2>&1 | grep -oE '[a-z0-9]{8}' | head -1)

if [ -z "$PROJECT_ID" ]; then
    echo "Project creation may have been interactive. Please check above for project ID."
    echo "Or create a project manually at https://www.sanity.io/manage"
    read -p "Enter your Project ID: " PROJECT_ID
fi

echo "Project ID: $PROJECT_ID"

# Create dataset
echo ""
echo "Creating 'production' dataset..."
npx sanity dataset create production --visibility public || echo "Dataset may already exist"

# Create .env file
echo ""
echo "Creating .env file..."
cat > .env << EOF
# Sanity Project Configuration
SANITY_STUDIO_PROJECT_ID=$PROJECT_ID
SANITY_STUDIO_DATASET=production
EOF

echo ""
echo "================================"
echo "Setup complete!"
echo "================================"
echo ""
echo "Project ID: $PROJECT_ID"
echo "Dataset: production"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the Sanity Studio"
echo "2. Open http://localhost:3333 in your browser"
echo "3. Add sample content through the Studio UI"
echo ""
echo "To update the main project .env, add:"
echo "NEXT_PUBLIC_SANITY_PROJECT_ID=$PROJECT_ID"
echo "NEXT_PUBLIC_SANITY_DATASET=production"
