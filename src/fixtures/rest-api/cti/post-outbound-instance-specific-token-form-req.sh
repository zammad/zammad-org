curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --form 'event="newCall"' \
  --form 'from="493023125741"' \
  --form 'to="492214710334"' \
  --form 'direction="out"' \
  --form 'callId="f0871278-0600-4f5c-a746-bec3acf04f41"' \
  --form 'user="Lauren Brooks"'
