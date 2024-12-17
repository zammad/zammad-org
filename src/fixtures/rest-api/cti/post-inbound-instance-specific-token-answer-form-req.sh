curl --request POST 'https://{FQDN-Zammad}/api/v1/cti/{instance specific token}' \
  --form 'event="answer"' \
  --form 'from="493023125741"' \
  --form 'to="492214710334"' \
  --form 'direction="in"' \
  --form 'callId="61868f1e-2171-4313-970b-25982f0c5ce1"' \
  --form 'answeringNumber="emily@fastlane.inc"' \
  --form 'caller="Emily Tran"'
