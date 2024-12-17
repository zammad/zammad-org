curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --form 'event="newCall"' \
  --form 'from="493023125741"' \
  --form 'to="492214710334"' \
  --form 'direction="in"' \
  --form 'callId="25641e3f-3317-4c48-80b3-fc573c7ffe2b"' \
  --form 'user[]="Lauren Brooks"' \
  --form 'user[]="Ethan Kwan"'
