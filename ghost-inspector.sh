# From https://ghostinspector.com/docs/integration/codeship/

# Execute Ghost Inspector suite via API and store results in JSON file
curl "https://api.ghostinspector.com/v1/suites/$GHOST_SUITE_ID/execute/?apiKey=$GHOST_API_KEY&startUrl=$FRONTEND_URL" > ghostinspector.json

# Check JSON results for failing tests
if [ $(grep -c '"passing":false' ghostinspector.json) -ne 0 ]; then exit 1; else echo "Tests Passed"; fi