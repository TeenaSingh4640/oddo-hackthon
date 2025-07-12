#!/usr/bin/env python3
"""
Script to update the chatbot implementation from the Jupyter notebook.
This script extracts the latest code from odoo_bot_.ipynb and updates the chatbot endpoints.
"""

import json
import re
import os
from pathlib import Path

def extract_code_from_notebook(notebook_path):
    """Extract Python code from Jupyter notebook"""
    with open(notebook_path, 'r') as f:
        data = json.load(f)
    
    code_cells = []
    for cell in data['cells']:
        if cell.get('cell_type') == 'code':
            source = ''.join(cell.get('source', []))
            code_cells.append(source)
    
    return code_cells

def extract_system_prompt(code_cells):
    """Extract the system prompt from the notebook code"""
    for cell in code_cells:
        if 'SYSTEM_PROMPT' in cell:
            # Find the SYSTEM_PROMPT assignment
            match = re.search(r'SYSTEM_PROMPT\s*=\s*"""(.*?)"""', cell, re.DOTALL)
            if match:
                return match.group(1).strip()
    return None

def extract_api_key(code_cells):
    """Extract the API key from the notebook code"""
    for cell in code_cells:
        if 'api_key' in cell:
            match = re.search(r'api_key\s*=\s*"([^"]+)"', cell)
            if match:
                return match.group(1)
    return None

def update_chatbot_endpoint(system_prompt, api_key):
    """Update the chatbot endpoint with new system prompt and API key"""
    endpoint_file = Path('app/api/endpoints/chatbot.py')
    
    if not endpoint_file.exists():
        print("Error: chatbot.py endpoint file not found!")
        return False
    
    # Read the current file
    with open(endpoint_file, 'r') as f:
        content = f.read()
    
    # Update the system prompt
    if system_prompt:
        # Find and replace the existing SYSTEM_PROMPT
        pattern = r'SYSTEM_PROMPT\s*=\s*""".*?"""'
        replacement = f'SYSTEM_PROMPT = """\n{system_prompt}\n"""'
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Update the API key
    if api_key:
        # Find and replace the existing api_key
        pattern = r'api_key\s*=\s*"[^"]+"'
        replacement = f'api_key="{api_key}"'
        content = re.sub(pattern, replacement, content)
    
    # Write the updated content
    with open(endpoint_file, 'w') as f:
        f.write(content)
    
    return True

def main():
    print("🔄 Updating chatbot from notebook...")
    
    notebook_path = 'oddo_bot_.ipynb'
    if not os.path.exists(notebook_path):
        print(f"❌ Error: {notebook_path} not found!")
        return
    
    try:
        # Extract code from notebook
        code_cells = extract_code_from_notebook(notebook_path)
        
        # Extract system prompt
        system_prompt = extract_system_prompt(code_cells)
        if system_prompt:
            print("✅ Found system prompt in notebook")
        else:
            print("⚠️  No system prompt found in notebook")
        
        # Extract API key
        api_key = extract_api_key(code_cells)
        if api_key:
            print("✅ Found API key in notebook")
        else:
            print("⚠️  No API key found in notebook")
        
        # Update the endpoint
        if update_chatbot_endpoint(system_prompt, api_key):
            print("✅ Successfully updated chatbot endpoint")
        else:
            print("❌ Failed to update chatbot endpoint")
        
        print("\n📝 Next steps:")
        print("1. Restart your FastAPI server")
        print("2. Test the chatbot functionality")
        print("3. Update any other configurations as needed")
        
    except Exception as e:
        print(f"❌ Error updating chatbot: {e}")

if __name__ == "__main__":
    main() 