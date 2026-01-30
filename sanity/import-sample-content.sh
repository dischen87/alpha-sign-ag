#!/bin/bash

# Import sample content to Sanity
# Run this after the project is set up and you're logged in

set -e

echo "================================"
echo "Importing Sample Content"
echo "================================"

# Check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found. Please run setup-sanity.sh first."
    exit 1
fi

# Load environment variables
source .env

if [ -z "$SANITY_STUDIO_PROJECT_ID" ] || [ "$SANITY_STUDIO_PROJECT_ID" = "your-project-id" ]; then
    echo "Error: SANITY_STUDIO_PROJECT_ID not set in .env"
    exit 1
fi

echo "Project ID: $SANITY_STUDIO_PROJECT_ID"
echo "Dataset: $SANITY_STUDIO_DATASET"

echo ""
echo "Importing sample content..."
npx sanity dataset import sample-content.ndjson $SANITY_STUDIO_DATASET --replace

echo ""
echo "================================"
echo "Import complete!"
echo "================================"
echo ""
echo "Sample content imported:"
echo "- 2 Services (Fahrzeugbeschriftung, Leuchtreklame)"
echo "- 2 Projects (Swisscom, Hotel Krone)"
echo "- 2 Team Members (Hans Mueller, Sarah Weber)"
echo "- 1 Settings document"
echo ""
echo "Open the Sanity Studio to view and edit: npm run dev"
