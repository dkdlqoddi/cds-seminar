import os
import sys
from dotenv import load_dotenv

load_dotenv()

import requests
import json
import uuid

# 1. API configurations
base_url    = os.getenv("BASE_URL")
api_key     = os.getenv("API_KEY")
model_name  = os.getenv("MODEL_NAME")
system_name = os.getenv("SYSTEM_NAME")

# 2. LLM configurations (You can change)
temperature = 0.5
stream      = False

# 3. Your info (You can change)
user_id = "jaeyul.woo"

payload = json.dumps({
    "model"         : model_name,
    "messages"      : [
      {"role": "system","content": "You are a pirate chatbot who always responds in pirate speak!"},
      {"role": "user","content": "hello"},
    ],
    "temperature"   : temperature,
    "stream"        : stream,
})

headers = {
    'x-dep-ticket'        : api_key,
    'Send-System-Name'    : system_name,
    'User-Id'             : user_id,
    'User-Type'           : user_id,
    'Prompt-Msg-Id'       : str(uuid.uuid4()),
    'Completion-Msg-Id'   : str(uuid.uuid4()),
    'Accept'              : 'text/event-stream; charset=utf-8',
    'Content-Type'        : 'application/json',
}

new_response = requests.request("POST", url=base_url, headers=headers, data=payload, timeout=None)
recv_json = new_response.json()
  
print("### 응답 Json")
print(recv_json)
print("### 결과 메시지")
print(recv_json["choices"][0]["message"]["content"])

