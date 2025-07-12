import json

def extract_code_from_notebook(notebook_path):
    with open(notebook_path, 'r') as f:
        data = json.load(f)
    
    code_cells = []
    for cell in data['cells']:
        if cell.get('cell_type') == 'code':
            source = ''.join(cell.get('source', []))
            code_cells.append(source)
    
    return code_cells

if __name__ == "__main__":
    code_cells = extract_code_from_notebook('odoo_bot_.ipynb')
    for i, code in enumerate(code_cells):
        print(f"=== CELL {i+1} ===")
        print(code)
        print("\n") 