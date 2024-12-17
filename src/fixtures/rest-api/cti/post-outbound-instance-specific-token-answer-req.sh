curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --header 'Content-Type: application/json' \
  --data-raw '{
     "event": "answer",
     "from": "493023125741",
     "to": "492214710334",
     "direction": "out",
     "callId": "9f1840cb-8be9-4d3a-8200-3da2937085f0",
     "caller": "Lauren Brooks"
  }'
