#!/usr/bin/env jq

def props: "^(management|messaging|tags|uaa)$";

.data | with_entries(select(.key != ".metadata") |
  .value|=@base64d
  | if .key | test(props) then .value |= fromjson else . end
) 